window.TasksPage = (function () {
  const filter = { status: 'all', priority: 'all', category: 'all', q: '' };

  function setSearch(q) { filter.q = q; }

  function matches(t) {
    if (filter.status !== 'all' && t.status !== filter.status) return false;
    if (filter.priority !== 'all' && t.priority !== filter.priority) return false;
    if (filter.category !== 'all' && t.category !== filter.category) return false;
    if (filter.q && (t.title + ' ' + (t.description || '')).toLowerCase().indexOf(filter.q.toLowerCase()) < 0) return false;
    return true;
  }

  function grouped(tasks) {
    const today = Utils.todayStr();
    const groups = [];
    const overdue = [];
    const todayG = [];
    const tomorrowG = [];
    const upcomingG = [];
    const doneG = [];
    tasks.forEach(function (t) {
      if (t.status === 'done') { doneG.push(t); return; }
      if (t.date < today) { overdue.push(t); return; }
      if (t.date === today) { todayG.push(t); return; }
      if (t.date === Utils.addDays(today, 1)) { tomorrowG.push(t); return; }
      upcomingG.push(t);
    });
    const sortFn = function (a, b) {
      const at = a.timeStart != null ? a.timeStart : 9999;
      const bt = b.timeStart != null ? b.timeStart : 9999;
      return (at - bt) || ((a.priority === 'urgent' ? 0 : 1) - (b.priority === 'urgent' ? 0 : 1));
    };
    overdue.sort(sortFn); todayG.sort(sortFn); tomorrowG.sort(sortFn);
    upcomingG.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    doneG.sort(function (a, b) { return a.date > b.date ? -1 : 1; });
    return { overdue: overdue, today: todayG, tomorrow: tomorrowG, upcoming: upcomingG, done: doneG };
  }

  function taskCard(t, fmt) {
    return '<div class="block-item' + (t.status === 'done' ? ' done' : '') + '" data-action="edit-task" data-id="' + t.id + '" style="cursor:pointer">' +
      '<span class="check-btn' + (t.status === 'done' ? ' on' : '') + '" data-action="toggle-task" data-id="' + t.id + '">' + Icons.get('check') + '</span>' +
      '<div class="bi-main">' +
      '<div class="bi-title">' + Utils.escapeHtml(t.title) + (t.templateId ? ' <span class="chip accent">' + Icons.get('repeat') + ' recurring</span>' : '') + '</div>' +
      '<div class="bi-time">' +
      (t.timeStart != null ? '<span class="chip">' + Icons.get('clock') + Utils.minToTime(t.timeStart, fmt) + ' – ' + Utils.minToTime(t.timeEnd, fmt) + '</span>' : '') +
      UI.chipCategory(t.category) +
      '</div></div>' +
      '<div class="bi-right">' +
      UI.badgePriority(t.priority) +
      UI.badgeStatus(t.status) +
      '<button class="icon-btn small" data-action="edit-task" data-id="' + t.id + '" aria-label="Edit">' + Icons.get('edit') + '</button>' +
      '<button class="icon-btn small" data-action="delete-task" data-id="' + t.id + '" aria-label="Delete">' + Icons.get('trash') + '</button>' +
      '</div></div>';
  }

  function groupBlock(title, icon, items, fmt, emptyText, addAction) {
    return '<div class="section-title"><span class="st-ic">' + Icons.get(icon) + '</span>' + title +
      ' <span class="chip tnum">' + items.length + '</span><span class="st-spacer"></span></div>' +
      (items.length
        ? '<div class="glass tl-card" style="padding:14px;display:flex;flex-direction:column;gap:10px">' + items.map(function (t) { return taskCard(t, fmt); }).join('') + '</div>'
        : '<div class="empty glass" style="padding:34px"><div class="empty-ic">' + Icons.get(icon) + '</div><div class="empty-title">' + title + '</div><div class="empty-sub">' + emptyText + '</div></div>');
  }

  function render(container) {
    const fmt = State.getSetting('timeFormat');
    const all = State.data.tasks;
    const filtered = all.filter(matches);
    const g = grouped(filtered);
    const cats = State.data.categories;

    const segStatus = UI.segHtml('fStatus', [
      { val: 'all', label: 'All' },
      { val: 'todo', label: 'Todo' },
      { val: 'in-progress', label: 'In Progress' },
      { val: 'done', label: 'Done' }
    ], filter.status, true);
    const segPriority = UI.segHtml('fPriority', [
      { val: 'all', label: 'All' },
      { val: 'low', label: 'Low' },
      { val: 'medium', label: 'Medium' },
      { val: 'high', label: 'High' },
      { val: 'urgent', label: 'Urgent' }
    ], filter.priority);
    const segCat = UI.segHtml('fCat', [{ val: 'all', label: 'All' }].concat(cats.map(function (c) {
      return { val: c.name, label: c.name };
    })), filter.category);

    container.innerHTML =
      '<div class="page-head">' +
      '<div><h2>Tasks</h2><div class="page-head-sub">' + all.length + ' total · ' + all.filter(function (t) { return t.status === 'done'; }).length + ' completed</div></div>' +
      '<div class="page-head-actions">' +
      '<div style="position:relative">' +
      '<input class="input" id="taskSearch" placeholder="Filter tasks…" value="' + Utils.escapeHtml(filter.q) + '" style="padding-left:38px;width:220px">' +
      '<span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);display:grid;place-items:center">' + Icons.get('search') + '</span></div>' +
      '<button class="btn btn-accent" data-action="add-task">' + Icons.get('plus') + ' New Task</button>' +
      '</div></div>' +

      '<div class="glass" style="padding:13px 15px;display:flex;gap:12px;flex-wrap:wrap;align-items:center">' +
      '<span style="font-size:11.5px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em">Status</span>' + segStatus +
      '<span style="width:1px;height:22px;background:var(--glass-border)"></span>' +
      '<span style="font-size:11.5px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em">Priority</span>' + segPriority +
      '<span style="width:1px;height:22px;background:var(--glass-border)"></span>' +
      '<span style="font-size:11.5px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em">Category</span>' + segCat +
      '</div>' +

      (filtered.length === 0
        ? '<div class="empty glass" style="margin-top:18px;padding:56px"><div class="empty-ic">' + Icons.get('tasks') + '</div><div class="empty-title">No tasks yet</div><div class="empty-sub">Create your first task — it takes seconds.</div><button class="btn btn-accent empty-btn" data-action="add-task">Create your first task</button></div>'
        : groupBlock('Overdue', 'alert', g.overdue, fmt, 'Nothing missed — great job.', '') +
          groupBlock('Today', 'today', g.today, fmt, 'No tasks scheduled for today yet.', '') +
          groupBlock('Tomorrow', 'calendar', g.tomorrow, fmt, 'Nothing planned for tomorrow yet.', '') +
          groupBlock('Upcoming', 'schedule', g.upcoming, fmt, 'No upcoming tasks.', '') +
          groupBlock('Completed', 'check', g.done, fmt, 'No completed tasks yet.', ''));

    bind(container);
  }

  function bind(container) {
    const input = container.querySelector('#taskSearch');
    if (input) {
      input.addEventListener('input', Utils.debounce(function () {
        filter.q = input.value.trim();
        Router.refresh();
      }, 200));
    }
    container.querySelectorAll('#fStatus button, #fPriority button, #fCat button').forEach(function (b) {
      b.addEventListener('click', function () {
        const group = b.closest('.seg');
        const key = group.id === 'fStatus' ? 'status' : group.id === 'fPriority' ? 'priority' : 'category';
        filter[key] = b.dataset.val;
        Router.refresh();
      });
    });
  }

  const actions = {
    'add-task': function () { UI.quickAdd('task'); },
    'edit-task': function (e, el) {
      const t = State.data.tasks.find(function (x) { return x.id === el.dataset.id; });
      if (t) UI.taskModal(t);
    },
    'delete-task': async function (e, el) {
      const t = State.data.tasks.find(function (x) { return x.id === el.dataset.id; });
      if (!t) return;
      const ok = await UI.confirm({
        title: t.templateId ? 'Delete this task?' : (t.recurring && t.recurring.type !== 'none' ? 'Delete recurring series?' : 'Delete task?'),
        message: (t.templateId ? 'Only this occurrence will be deleted.' : (t.recurring && t.recurring.type !== 'none' ? 'This deletes the task and every upcoming occurrence.' : 'This cannot be undone.')) + ' <b>' + Utils.escapeHtml(t.title) + '</b>',
        danger: true, okText: 'Delete'
      });
      if (!ok) return;
      UI.clearNotificationsFor(t.id);
      await State.deleteTask(t.id);
      UI.toast('Task deleted', 'info', 'trash');
    },
    'toggle-task': function (e, el) {
      e.stopPropagation();
      const t = State.data.tasks.find(function (x) { return x.id === el.dataset.id; });
      if (!t) return;
      const next = t.status === 'done' ? 'todo' : 'done';
      State.replace('tasks', t.id, { status: next }).then(function () {
        if (next === 'done') {
          UI.clearNotificationsFor(t.id);
          UI.toast('Task completed', 'success', 'check');
        } else UI.toast('Task reopened', 'info', 'repeat');
      });
    }
  };

  return { render: render, actions: actions, setSearch: setSearch };
})();