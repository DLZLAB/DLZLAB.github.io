window.TimetablePage = (function () {
  const HOUR_START = 6;
  const HOUR_END = 23;
  const HOURS = HOUR_END - HOUR_START;
  const ROWH = 56;
  const SPAN = HOURS * 60;
  let cursor = null;

  function startOfWeek() {
    return Utils.startOfWeek(cursor || Utils.todayStr(), State.getSetting('weekStart') || 0);
  }

  function weekDays() {
    const s = startOfWeek();
    const days = [];
    for (let i = 0; i < 7; i++) days.push(Utils.addDays(s, i));
    return days;
  }

  function dayItems(dateStr) {
    const out = [];
    State.tasksFor(dateStr).forEach(function (t) {
      if (t.timeStart == null || t.timeEnd == null || t.timeEnd <= t.timeStart) return;
      out.push({
        kind: 'task', id: t.id, title: t.title,
        start: t.timeStart, end: t.timeEnd,
        color: State.colorOf(t.category), status: t.status
      });
    });
    State.eventsFor(dateStr).forEach(function (e) {
      if (e.timeStart == null || e.timeEnd == null) return;
      out.push({
        kind: 'event', id: e.id, title: e.title,
        start: e.timeStart, end: e.timeEnd,
        color: e.color || 'violet'
      });
    });
    out.sort(function (a, b) { return a.start - b.start; });
    out.forEach(function (it, i) {
      let pos = 0, count = 1;
      out.forEach(function (o, j) {
        if (o.start < it.end && it.start < o.end) {
          count++;
          if (j < i) pos++;
        }
      });
      it.lane = pos;
      it.lanes = count;
    });
    return out;
  }

  function blockStyle(it) {
    const s = Math.max(it.start, HOUR_START * 60);
    const e = Math.min(it.end, HOUR_END * 60);
    const top = ((s - HOUR_START * 60) / SPAN) * 100;
    const h = Math.max(((e - s) / SPAN) * 100, 2.4);
    const w = 100 / it.lanes;
    return 'top:' + top + '%;height:' + h + '%;left:' + (it.lane * w) + '%;width:' + w + '%';
  }

  function blockHtml(it, fmt) {
    const hex = State.COLOR_HEX[it.color] || State.COLOR_HEX.blue;
    const done = it.kind === 'task' && it.status === 'done';
    return '<div class="tt-block' + (done ? ' done' : '') + '"' +
      ' data-kind="' + it.kind + '" data-id="' + it.id + '"' +
      ' style="' + blockStyle(it) + ';--b-c:' + hex + '"' +
      ' title="' + Utils.escapeHtml(it.title) + ' · ' + Utils.minToTime(it.start, fmt) + ' – ' + Utils.minToTime(it.end, fmt) + '">' +
      '<span class="tt-b-title">' + Utils.escapeHtml(it.title) + (done ? ' ✓' : '') + '</span>' +
      '<span class="tt-b-time">' + Utils.minToTime(it.start, fmt) + ' – ' + Utils.minToTime(it.end, fmt) + '</span>' +
      '</div>';
  }

  function weekTitle(days) {
    const last = Utils.fromStr(days[6]);
    return Utils.dateShort(days[0]) + ' – ' + Utils.dateShort(days[6]) + ', ' + last.getFullYear();
  }

  function render(container) {
    const days = weekDays();
    const today = Utils.todayStr();
    const fmt = State.getSetting('timeFormat');
    const inWeek = days.indexOf(today) >= 0;
    let blocks = 0, focus = 0, done = 0;

    const heads = days.map(function (d) {
      const isToday = d === today;
      return '<div class="tt-head' + (isToday ? ' today' : '') + '">' +
        '<span class="tt-dow">' + Utils.WEEK_SHORT[Utils.weekday(d)] + '</span>' +
        '<span class="tt-num' + (isToday ? ' on' : '') + '">' + Utils.fromStr(d).getDate() + '</span>' +
        '</div>';
    }).join('');

    const daysHtml = days.map(function (d) {
      const items = dayItems(d);
      const isToday = d === today;
      items.forEach(function (it) {
        blocks++;
        focus += it.end - it.start;
        if (it.kind === 'task' && it.status === 'done') done++;
      });
      return '<div class="tt-day' + (isToday ? ' today' : '') + '" data-date="' + d + '">' +
        items.map(function (it) { return blockHtml(it, fmt); }).join('') +
        (isToday && inWeek
          ? '<div class="tt-now" style="top:' + Math.max(0, Math.min(100, ((Utils.nowMin() - HOUR_START * 60) / SPAN) * 100)) + '%"></div>'
          : '') +
        '</div>';
    }).join('');

    const hours = Array.from({ length: HOURS + 1 }, function (_, i) {
      const h = HOUR_START + i;
      return '<span class="tt-hour" style="top:' + ((i * ROWH) - 8) + 'px">' + Utils.minToTime(h * 60, fmt) + '</span>';
    }).join('');

    container.innerHTML =
      '<div class="page-head">' +
      '<div><h2>Timetable</h2><div class="page-head-sub">' + weekTitle(days) + (inWeek ? ' · <b style="color:var(--accent)">This week</b>' : '') + '</div></div>' +
      '<div class="page-head-actions">' +
      '<button class="icon-btn" data-action="tt-prev">' + Icons.get('chevL') + '</button>' +
      '<button class="btn btn-sm' + (inWeek ? ' btn-accent' : '') + '" data-action="tt-today" style="min-width:100px;justify-content:center">' + (inWeek ? 'This Week' : 'Jump to Today') + '</button>' +
      '<button class="icon-btn" data-action="tt-next">' + Icons.get('chevR') + '</button>' +
      '<button class="btn btn-accent btn-sm" data-action="tt-add">' + Icons.get('plus') + ' Task</button>' +
      '</div></div>' +

      '<div class="tt-scroll"><div class="tt-grid">' +
      '<div class="tt-corner">' + Icons.get('calendar') + '</div>' +
      heads +
      '<div class="tt-gutter">' + hours + '</div>' +
      daysHtml +
      '</div></div>' +

      '<div class="tt-stats">' +
      '<span>' + Icons.get('schedule') + ' <b>' + blocks + '</b> blocks this week</span>' +
      '<span>' + Icons.get('timer') + ' <b>' + Utils.fmtDur(focus) + '</b> planned</span>' +
      '<span>' + Icons.get('check') + ' <b>' + done + '</b> tasks done</span>' +
      '<span style="margin-left:auto;color:var(--text-muted)">Click a time slot to add · click a block to edit</span>' +
      '</div>';

    container.addEventListener('click', function (e) {
      const block = e.target.closest('.tt-block');
      if (block) {
        const kind = block.dataset.kind;
        const id = block.dataset.id;
        if (kind === 'task') {
          const t = State.data.tasks.find(function (x) { return x.id === id; });
          if (t) UI.taskModal(t);
        } else {
          const ev = State.data.events.find(function (x) { return x.id === id; });
          if (ev) UI.eventModal(ev);
        }
        return;
      }
      const day = e.target.closest('.tt-day');
      if (!day) return;
      const rect = day.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const rel = Utils.clamp(y / rect.height, 0, 1);
      const start = Math.round((HOUR_START * 60 + rel * SPAN) / 15) * 15;
      UI.quickAdd('task', { date: day.dataset.date, start: Utils.clamp(start, 0, 1410) });
    });
  }

  const actions = {
    'tt-prev': function () { cursor = Utils.addDays(startOfWeek(), -7); Router.refresh(); },
    'tt-next': function () { cursor = Utils.addDays(startOfWeek(), 7); Router.refresh(); },
    'tt-today': function () { cursor = Utils.todayStr(); Router.refresh(); },
    'tt-add': function () { UI.quickAdd('task', { date: Utils.todayStr() }); }
  };

  return { render: render, actions: actions };
})();