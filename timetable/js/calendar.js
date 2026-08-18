window.CalendarPage = (function () {
  let view = 'month';
  let cursor = new Date();
  const fmt = function () { return State.getSetting('timeFormat'); };

  function setCursorDate(dateStr) { cursor = Utils.fromStr(dateStr); }

  function dayInfo(dateStr) {
    const tasks = State.tasksFor(dateStr);
    const events = State.eventsFor(dateStr);
    const doneHabits = State.logsForDate(dateStr).filter(function (l) { return l.status === 'done'; }).length;
    return {
      tasks: tasks.length,
      events: events.length,
      habits: doneHabits,
      taskTitles: tasks.slice(0, 3).map(function (t) { return t.title; }),
      tasksOpen: tasks.filter(function (t) { return t.status !== 'done'; }).length
    };
  }

  function renderMonth(container) {
    const today = Utils.todayStr();
    const year = cursor.getFullYear();
    const month = cursor.getMonth() + 1;
    const ws = State.getSetting('weekStart');
    const cells = Utils.monthMatrix(year, month - 1, ws);
    const dows = [];
    for (let i = 0; i < 7; i++) dows.push(Utils.WEEK_SHORT[(ws + i) % 7]);

    container.innerHTML =
      '<div class="page-head">' +
      '<div><h2>Calendar</h2><div class="page-head-sub">' + Utils.monthYearStr(year, month) + '</div></div>' +
      '<div class="page-head-actions">' + UI.segHtml('calView', [
        { val: 'month', label: 'Month' }, { val: 'week', label: 'Week' }, { val: 'day', label: 'Day' }
      ], view, true) +
      '<button class="btn btn-sm" data-action="cal-today">Today</button></div></div>' +

      '<div class="cal-toolbar">' +
      '<div class="cal-nav"><button class="icon-btn" data-action="cal-prev">' + Icons.get('chevL') + '</button>' +
      '<div><div class="cal-title tnum">' + Utils.monthYearStr(year, month) + '</div><div class="cal-sub">' + cells.filter(function (c) { return c.inMonth; }).length + ' days</div></div>' +
      '<button class="icon-btn" data-action="cal-next">' + Icons.get('chevR') + '</button></div>' +
      '<div class="cal-nav"><button class="btn btn-sm" data-action="cal-add-task">' + Icons.get('plus') + ' Task</button>' +
      '<button class="btn btn-sm" data-action="cal-add-event">' + Icons.get('plus') + ' Event</button></div></div>' +

      '<div class="cal-grid">' +
      dows.map(function (d) { return '<div class="cal-dow">' + d + '</div>'; }).join('') +
      cells.map(function (c) {
        const info = dayInfo(c.date);
        const isToday = c.date === today;
        return '<div class="cal-cell' + (c.inMonth ? '' : ' out') + (isToday ? ' today' : '') + '" data-action="goto-day" data-date="' + c.date + '">' +
          '<span class="cc-date">' + c.day + '</span>' +
          (info.tasksOpen ? '<span class="cc-count">' + info.tasksOpen + '</span>' : '') +
          '<div class="cc-dots">' +
          (info.tasks ? '<span class="cc-dot t" title="' + info.tasks + ' tasks"></span>' : '') +
          (info.events ? '<span class="cc-dot e" title="' + info.events + ' events"></span>' : '') +
          (info.habits ? '<span class="cc-dot h" title="' + info.habits + ' habits done"></span>' : '') +
          '</div>' +
          (info.taskTitles.length ? '<div class="cc-mini">' + info.taskTitles[0] + '</div>' : '') +
          '</div>';
      }).join('') + '</div>' +

      '<div class="cal-legend">' +
      '<span><span class="l-dot" style="background:var(--accent)"></span>Tasks</span>' +
      '<span><span class="l-dot" style="background:var(--accent-2)"></span>Events</span>' +
      '<span><span class="l-dot" style="background:var(--success)"></span>Habits completed</span>' +
      '<span><span class="l-dot" style="outline:1.5px solid var(--accent);background:transparent;width:10px;height:10px"></span>Today</span>' +
      '</div>';
  }

  function renderWeek(container) {
    const today = Utils.todayStr();
    const ws = State.getSetting('weekStart');
    const start = Utils.startOfWeek(Utils.toStr(cursor), ws);
    const days = [];
    for (let i = 0; i < 7; i++) days.push(Utils.addDays(start, i));

    container.innerHTML =
      '<div class="page-head">' +
      '<div><h2>Calendar</h2><div class="page-head-sub">' + Utils.dateShort(days[0]) + ' — ' + Utils.dateShort(days[6]) + (Utils.monthStrOf(days[0]) !== Utils.monthStrOf(days[6]) ? ' · ' + Utils.monthStrOf(days[0]) + ' / ' + Utils.monthStrOf(days[6]) : '') + '</div></div>' +
      '<div class="page-head-actions">' + UI.segHtml('calView', [
        { val: 'month', label: 'Month' }, { val: 'week', label: 'Week' }, { val: 'day', label: 'Day' }
      ], view, true) +
      '<button class="btn btn-sm" data-action="cal-today">Today</button></div></div>' +

      '<div class="cal-toolbar">' +
      '<div class="cal-nav"><button class="icon-btn" data-action="cal-prev">' + Icons.get('chevL') + '</button>' +
      '<div class="cal-title tnum">Week of ' + Utils.dateShort(start) + '</div>' +
      '<button class="icon-btn" data-action="cal-next">' + Icons.get('chevR') + '</button></div>' +
      '<div class="cal-nav"><button class="btn btn-sm" data-action="cal-add-task">' + Icons.get('plus') + ' Task</button>' +
      '<button class="btn btn-sm" data-action="cal-add-event">' + Icons.get('plus') + ' Event</button></div></div>' +

      '<div class="week-grid">' +
      days.map(function (d, i) {
        const isToday = d === today;
        const tasks = State.tasksFor(d).filter(function (t) { return t.status !== 'done'; });
        const events = State.eventsFor(d);
        const habitDone = State.logsForDate(d).filter(function (l) { return l.status === 'done'; }).length;
        return '<div class="week-col' + (i >= 5 ? ' extra' : '') + (isToday ? ' today' : '') + '" data-date="' + d + '">' +
          '<div class="wc-head"><div class="wc-dow">' + Utils.WEEK_SHORT[Utils.weekday(d)] + '</div>' +
          (isToday ? '<div class="wc-date">' + Utils.fromStr(d).getDate() + '</div>' : '<div class="wc-date">' + Utils.fromStr(d).getDate() + '</div>') +
          '</div>' +
          '<div class="wc-list">' +
          tasks.map(function (t) {
            return '<div class="wc-item' + (t.status === 'done' ? ' done-item' : '') + '" draggable="true" data-action="edit-day-task" data-id="' + t.id + '">' +
              Utils.escapeHtml(t.title) +
              (t.timeStart != null ? '<div class="wci-time">' + Utils.minToTime(t.timeStart, fmt()) + ' – ' + Utils.minToTime(t.timeEnd, fmt()) + '</div>' : '') +
              '</div>';
          }).join('') +
          events.map(function (e) {
            return '<div class="wc-item" style="border-left-color:var(--accent-2);background:var(--glass-bg-strong)" data-action="edit-day-event" data-id="' + e.id + '">' +
              Utils.escapeHtml(e.title) +
              '<div class="wci-time">' + Utils.minToTime(e.timeStart, fmt()) + ' – ' + Utils.minToTime(e.timeEnd, fmt()) + '</div></div>';
          }).join('') +
          (habitDone ? '<div class="wc-empty">' + Icons.get('habits') + ' ' + habitDone + ' habit' + (habitDone > 1 ? 's' : '') + ' done</div>' : '') +
          (!tasks.length && !events.length ? '<div class="wc-empty">Drag tasks here</div>' : '') +
          '</div></div>';
      }).join('') + '</div>' +
      '<div class="cal-legend"><span style="font-size:11.5px;color:var(--text-muted)">Tip: drag a task card to another day to reschedule it.</span></div>';

    container.querySelectorAll('.wc-item[draggable]').forEach(function (el) {
      el.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', el.dataset.id);
        el.classList.add('drag-src');
      });
      el.addEventListener('dragend', function () { el.classList.remove('drag-src'); });
    });
    container.querySelectorAll('.week-col').forEach(function (col) {
      col.addEventListener('dragover', function (e) { e.preventDefault(); col.classList.add('drag-over'); });
      col.addEventListener('dragleave', function () { col.classList.remove('drag-over'); });
      col.addEventListener('drop', function (e) {
        e.preventDefault();
        col.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text/plain');
        const t = State.data.tasks.find(function (x) { return x.id === id; });
        if (t && col.dataset.date) {
          State.replace('tasks', t.id, { date: col.dataset.date }).then(function () {
            UI.toast('Moved to ' + Utils.gregorianTitle(col.dataset.date), 'success', 'check');
          });
        }
      });
    });
  }

  function renderDay(container) {
    const dateStr = Utils.toStr(cursor);
    const today = Utils.todayStr();
    const isToday = dateStr === today;
    const ds = State.dayStats(dateStr);
    const tasks = State.tasksFor(dateStr).sort(function (a, b) { return (a.timeStart != null ? a.timeStart : 9999) - (b.timeStart != null ? b.timeStart : 9999); });
    const events = State.eventsFor(dateStr);
    const habits = State.data.habits.map(function (h) {
      const st = State.habitLogStatus(h.id, dateStr);
      return { habit: h, st: st };
    });
    const items = tasks.filter(function (t) { return t.timeStart != null; })
      .map(function (t) { return { kind: 'task', t: t }; })
      .concat(events.map(function (e) { return { kind: 'event', e: e }; }))
      .sort(function (a, b) { return (a.kind === 'task' ? a.t.timeStart : a.e.timeStart) - (b.kind === 'task' ? b.t.timeStart : b.e.timeStart); });

    const ROWH = 26;
    const blocks = items.map(function (it) {
      const s = it.kind === 'task' ? it.t.timeStart : it.e.timeStart;
      const en = it.kind === 'task' ? it.t.timeEnd : it.e.timeEnd;
      const top = (s / 60) * ROWH;
      const h = Math.max(ROWH * 0.6, ((en - s) / 60) * ROWH);
      const isTask = it.kind === 'task';
      return '<div class="mtl-block type-' + it.kind + '" style="top:' + top + 'px;height:' + h + 'px;' +
        (isTask ? 'background:linear-gradient(135deg,' + State.COLOR_HEX[State.colorOf(it.t.category)] + '2e,' + State.COLOR_HEX[State.colorOf(it.t.category)] + '10)' : '') +
        '" data-action="edit-' + (isTask ? 'day-task' : 'day-event') + '" data-id="' + (isTask ? it.t.id : it.e.id) + '">' +
        '<span class="mtb-title">' + Utils.escapeHtml(isTask ? it.t.title : it.e.title) + (isTask && it.t.status === 'done' ? ' ✓' : '') + '</span>' +
        '<span class="mtb-time">' + Utils.minToTime(s, fmt()) + ' – ' + Utils.minToTime(en, fmt()) + '</span></div>';
    }).join('');

    const nowPos = (Utils.nowMin() / 60) * ROWH;

    container.innerHTML =
      '<div class="page-head">' +
      '<div><h2>Calendar</h2><div class="page-head-sub">' + Utils.gregorianTitle(dateStr) + (isToday ? ' · <b style="color:var(--accent)">Today</b>' : '') + '</div></div>' +
      '<div class="page-head-actions">' + UI.segHtml('calView', [
        { val: 'month', label: 'Month' }, { val: 'week', label: 'Week' }, { val: 'day', label: 'Day' }
      ], view, true) +
      '<button class="btn btn-sm" data-action="cal-today">Today</button></div></div>' +

      '<div class="cal-toolbar">' +
      '<div class="cal-nav"><button class="icon-btn" data-action="cal-prev">' + Icons.get('chevL') + '</button>' +
      '<div><div class="cal-title tnum">' + Utils.dateLong(dateStr) + '</div><div class="cal-sub">' + ds.doneTasks.length + '/' + ds.tasksTotal + ' tasks · ' + ds.doneHabits + '/' + ds.habitsTotal + ' habits · ' + Utils.fmtDur(State.focusMin(dateStr)) + ' focus</div></div>' +
      '<button class="icon-btn" data-action="cal-next">' + Icons.get('chevR') + '</button></div>' +
      '<div class="cal-nav"><button class="btn btn-sm" data-action="cal-add-task">' + Icons.get('plus') + ' Task</button>' +
      '<button class="btn btn-sm" data-action="cal-add-event">' + Icons.get('plus') + ' Event</button></div></div>' +

      '<div class="day-view">' +
      '<div class="dv-main">' +
      '<div class="section-title" style="margin-top:0"><span class="st-ic">' + Icons.get('schedule') + '</span>Timeline</div>' +
      '<div class="mini-tl">' +
      Array.from({ length: 24 }, function (_, h) {
        return '<div class="mtl-hour" style="top:' + h * ROWH + 'px"><span class="mtl-label">' + Utils.minToTime(h * 60, fmt()) + '</span></div>';
      }).join('') +
      blocks +
      (isToday ? '<div class="mtb-now" style="top:' + nowPos + 'px"></div>' : '') +
      '</div>' +
      (items.length ? '' : '<div class="empty" style="padding:30px"><div class="empty-sub">This day is completely open.</div><button class="btn btn-accent btn-sm empty-btn" data-action="cal-add-event">Plan a block</button></div>') +
      '</div>' +
      '<div class="dv-side">' +
      '<div class="glass dv-hero"><div class="dv-date">' + Utils.monthDayYear(dateStr).split(',')[0] + '</div>' +
      '<div class="dv-num tnum" style="color:' + (ds.pct == null ? 'var(--text-muted)' : 'var(--accent)') + '">' + (ds.pct == null ? '—' : ds.pct + '%') + '</div>' +
      '<div class="dv-date" style="margin-top:2px">productivity</div></div>' +
      '<div class="glass dv-hero" style="padding:16px 20px">' +
      '<div class="section-title" style="margin:0 0 10px"><span class="st-ic">' + Icons.get('habits') + '</span>Habits</div>' +
      (habits.length
        ? '<div class="dv-habits">' + habits.map(function (x) {
          return '<div class="dv-habit' + (x.st ? ' ' + x.st : '') + '"><span class="dh-dot" style="background:' + State.COLOR_HEX[x.habit.color] + '"></span><span class="dh-name">' + Utils.escapeHtml(x.habit.name) + '</span>' +
            (x.st === 'done' ? '<span class="chip success">done</span>' : x.st === 'skipped' ? '<span class="chip warning">skipped</span>' : '<span class="chip">—</span>') + '</div>';
        }).join('') + '</div>'
        : '<div class="empty" style="padding:20px"><div class="empty-sub">No habits yet.</div></div>') +
      '</div>' +
      '</div></div>';
  }

  function render(container) {
    if (view === 'month') renderMonth(container);
    else if (view === 'week') renderWeek(container);
    else renderDay(container);
    const seg = container.querySelector('#calView');
    if (seg) {
      seg.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          view = b.dataset.val;
          Router.refresh();
        });
      });
    }
  }

  const actions = {
    'goto-day': function (e, el) {
      view = 'day';
      cursor = Utils.fromStr(el.dataset.date);
      Router.refresh();
    },
    'edit-day-task': function (e, el) {
      const t = State.data.tasks.find(function (x) { return x.id === el.dataset.id; });
      if (t) UI.taskModal(t);
    },
    'edit-day-event': function (e, el) {
      const ev = State.data.events.find(function (x) { return x.id === el.dataset.id; });
      if (ev) UI.eventModal(ev);
    },
    'cal-prev': function () {
      if (view === 'month') cursor = new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1);
      else if (view === 'week') cursor = Utils.fromStr(Utils.addDays(Utils.startOfWeek(Utils.toStr(cursor), State.getSetting('weekStart')), -7));
      else cursor = Utils.fromStr(Utils.addDays(Utils.toStr(cursor), -1));
      Router.refresh();
    },
    'cal-next': function () {
      if (view === 'month') cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
      else if (view === 'week') cursor = Utils.fromStr(Utils.addDays(Utils.startOfWeek(Utils.toStr(cursor), State.getSetting('weekStart')), 7));
      else cursor = Utils.fromStr(Utils.addDays(Utils.toStr(cursor), 1));
      Router.refresh();
    },
    'cal-today': function () { cursor = new Date(); Router.refresh(); },
    'cal-add-task': function () { UI.quickAdd('task', { date: Utils.toStr(cursor) }); },
    'cal-add-event': function () { UI.quickAdd('schedule', { date: Utils.toStr(cursor) }); }
  };

  return {
    render: render, actions: actions,
    setView: function (v) { view = v; },
    get cursorDate() { return Utils.toStr(cursor); },
    setCursorDate: setCursorDate
  };
})();