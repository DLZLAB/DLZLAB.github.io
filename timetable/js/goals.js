window.GoalsPage = (function () {
  function goalProgress(goal) {
    const miles = State.data.milestones.filter(function (m) { return m.goalId === goal.id; });
    const done = miles.filter(function (m) { return m.done; }).length;
    const related = State.data.tasks.filter(function (t) { return t.goalId === goal.id; });
    const relatedDone = related.filter(function (t) { return t.status === 'done'; }).length;
    return {
      milestones: miles, doneMiles: done,
      pct: miles.length ? Math.round((done / miles.length) * 100) : (related.length ? Math.round((relatedDone / related.length) * 100) : 0),
      related: related, relatedDone: relatedDone
    };
  }

  function daysLeft(deadline) {
    const today = Utils.todayStr();
    if (deadline < today) return { label: 'Overdue by ' + Utils.diffDays(deadline, today) + 'd', cls: 'deadline-passed' };
    if (deadline === today) return { label: 'Due today', cls: 'deadline-near' };
    const d = Utils.diffDays(today, deadline);
    return { label: d + ' days left', cls: d <= 7 ? 'deadline-near' : '' };
  }

  function render(container) {
    const goals = State.data.goals.slice().sort(function (a, b) { return a.deadline < b.deadline ? -1 : 1; });
    container.innerHTML =
      '<div class="page-head">' +
      '<div><h2>Goals</h2><div class="page-head-sub">' + goals.length + ' active goal' + (goals.length === 1 ? '' : 's') + ' · ' + goals.filter(function (g) { return goalProgress(g).pct >= 100; }).length + ' complete</div></div>' +
      '<div class="page-head-actions"><button class="btn btn-accent" data-action="add-goal">' + Icons.get('plus') + ' New Goal</button></div>' +
      '</div>' +

      (goals.length
        ? '<div class="goals-grid">' + goals.map(function (g) {
          const p = goalProgress(g);
          const dl = daysLeft(g.deadline);
          const complete = p.pct >= 100;
          return '<div class="glass goal-card' + (dl.cls ? ' ' + dl.cls : '') + (complete ? ' complete-g' : '') + '"' +
            ' style="--gc1:' + State.COLOR_HEX[g.color] + ';--gc2:' + State.COLOR_HEX[g.color === 'blue' ? 'violet' : g.color === 'violet' ? 'purple' : 'cyan'] + ';--gc-glow:' + State.COLOR_HEX[g.color] + '55">' +
            '<div class="gc-top"><span class="gc-ic">' + Icons.get('target') + '</span>' +
            '<div class="gc-main"><div class="gc-title">' + Utils.escapeHtml(g.title) + '</div>' +
            '<div class="gc-desc">' + Utils.escapeHtml(g.description || 'No description yet.') + '</div>' +
            '<div class="gc-meta"><span class="chip gc-deadline">' + Icons.get('calendar') + ' ' + Utils.dateLong(g.deadline) + '</span>' +
            '<span class="chip ' + (dl.cls === 'deadline-passed' ? 'danger' : dl.cls === 'deadline-near' ? 'warning' : '') + '">' + dl.label + '</span>' +
            (complete ? '<span class="chip success">' + Icons.get('trophy') + ' Completed</span>' : '') +
            '</div></div></div>' +
            '<div class="gc-progress-head"><span class="gc-pct tnum">' + p.pct + '%</span><span class="gc-plabel">' + p.doneMiles + ' / ' + p.milestones.length + ' milestones</span></div>' +
            '<div class="progress" style="height:10px"><div class="progress-bar" style="width:' + p.pct + '%"></div></div>' +
            '<div class="gc-miles-head">Milestones <span>' + p.doneMiles + '/' + p.milestones.length + '</span></div>' +
            '<div class="gc-miles">' +
            (p.milestones.length
              ? p.milestones.map(function (m) {
                return '<div class="gc-mile' + (m.done ? ' done-m' : '') + '" data-action="toggle-mile" data-id="' + m.id + '">' +
                  '<span class="gm-check">' + Icons.get('check') + '</span>' +
                  '<span class="gm-txt">' + Utils.escapeHtml(m.title) + '</span>' +
                  (m.done && m.doneDate ? '<span class="gm-date">' + Utils.dateShort(m.doneDate) + '</span>' : '') +
                  '</div>';
              }).join('')
              : '<div class="empty" style="padding:14px"><div class="empty-sub">No milestones yet — add some when you edit this goal.</div></div>') +
            '</div>' +
            '<div class="gc-foot">' +
            '<span class="gc-tasks">' + Icons.get('tasks') + ' ' + p.relatedDone + '/' + p.related.length + ' linked tasks done</span>' +
            '<div class="gc-actions">' +
            '<button class="btn btn-sm" data-action="edit-goal" data-id="' + g.id + '">' + Icons.get('edit') + ' Edit</button>' +
            '<button class="btn btn-sm btn-danger" data-action="delete-goal" data-id="' + g.id + '">' + Icons.get('trash') + '</button>' +
            '</div></div></div>';
        }).join('') + '</div>'
        : '<div class="empty glass" style="padding:60px"><div class="empty-ic">' + Icons.get('goals') + '</div><div class="empty-title">Set a goal, build a plan</div><div class="empty-sub">Goals turn ambition into milestones. Create your first one.</div><button class="btn btn-accent empty-btn" data-action="add-goal">Create your first goal</button></div>');
  }

  const actions = {
    'add-goal': function () { UI.goalModal(null); },
    'edit-goal': function (e, el) {
      const g = State.data.goals.find(function (x) { return x.id === el.dataset.id; });
      if (g) UI.goalModal(g);
    },
    'delete-goal': async function (e, el) {
      const g = State.data.goals.find(function (x) { return x.id === el.dataset.id; });
      if (!g) return;
      const ok = await UI.confirm({
        title: 'Delete goal?',
        message: 'This removes <b>' + Utils.escapeHtml(g.title) + '</b> and all of its milestones. This cannot be undone.',
        danger: true, okText: 'Delete'
      });
      if (!ok) return;
      await State.remove('goals', g.id);
      const miles = State.data.milestones.filter(function (m) { return m.goalId === g.id; });
      for (const m of miles) await State.remove('milestones', m.id);
      UI.toast('Goal deleted', 'info', 'trash');
    },
    'toggle-mile': async function (e, el) {
      const m = State.data.milestones.find(function (x) { return x.id === el.dataset.id; });
      if (!m) return;
      const next = !m.done;
      await State.update('milestones', Object.assign({}, m, { done: next, doneDate: next ? Utils.todayStr() : null }));
      UI.toast(next ? 'Milestone completed' : 'Milestone reopened', next ? 'success' : 'info', next ? 'check' : 'repeat');
    }
  };

  return { render: render, actions: actions };
})();