window.TodayPage = (function () {
  let date = Utils.todayStr();

  function render(container, params) {
    if (params && params.date) date = params.date;
    const fmt = State.getSetting('timeFormat');
    const ds = State.dayStats(date);
    const focus = State.focusMin(date);
    const conflicts = State.getConflicts(date);
    const today = Utils.todayStr();
    const isToday = date === today;

    const items = State.tasksFor(date)
      .filter(function (t) { return t.timeStart != null; })
      .map(function (t) { return { kind: 'task', id: t.id, timeStart: t.timeStart, timeEnd: t.timeEnd, title: t.title, status: t.status }; })
      .concat(State.eventsFor(date).map(function (e) { return { kind: 'event', id: e.id, timeStart: e.timeStart, timeEnd: e.timeEnd, title: e.title }; }))
      .sort(function (a, b) { return a.timeStart - b.timeStart; });

    const ring = UI.ring(ds.pct, { label: 'Day Productivity', width: 'min(150px,46%)' });

    const tasks = State.tasksFor(date).sort(function (a, b) {
      const at = a.timeStart != null ? a.timeStart : 9999, bt = b.timeStart != null ? b.timeStart : 9999;
      return at - bt;
    });

    container.innerHTML =
      '<div class="page-head">' +
      '<div><h2>' + (isToday ? 'Today' : Utils.gregorianTitle(date)) + '</h2>' +
      '<div class="page-head-sub">' + Utils.dateLong(date) + (isToday ? ' · <b style="color:var(--accent)">Today</b>' : '') + '</div></div>' +
      '<div class="page-head-actions">' +
      '<button class="icon-btn" data-action="day-prev" aria-label="Previous day">' + Icons.get('chevL') + '</button>' +
      '<span class="chip accent" style="font-size:12px;min-width:88px;justify-content:center;padding:7px 10px">' + Utils.monthDayYear(date).split(',')[1].trim() + '</span>' +
      '<button class="icon-btn" data-action="day-next" aria-label="Next day">' + Icons.get('chevR') + '</button>' +
      (isToday ? '' : '<button class="btn btn-sm" data-action="goto-today">Jump to today</button>') +
      '<button class="btn btn-accent btn-sm" data-action="add-task">' + Icons.get('plus') + ' Task</button>' +
      '<button class="btn btn-sm" data-action="add-schedule">' + Icons.get('plus') + ' Schedule</button>' +
      '</div></div>' +

      (conflicts.length ? '<div class="conflict-banner"><span class="cb-ic">' + Icons.get('alert') + '</span>' +
        '<div class="cb-main"><b>Time conflict detected</b><div class="cb-list">' + conflicts.map(function (p) {
          return '<span>&bull; ' + Utils.escapeHtml(p[0].title) + ' overlaps with ' + Utils.escapeHtml(p[1].title) + '</span>';
        }).join('') + '</div></div></div>' : '') +

      '<div class="hero-zone" style="grid-template-columns:1fr 1fr">' +
      '<div class="glass ring-card" style="display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:8px">' +
      '<div id="ringMount">' + ring.html + '</div>' +
      '<div class="rc-stats">' +
      '<div class="rc-stat"><span class="rs-ic c-green">' + Icons.get('check') + '</span><div class="rs-main"><div class="rs-top"><b>' + ds.doneTasks.length + ' / ' + ds.tasksTotal + '</b><span>Tasks</span></div><div class="progress"><div class="progress-bar" style="width:' + (ds.tasksTotal ? Math.round((ds.doneTasks.length / ds.tasksTotal) * 100) : 0) + '%"></div></div></div></div>' +
      '<div class="rc-stat"><span class="rs-ic c-blue">' + Icons.get('habits') + '</span><div class="rs-main"><div class="rs-top"><b>' + ds.doneHabits + ' / ' + ds.habitsTotal + '</b><span>Habits</span></div><div class="progress"><div class="progress-bar" style="width:' + (ds.habitsTotal ? Math.round((ds.doneHabits / ds.habitsTotal) * 100) : 0) + '%"></div></div></div></div>' +
      '<div class="rc-stat"><span class="rs-ic c-violet">' + Icons.get('timer') + '</span><div class="rs-main"><div class="rs-top"><b>' + Utils.fmtDur(focus) + '</b><span>Focus Time</span></div><div class="progress"><div class="progress-bar" style="width:' + Math.min(100, Math.round((focus / 480) * 100)) + '%"></div></div></div></div>' +
      '</div>' +
      '</div>' +

      '<div class="glass mini-card">' +
      '<div class="mc-head"><span class="mc-title">' + Icons.get('habits') + ' Habit Quick Log</span></div>' +
      (State.data.habits.length
        ? '<div class="ht-chips" style="margin-top:4px">' + State.data.habits.map(function (h) {
          const st = State.habitLogStatus(h.id, date);
          const canToggle = date <= today;
          return '<button class="ht-chip' + (st === 'done' ? ' on' : '') + '" data-action="log-habit" data-id="' + h.id + '"' + (canToggle ? '' : ' disabled') + '>' +
            '<span class="htc-dot" style="background:' + State.COLOR_HEX[h.color] + '"></span>' +
            '<span class="htc-check">' + Icons.get('check') + '</span>' + Utils.escapeHtml(h.name) +
            (st === 'skipped' ? ' <span class="badge p-todo">skipped</span>' : '') +
            '</button>';
        }).join('') + '</div>'
        : '<div class="empty" style="padding:24px"><div class="empty-ic">' + Icons.get('habits') + '</div><div class="empty-title">No habits yet</div><div class="empty-sub">Create habits to track your daily routine.</div><button class="btn btn-accent btn-sm empty-btn" data-action="add-habit">Add Habit</button></div>') +
      '</div>' +
      '</div>' +

      '<div class="section-title"><span class="st-ic">' + Icons.get('schedule') + '</span>Timeline <span class="st-spacer"></span>' +
      '<span class="st-link" data-action="open-schedule">Full editor ' + Icons.get('chevR') + '</span></div>' +
      (items.length
        ? '<div class="glass tl-card"><div class="tl-list">' + items.map(function (it) {
          return '<div class="tl-item' + (it.kind === 'task' && it.status === 'done' ? ' done' : '') + '" style="display:flex;gap:14px">' +
            '<div class="tli-time" style="margin:0;min-width:70px">' + Utils.minToTime(it.timeStart, fmt) + '–' + Utils.minToTime(it.timeEnd, fmt) + '</div>' +
            '<div class="tli-main" style="flex:1;min-width:0"><div class="tli-title">' + Utils.escapeHtml(it.title) + ' ' +
            (it.kind === 'task' ? (it.status === 'done' ? '<span class="chip success">Done</span>' : '') : '<span class="chip violet">Event</span>') + '</div>' +
            '<div class="tli-desc">' + Utils.fmtDur(it.timeEnd - it.timeStart) + ' · ' + (it.kind === 'task' ? 'Task' : 'Scheduled block') + '</div></div>' +
            (it.kind === 'task'
              ? '<span class="check-btn' + (it.status === 'done' ? ' on' : '') + '" data-action="toggle-day-task" data-id="' + it.id + '">' + Icons.get('check') + '</span>'
              : '') +
            '</div>';
        }).join('') + '</div></div>'
        : '<div class="empty glass" style="padding:44px"><div class="empty-ic">' + Icons.get('schedule') + '</div><div class="empty-title">This day is open</div><div class="empty-sub">No tasks or events scheduled for this day.</div><button class="btn btn-accent empty-btn" data-action="add-schedule">Plan something</button></div>') +

      '<div class="section-title"><span class="st-ic">' + Icons.get('tasks') + '</span>Tasks <span class="st-spacer"></span>' +
      '<span class="st-link" data-action="goto-tasks">Manage all ' + Icons.get('chevR') + '</span></div>' +
      (tasks.length
        ? '<div class="glass tl-card"><div class="upcoming-list">' + tasks.map(function (t) {
          return '<div class="up-next" data-action="edit-day-task" data-id="' + t.id + '">' +
            '<span class="un-time">' + (t.timeStart != null ? Utils.minToTime(t.timeStart, fmt) : 'Any time') + '</span>' +
            '<div class="un-main"><div class="un-title">' + Utils.escapeHtml(t.title) + (t.templateId ? ' <span class="chip accent">recurring</span>' : '') + '</div>' +
            '<div class="un-meta">' + UI.badgePriority(t.priority) + ' ' + UI.chipCategory(t.category) + '</div></div>' +
            '<span class="un-ctl check-btn' + (t.status === 'done' ? ' on' : '') + '" data-action="toggle-day-task" data-id="' + t.id + '">' + Icons.get('check') + '</span>' +
            '</div>';
        }).join('') + '</div></div>'
        : '<div class="empty glass" style="padding:40px"><div class="empty-ic">' + Icons.get('tasks') + '</div><div class="empty-title">No tasks for this day</div><div class="empty-sub">Create your first task to start building momentum.</div><button class="btn btn-accent empty-btn" data-action="add-task">Add Task</button></div>');

    ring.mount(container.querySelector('#ringMount'));
  }

  const actions = {
    'day-prev': function () { date = Utils.addDays(date, -1); Router.refresh(); },
    'day-next': function () { date = Utils.addDays(date, 1); Router.refresh(); },
    'goto-today': function () { date = Utils.todayStr(); Router.refresh(); },
    'goto-tasks': function () { Router.navigate('tasks'); },
    'open-schedule': function () { Router.navigate('schedule'); },
    'add-task': function () { UI.quickAdd('task', { date: date }); },
    'add-habit': function () { UI.habitModal(null); },
    'add-schedule': function () { UI.quickAdd('schedule', { date: date }); },
    'log-habit': function (e, el) {
      const hid = el.dataset.id;
      const cur = State.habitLogStatus(hid, date);
      const next = cur === 'done' ? 'skipped' : 'done';
      const rec = { id: Utils.uid(), habitId: hid, date: date, status: next };
      const existing = State.logFor(hid, date);
      const job = existing ? State.update('habitLogs', Object.assign({}, existing, { status: next })) : State.add('habitLogs', rec);
      job.then(function () {
        if (next === 'done') UI.toast('Habit logged', 'success', 'check');
        else UI.toast('Habit marked skipped', 'info', 'repeat');
        Router.refresh();
      });
    },
    'toggle-day-task': function (e, el) {
      e.stopPropagation();
      const t = State.data.tasks.find(function (x) { return x.id === el.dataset.id; });
      if (!t) return;
      const next = t.status === 'done' ? 'todo' : 'done';
      State.replace('tasks', t.id, { status: next }).then(function () {
        UI.toast(next === 'done' ? 'Task completed' : 'Task reopened', next === 'done' ? 'success' : 'info', next === 'done' ? 'check' : 'repeat');
      });
    },
    'edit-day-task': function (e, el) {
      const t = State.data.tasks.find(function (x) { return x.id === el.dataset.id; });
      if (t) UI.taskModal(t);
    }
  };

  return { render: render, actions: actions };
})();