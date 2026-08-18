window.DashboardPage = (function () {
  function render(container) {
    const today = Utils.todayStr();
    const g = Utils.greeting();
    const ds = State.dayStats(today);
    const focus = State.focusMin(today);
    const streak = State.bestCurrentStreak();

    const kpiTasks = State.tasksFor(today);
    const doneTasks = kpiTasks.filter(function (t) { return t.status === 'done'; }).length;
    const habsToday = State.logsForDate(today).filter(function (l) { return l.status === 'done'; }).length;

    const dayItems = State.tasksFor(today)
      .filter(function (t) { return t.timeStart != null; })
      .map(function (t) { return { time: t.timeStart, title: t.title, sub: t.category, kind: 'task', status: t.status }; })
      .concat(State.eventsFor(today).map(function (e) { return { time: e.timeStart, title: e.title, sub: 'Event · ' + e.color, kind: 'event' }; }))
      .sort(function (a, b) { return a.time - b.time; });

    const upcoming = State.data.tasks
      .filter(function (t) { return t.status !== 'done' && !t.recurring || (t.status !== 'done' && t.templateId); })
      .filter(function (t) { return t.date >= today || (t.timeStart != null && t.date === today); })
      .sort(function (a, b) { return (a.date + (a.timeStart != null ? String(a.timeStart).padStart(4, '0') : '9999')) < (b.date + (b.timeStart != null ? String(b.timeStart).padStart(4, '0') : '9999')) ? -1 : 1; })
      .slice(0, 6);

    const week = [];
    for (let i = 6; i >= 0; i--) {
      const d = Utils.addDays(today, -i);
      week.push({ label: Utils.WEEK_SHORT[Utils.weekday(d)].slice(0, 1), pct: State.dayStats(d).pct });
    }
    const weekPcts = week.filter(function (w) { return w.pct != null; });
    const weekAvg = weekPcts.length ? Math.round(weekPcts.reduce(function (a, b) { return a + b.pct; }, 0) / weekPcts.length) : null;

    const fmt = State.getSetting('timeFormat');
    const ring = UI.ring(ds.pct, {
      label: 'Today&rsquo;s Productivity',
      badge: ds.pct != null && ds.pct >= 70
        ? '<span class="ring-badge">' + Icons.get('zap') + ' Great pace</span>'
        : ''
    });

    container.innerHTML =
      '<div class="greeting">' +
      '<div class="g-hi"><span class="g-ico">' + Icons.get(g.icon) + '</span>' + Utils.escapeHtml(g.text) + '</div>' +
      '<div class="g-sub">Here is your day at a glance. <span class="g-date">' + Utils.monthDayYear(today) + '</span></div>' +
      '</div>' +

      '<div class="kpi-grid tilt">' +
      '<div class="glass kpi blue lift">' +
      '<div class="kpi-top"><span class="kpi-label">Tasks Today</span><span class="kpi-ic">' + Icons.get('tasks') + '</span></div>' +
      '<div class="kpi-value tnum">' + doneTasks + '<span class="kpi-unit"> / ' + ds.tasksTotal + '</span></div>' +
      '<div class="kpi-sub">' + (kpiTasks.length ? Math.round((doneTasks / kpiTasks.length) * 100) + '% completed' : 'Nothing planned yet') + '</div>' +
      '</div>' +
      '<div class="glass kpi violet lift">' +
      '<div class="kpi-top"><span class="kpi-label">Habits Today</span><span class="kpi-ic">' + Icons.get('habits') + '</span></div>' +
      '<div class="kpi-value tnum">' + habsToday + '<span class="kpi-unit"> / ' + State.data.habits.length + '</span></div>' +
      '<div class="kpi-sub">' + (State.data.habits.length ? Math.round((habsToday / State.data.habits.length) * 100) + '% of your habits' : 'No habits yet') + '</div>' +
      '</div>' +
      '<div class="glass kpi cyan lift">' +
      '<div class="kpi-top"><span class="kpi-label">Productivity</span><span class="kpi-ic">' + Icons.get('zap') + '</span></div>' +
      '<div class="kpi-value tnum">' + (ds.pct == null ? '—' : ds.pct + '<span class="kpi-unit">%</span>') + '</div>' +
      '<div class="kpi-sub">' + (weekAvg != null ? 'Week avg ' + weekAvg + '%' : 'Not enough data yet') + '</div>' +
      '</div>' +
      '<div class="glass kpi green lift">' +
      '<div class="kpi-top"><span class="kpi-label">Streak</span><span class="kpi-ic">' + Icons.get('flame') + '</span></div>' +
      '<div class="kpi-value tnum">' + streak.days + '<span class="kpi-unit"> days</span></div>' +
      '<div class="kpi-sub">' + (streak.habit ? Utils.escapeHtml(streak.habit.name) : 'Start a habit streak') + '</div>' +
      '</div>' +
      '</div>' +

      '<div class="hero-zone">' +
      '<div class="glass ring-card" id="ringCard">' +
      '<div class="rc-head"><span class="rc-title"><span class="rc-ic">' + Icons.get('zap') + '</span>Today&rsquo;s Productivity</span><span class="rc-date">' + Utils.monthDayYear(today) + '</span></div>' +
      '<div id="ringMount">' + ring.html + '</div>' +
      '<div class="rc-stats">' +
      '<div class="rc-stat"><span class="rs-ic c-green">' + Icons.get('check') + '</span>' +
      '<div class="rs-main"><div class="rs-top"><b>' + doneTasks + ' / ' + ds.tasksTotal + '</b><span>Tasks Completed</span></div>' +
      '<div class="progress"><div class="progress-bar" style="width:' + (ds.tasksTotal ? Math.round((doneTasks / ds.tasksTotal) * 100) : 0) + '%"></div></div></div></div>' +
      '<div class="rc-stat"><span class="rs-ic c-blue">' + Icons.get('habits') + '</span>' +
      '<div class="rs-main"><div class="rs-top"><b>' + habsToday + ' / ' + State.data.habits.length + '</b><span>Habits Completed</span></div>' +
      '<div class="progress"><div class="progress-bar" style="width:' + (State.data.habits.length ? Math.round((habsToday / State.data.habits.length) * 100) : 0) + '%"></div></div></div></div>' +
      '<div class="rc-stat"><span class="rs-ic c-violet">' + Icons.get('timer') + '</span>' +
      '<div class="rs-main"><div class="rs-top"><b>' + Utils.fmtDur(focus) + '</b><span>Time Focused Today</span></div>' +
      '<div class="progress"><div class="progress-bar" style="width:' + Math.min(100, Math.round((focus / 480) * 100)) + '%"></div></div></div></div>' +
      '</div>' +
      '</div>' +

      '<div class="side-stack">' +
      '<div class="glass mini-card lift">' +
      '<div class="mc-head"><span class="mc-title">' + Icons.get('flame') + ' Current Streak</span><span class="mc-num tnum" style="color:var(--warning)">' + streak.days + '</span></div>' +
      '<div class="mc-sub">' + (streak.habit ? 'Longest active run — ' + Utils.escapeHtml(streak.habit.name) : 'Complete a habit daily to build momentum') + '</div>' +
      '</div>' +
      '<div class="glass mini-card lift">' +
      '<div class="mc-head"><span class="mc-title">' + Icons.get('timer') + ' Focus Time Today</span><span class="mc-num tnum">' + Utils.fmtDur(focus) + '</span></div>' +
      '<div class="progress" style="height:7px"><div class="progress-bar" style="width:' + Math.min(100, Math.round((focus / 480) * 100)) + '%"></div></div>' +
      '<div class="mc-sub">' + Math.min(100, Math.round((focus / 480) * 100)) + '% of your 8h focus target</div>' +
      '</div>' +
      '<div class="glass mini-card lift">' +
      '<div class="mc-head"><span class="mc-title">' + Icons.get('statistics') + ' This Week</span><span class="mc-num tnum" style="font-size:19px">' + (weekAvg != null ? weekAvg + '%' : '—') + '</span></div>' +
      '<div class="mini-bar-chart">' + week.map(function (w) {
        return '<div class="mb" title="' + (w.pct == null ? 'No data' : w.pct + '%') + '"><div class="mb-bar' + (w.pct != null && w.pct >= 65 ? ' hi' : w.pct != null && w.pct >= 35 ? ' me' : '') + '" style="height:' + (w.pct == null ? 4 : Math.max(8, w.pct)) + '%"></div><span class="mb-label">' + w.label + '</span></div>';
      }).join('') + '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<div class="dash-bottom">' +
      '<div class="glass tl-card">' +
      '<div class="section-title" style="margin-top:0"><span class="st-ic">' + Icons.get('schedule') + '</span>Today&rsquo;s Schedule <span class="st-spacer"></span>' +
      '<span class="st-link" data-action="goto-schedule">Open schedule ' + Icons.get('chevR') + '</span></div>' +
      (dayItems.length
        ? '<div class="tl-list">' + dayItems.slice(0, 6).map(function (it) {
          return '<div class="tl-item"><div class="tli-time">' + Utils.minToTime(it.time, fmt) + '</div><div class="tli-title">' + Utils.escapeHtml(it.title) + (it.kind === 'task' && it.status === 'done' ? ' <span class="chip success">Done</span>' : '') + '</div><div class="tli-desc">' + Utils.escapeHtml(it.sub) + '</div></div>';
        }).join('') + '</div>'
        : '<div class="empty" style="padding:36px"><div class="empty-ic">' + Icons.get('schedule') + '</div><div class="empty-title">Nothing scheduled</div><div class="empty-sub">Add your first time-block for today.</div><button class="btn btn-accent empty-btn" data-action="add-schedule">Add Schedule</button></div>') +
      '</div>' +
      '<div class="glass tl-card">' +
      '<div class="section-title" style="margin-top:0"><span class="st-ic">' + Icons.get('tasks') + '</span>Upcoming Tasks <span class="st-spacer"></span>' +
      '<span class="st-link" data-action="goto-tasks">All tasks ' + Icons.get('chevR') + '</span></div>' +
      (upcoming.length
        ? '<div class="upcoming-list">' + upcoming.map(function (t) {
          const dueSoon = t.date <= today;
          return '<div class="up-next' + (dueSoon ? ' due-soon' : '') + '" data-action="edit-task" data-id="' + t.id + '">' +
            '<span class="un-time">' + (t.timeStart != null ? Utils.minToTime(t.timeStart, fmt) : Utils.relDay(t.date)) + '</span>' +
            '<div class="un-main"><div class="un-title">' + Utils.escapeHtml(t.title) + (t.templateId ? ' <span class="chip accent">recurring</span>' : '') + '</div>' +
            '<div class="un-meta">' + (t.timeStart != null ? Utils.relDay(t.date) : '') + (t.priority === 'urgent' || t.priority === 'high' ? ' <span class="badge pr-' + t.priority + '"><span class="priority-dot"></span>' + (t.priority === 'urgent' ? 'Urgent' : 'High') + '</span>' : '') + '</div></div>' +
            '<span class="un-ctl check-btn' + (t.status === 'done' ? ' on' : '') + '" data-action="toggle-task" data-id="' + t.id + '">' + Icons.get('check') + '</span>' +
            '</div>';
        }).join('') + '</div>'
        : '<div class="empty" style="padding:36px"><div class="empty-ic">' + Icons.get('tasks') + '</div><div class="empty-title">All caught up</div><div class="empty-sub">No upcoming tasks. Enjoy the calm.</div><button class="btn btn-accent empty-btn" data-action="add-task">Add Task</button></div>') +
      '</div>' +
      '</div>';

    ring.mount(container.querySelector('#ringMount'));
    bind(container);
  }

  function bind(container) {
    UI.on(container, 'click', '[data-action="toggle-task"]', function (e, el) {
      e.stopPropagation();
      const id = el.dataset.id;
      const t = State.data.tasks.find(function (x) { return x.id === id; });
      if (!t) return;
      const next = t.status === 'done' ? 'todo' : 'done';
      State.replace('tasks', id, { status: next }).then(function () {
        if (next === 'done') {
          UI.toast('Task completed', 'success', 'check');
          el.classList.add('on');
        } else { UI.toast('Task reopened', 'info', 'repeat'); el.classList.remove('on'); }
      });
    });
  }

  const actions = {
    'goto-schedule': function () { Router.navigate('schedule'); },
    'goto-tasks': function () { Router.navigate('tasks'); },
    'add-task': function () { UI.quickAdd('task'); },
    'add-schedule': function () { UI.quickAdd('schedule'); },
    'edit-task': function (e, el) {
      const t = State.data.tasks.find(function (x) { return x.id === el.dataset.id; });
      if (t) UI.taskModal(t);
    }
  };

  return { render: render, actions: actions };
})();