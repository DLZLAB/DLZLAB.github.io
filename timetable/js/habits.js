window.HabitsPage = (function () {
  let viewYear = new Date().getFullYear();
  let viewMonth = new Date().getMonth() + 1;

  function cycleCell(habitId, date) {
    const today = Utils.todayStr();
    if (date > today) return;
    const cur = State.habitLogStatus(habitId, date);
    const next = cur === 'done' ? 'skipped' : cur === 'skipped' ? null : 'done';
    const existing = State.logFor(habitId, date);
    if (!next) {
      if (existing) State.remove('habitLogs', existing.id);
      return;
    }
    const rec = existing ? Object.assign({}, existing, { status: next }) : { id: Utils.uid(), habitId: habitId, date: date, status: next };
    const job = existing ? State.update('habitLogs', rec) : State.add('habitLogs', rec);
    job.then(function () {
      if (next === 'done' && date === Utils.todayStr()) UI.toast('Habit completed', 'success', 'check');
    });
  }

  function render(container) {
    const today = Utils.todayStr();
    const days = Utils.daysInMonth(viewYear, viewMonth);
    const fmt = State.getSetting('timeFormat');
    const habits = State.data.habits;
    const dowNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const todayLogs = State.logsForDate(today);

    container.innerHTML =
      '<div class="page-head">' +
      '<div><h2>Habit Tracker</h2><div class="page-head-sub">' + Utils.monthYearStr(viewYear, viewMonth) + ' · ' + habits.length + ' habits' + '</div></div>' +
      '<div class="page-head-actions"><button class="btn btn-accent" data-action="add-habit">' + Icons.get('plus') + ' New Habit</button></div>' +
      '</div>' +

      '<div class="glass ht-today">' +
      '<div class="ht-today-title">' + Icons.get('today') + ' Today&rsquo;s Check-in <span style="color:var(--text-muted);font-weight:600;text-transform:none;letter-spacing:0;font-size:12px">' + todayLogs.filter(function (l) { return l.status === 'done'; }).length + '/' + habits.length + ' done</span></div>' +
      (habits.length
        ? '<div class="ht-chips">' + habits.map(function (h) {
          const st = State.habitLogStatus(h.id, today);
          return '<button class="ht-chip' + (st === 'done' ? ' on' : '') + '" data-action="log-today" data-id="' + h.id + '">' +
            '<span class="htc-dot" style="background:' + State.COLOR_HEX[h.color] + '"></span>' +
            '<span class="htc-check">' + Icons.get('check') + '</span>' +
            Utils.escapeHtml(h.name) +
            (st === 'skipped' ? ' <span class="badge p-todo">skipped</span>' : '') +
            '</button>';
        }).join('') + '</div>'
        : '<div class="empty" style="padding:26px"><div class="empty-ic">' + Icons.get('habits') + '</div><div class="empty-title">No habits yet</div><div class="empty-sub">Build your routine one habit at a time.</div><button class="btn btn-accent btn-sm empty-btn" data-action="add-habit">Create Habit</button></div>') +
      '</div>' +

      '<div class="ht-toolbar">' +
      '<div class="ht-nav">' +
      '<button class="icon-btn" data-action="month-prev" aria-label="Previous month">' + Icons.get('chevL') + '</button>' +
      '<span class="ht-title tnum">' + Utils.monthYearStr(viewYear, viewMonth) + '</span>' +
      '<button class="icon-btn" data-action="month-next" aria-label="Next month">' + Icons.get('chevR') + '</button>' +
      '</div>' +
      '<div class="ht-selects">' +
      '<select class="select" id="monthSelect" style="width:130px">' + Utils.MONTHS.map(function (m, i) {
        return '<option value="' + (i + 1) + '"' + (i + 1 === viewMonth ? ' selected' : '') + '>' + m + '</option>';
      }).join('') + '</select>' +
      '<select class="select" id="yearSelect" style="width:100px">' + (function () {
        const y = new Date().getFullYear();
        let html = '';
        for (let i = y - 4; i <= y + 1; i++) html += '<option value="' + i + '"' + (i === viewYear ? ' selected' : '') + '>' + i + '</option>';
        return html;
      })() + '</select>' +
      '<button class="btn btn-sm" data-action="month-today">Today</button>' +
      '</div></div>' +

      (habits.length
        ? '<div class="ht-wrap"><div class="ht-scroll"><div class="ht-inner">' +
        '<div class="ht-grid" style="--ht-days:' + days + '">' +
        '<div class="ht-head ht-row" style="display:grid;grid-template-columns:188px repeat(' + days + ',minmax(38px,1fr))">' +
        '<div class="ht-cell ht-name"><span class="htn-txt">Habit</span></div>' +
        Array.from({ length: days }, function (_, i) {
          const d = i + 1;
          const dateStr = viewYear + '-' + String(viewMonth).padStart(2, '0') + '-' + String(d).padStart(2, '0');
          const dow = Utils.weekday(dateStr);
          return '<div class="ht-cell"><span class="ht-num' + (dateStr === today ? ' today' : '') + (dow === 0 || dow === 6 ? ' weekend' : '') + '">' + d + '</span></div>';
        }).join('') +
        '</div>' +
        '<div class="ht-body" style="display:grid;grid-template-columns:188px repeat(' + days + ',minmax(38px,1fr))">' +
        habits.map(function (h) {
          const stats = State.habitStats(h.id, Utils.todayStr());
          const cells = Array.from({ length: days }, function (_, i) {
            const d = i + 1;
            const dateStr = viewYear + '-' + String(viewMonth).padStart(2, '0') + '-' + String(d).padStart(2, '0');
            const st = State.habitLogStatus(h.id, dateStr);
            const future = dateStr > today;
            const missing = dateStr < today && !st && (h.createdAt || '0001-01-01') <= dateStr;
            return '<div class="ht-cell ht-day ' + (st || '') + (dateStr === today ? ' today' : '') + (missing ? ' missing' : '') + '"' +
              ' data-action="tap-day" data-habit="' + h.id + '" data-date="' + dateStr + '"' +
              (future ? ' style="cursor:default"' : '') + '>' +
              '<span class="htd-inner">' + (st === 'done' ? Icons.get('check') : '') + '</span></div>';
          }).join('');
          return '<div class="ht-row" style="display:contents">' +
            '<div class="ht-cell ht-name" data-action="edit-habit" data-id="' + h.id + '">' +
            '<span class="htn-dot" style="background:' + State.COLOR_HEX[h.color] + ';box-shadow:0 0 8px ' + State.COLOR_HEX[h.color] + '55"></span>' +
            '<span class="htn-txt">' + Utils.escapeHtml(h.name) + '</span>' +
            (stats.current > 0 ? '<span class="htn-stat">' + stats.current + 'd</span>' : '') +
            '</div>' + cells + '</div>';
        }).join('') +
        '</div></div></div></div>' +
        '<div class="ht-legend">' +
        '<span><span class="hl-sample hl-done">' + Icons.get('check') + '</span> Completed</span>' +
        '<span><span class="hl-sample hl-skip"></span> Skipped</span>' +
        '<span><span class="hl-sample hl-empty"></span> Not logged</span>' +
        '<span><span class="hl-sample" style="outline:1.5px dashed var(--danger-soft);outline-offset:2px;background:transparent"></span> Missed</span>' +
        '</div>'
        : '<div class="empty glass" style="padding:56px"><div class="empty-ic">' + Icons.get('habits') + '</div><div class="empty-title">Habit Tracker</div><div class="empty-sub">Add habits like &ldquo;Read 30 minutes&rdquo; and check them off day by day.</div><button class="btn btn-accent empty-btn" data-action="add-habit">Create your first habit</button></div>') +

      (habits.length ? '<div class="ht-streaks">' + habits.map(function (h) {
        const s = State.habitStats(h.id, Utils.todayStr());
        return '<div class="glass ht-streak" style="border-color:' + State.COLOR_HEX[h.color] + '33">' +
          '<div class="hs-top"><span class="hs-ic" style="background:color-mix(in srgb,' + State.COLOR_HEX[h.color] + ' 16%,transparent);color:' + State.COLOR_HEX[h.color] + ';box-shadow:0 6px 18px ' + State.COLOR_HEX[h.color] + '44">' + Icons.get('flame') + '</span>' +
          '<div><div class="hs-name">' + Utils.escapeHtml(h.name) + '</div><div class="hs-sub">Since ' + Utils.dateShort(h.createdAt || Utils.todayStr()) + '</div></div></div>' +
          '<div class="hs-stats">' +
          '<div class="hs-stat"><div class="hss-val fire tnum">' + s.current + '</div><div class="hss-label">Streak</div></div>' +
          '<div class="hs-stat"><div class="hss-val tnum">' + s.best + '</div><div class="hss-label">Best</div></div>' +
          '<div class="hs-stat"><div class="hss-val tnum">' + s.rate + '%</div><div class="hss-label">Rate</div></div>' +
          '<div class="hs-stat"><div class="hss-val tnum">' + s.total + '</div><div class="hss-label">Done</div></div>' +
          '</div></div>';
      }).join('') + '</div>' : '');

    const monthSel = container.querySelector('#monthSelect');
    const yearSel = container.querySelector('#yearSelect');
    if (monthSel) {
      monthSel.addEventListener('change', function () { viewMonth = parseInt(monthSel.value, 10); Router.refresh(); });
      yearSel.addEventListener('change', function () { viewYear = parseInt(yearSel.value, 10); Router.refresh(); });
    }
  }

  const actions = {
    'add-habit': function () { UI.habitModal(null); },
    'edit-habit': function (e, el) {
      const h = State.data.habits.find(function (x) { return x.id === el.dataset.id; });
      if (h) UI.habitModal(h);
    },
    'month-prev': function () {
      viewMonth--;
      if (viewMonth < 1) { viewMonth = 12; viewYear--; }
      Router.refresh();
    },
    'month-next': function () {
      viewMonth++;
      if (viewMonth > 12) { viewMonth = 1; viewYear++; }
      Router.refresh();
    },
    'month-today': function () {
      const d = new Date();
      viewYear = d.getFullYear(); viewMonth = d.getMonth() + 1;
      Router.refresh();
    },
    'tap-day': function (e, el) {
      const date = el.dataset.date;
      if (date > Utils.todayStr()) return;
      cycleCell(el.dataset.habit, date);
    },
    'log-today': function (e, el) {
      const hid = el.dataset.id;
      const today = Utils.todayStr();
      const cur = State.habitLogStatus(hid, today);
      const next = cur === 'done' ? 'skipped' : 'done';
      const existing = State.logFor(hid, today);
      const job = existing ? State.update('habitLogs', Object.assign({}, existing, { status: next })) : State.add('habitLogs', { id: Utils.uid(), habitId: hid, date: today, status: next });
      job.then(function () {
        UI.toast(next === 'done' ? 'Habit completed' : 'Habit skipped for today', next === 'done' ? 'success' : 'info', next === 'done' ? 'check' : 'repeat');
      });
    }
  };

  return { render: render, actions: actions };
})();