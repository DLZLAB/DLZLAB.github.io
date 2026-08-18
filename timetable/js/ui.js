const UI = (function () {
  let modalCount = 0;
  const modalRoot = document.getElementById('modalRoot');
  const toastRoot = document.getElementById('toastRoot');

  function on(root, event, selector, fn) {
    root.addEventListener(event, function (e) {
      const el = e.target.closest(selector);
      if (el && root.contains(el)) fn(e, el);
    });
  }

  function closeModals() {
    modalRoot.innerHTML = '';
    modalCount = 0;
    document.body.style.overflow = '';
  }
  function escHandler(e) {
    if (e.key === 'Escape') {
      closeModals();
      const s = document.getElementById('sheetRoot');
      if (s) s.innerHTML = '';
      const f = document.getElementById('fabMenu');
      if (f && !f.hidden) { f.hidden = true; document.getElementById('fab').classList.remove('open'); }
    }
  }
  document.addEventListener('keydown', escHandler);

  function modal(opts) {
    const o = opts || {};
    const size = o.size === 'wide' ? 'wide' : (o.size === 'narrow' ? 'narrow' : '');
    const close = function () {
      if (o.onClose) o.onClose();
      closeModals();
    };
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML =
      '<div class="modal ' + size + '" role="dialog" aria-modal="true">' +
      '<button class="icon-btn modal-close" data-mclose>' + Icons.get('x') + '</button>' +
      '<div class="modal-head"><h3>' + (o.title || '') + '</h3></div>' +
      '<div class="modal-body">' + (o.body || '') + '</div>' +
      (o.footer || '') +
      '</div>';
    overlay.addEventListener('mousedown', function (e) {
      if (e.target === overlay) close();
    });
    modalRoot.appendChild(overlay);
    modalCount++;
    document.body.style.overflow = 'hidden';
    overlay.querySelector('[data-mclose]').addEventListener('click', close);
    if (o.onMount) o.onMount(overlay, close);
    const input = overlay.querySelector('input:not([type=hidden]),textarea,select');
    if (input) setTimeout(function () { input.focus(); }, 60);
    return { el: overlay, close: close };
  }

  function confirm(opts) {
    return new Promise(function (resolve) {
      const m = modal({
        size: 'narrow',
        title: opts.title || 'Are you sure?',
        body: '<p style="font-size:13.5px;color:var(--text-secondary);line-height:1.55">' + (opts.message || '') + '</p>',
        footer: '<div class="modal-foot">' +
          '<button class="btn" data-c-no>Cancel</button>' +
          '<button class="btn ' + (opts.danger ? 'btn-danger' : 'btn-accent') + '" data-c-yes>' + (opts.okText || 'Confirm') + '</button></div>'
      });
      m.el.querySelector('[data-c-no]').addEventListener('click', function () { m.close(); resolve(false); });
      m.el.querySelector('[data-c-yes]').addEventListener('click', function () { m.close(); resolve(true); });
    });
  }

  function toast(msg, type, iconName) {
    const t = document.createElement('div');
    t.className = 'toast t-' + (type || 'info');
    t.innerHTML =
      '<div class="toast-ic">' + Icons.get(iconName || (type === 'success' ? 'check' : type === 'error' ? 'alert' : 'bell')) + '</div>' +
      '<div class="toast-body">' + msg + '</div>' +
      '<button class="toast-close">' + Icons.get('x') + '</button>';
    toastRoot.appendChild(t);
    let gone = false;
    const kill = function () {
      if (gone) return; gone = true;
      t.classList.add('out');
      setTimeout(function () { t.remove(); }, 260);
    };
    t.querySelector('.toast-close').addEventListener('click', kill);
    setTimeout(kill, 4200);
    return t;
  }

  function sheet(bodyHtml, opts) {
    const o = opts || {};
    const root = document.getElementById('sheetRoot');
    const overlay = document.createElement('div');
    overlay.className = 'sheet-overlay';
    overlay.innerHTML =
      '<div class="sheet">' +
      '<div class="sheet-grab"></div>' +
      (o.title ? '<div class="sheet-title">' + o.title + '</div>' : '') +
      bodyHtml + '</div>';
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) overlay.remove(); });
    root.appendChild(overlay);
    return overlay;
  }

  function badgePriority(p) {
    const label = { low: 'Low', medium: 'Medium', high: 'High', urgent: 'Urgent' }[p] || 'Medium';
    return '<span class="badge pr-' + (p || 'medium') + '"><span class="priority-dot"></span>' + label + '</span>';
  }
  function badgeStatus(s) {
    const map = { todo: ['p-todo', 'Todo'], 'in-progress': ['p-progress', 'In Progress'], done: ['p-done', 'Done'] };
    const m = map[s] || map.todo;
    return '<span class="badge ' + m[0] + '">' + m[1] + '</span>';
  }
  function chipCategory(name) {
    return '<span class="chip" style="--cat-c:' + State.COLOR_HEX[State.colorOf(name)] + ';color:var(--cat-c);border-color:transparent;background:color-mix(in srgb,var(--cat-c) 14%,transparent)">' + Utils.escapeHtml(name || 'General') + '</span>';
  }
  function chipTime(min, fmt) {
    return min == null ? '' : '<span class="chip">' + Icons.get('clock') + Utils.minToTime(min, fmt) + '</span>';
  }
  function ring(pct, opts) {
    const o = opts || {};
    const R = 88;
    const C = 2 * Math.PI * R;
    const p = pct == null ? 0 : Math.min(100, Math.max(0, pct));
    return {
      html:
        '<div class="ring-wrap" style="width:' + (o.width || 'min(250px,62%)') + '">' +
        '<svg viewBox="0 0 220 220" class="ring" aria-hidden="true">' +
        '<defs>' +
        '<linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--accent-2)"/></linearGradient>' +
        '<filter id="rglow" x="-40%" y="-40%" width="180%" height="180%">' +
        '<feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
        '</defs>' +
        '<circle cx="110" cy="110" r="' + R + '" class="ring-track"/>' +
        '<circle cx="110" cy="110" r="' + R + '" class="ring-fg" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '" filter="url(#rglow)"/>' +
        '</svg>' +
        '<div class="ring-center"><div class="ring-num">' + (pct == null ? '—' : p + '%') + '</div>' +
        '<div class="ring-label">' + (o.label || 'Today&rsquo;s Productivity') + '</div></div>' +
        (o.badge ? o.badge : '') +
        '</div>'
      ,
      mount: function (el) {
        const fg = el.querySelector('.ring-fg');
        if (fg) setTimeout(function () { fg.style.strokeDashoffset = String(C * (1 - p / 100)); }, 60);
      }
    };
  }

  function segHtml(id, options, selected, accent) {
    return '<div class="seg" id="' + id + '">' + options.map(function (o) {
      return '<button type="button" data-val="' + o.val + '" class="' + (o.val === selected ? 'on' + (accent ? ' accent-seg' : '') : '') + '">' + o.label + '</button>';
    }).join('') + '</div>';
  }

  function weekChipsHtml(id, selected) {
    const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return '<div class="seg" id="' + id + '">' + labels.map(function (l, i) {
      return '<button type="button" data-val="' + i + '" class="' + (selected.indexOf(i) >= 0 ? 'on' : '') + '">' + l + '</button>';
    }).join('') + '</div>';
  }

  function categoryOptions(selected) {
    const cats = State.data.categories;
    const html = cats.map(function (c) {
      return '<option value="' + Utils.escapeHtml(c.name) + '"' + (c.name === selected ? ' selected' : '') + '>' + Utils.escapeHtml(c.name) + '</option>';
    }).join('');
    return html + (cats.length ? '' : '<option value="General">General</option>');
  }

  function statusOptions(selected) {
    return ['todo', 'in-progress', 'done'].map(function (s) {
      return '<option value="' + s + '"' + (s === selected ? ' selected' : '') + '>' + (s === 'in-progress' ? 'In Progress' : s[0].toUpperCase() + s.slice(1)) + '</option>';
    }).join('');
  }

  function priorityOptions(selected) {
    return ['low', 'medium', 'high', 'urgent'].map(function (p) {
      return '<option value="' + p + '"' + (p === selected ? ' selected' : '') + '>' + p[0].toUpperCase() + p.slice(1) + '</option>';
    }).join('');
  }

  function reminderOptions(selected) {
    const opts = [[0, 'No reminder'], [5, '5 minutes before'], [15, '15 minutes before'], [30, '30 minutes before'], [60, '1 hour before'], [120, '2 hours before'], [1440, '1 day before']];
    return opts.map(function (o) {
      return '<option value="' + o[0] + '"' + (o[0] === (selected || 0) ? ' selected' : '') + '>' + o[1] + '</option>';
    }).join('');
  }

  function recurringOptions(selected) {
    const opts = [['none', 'Does not repeat'], ['daily', 'Every day'], ['weekdays', 'Every weekday'], ['weekly', 'Every week'], ['monthly', 'Every month'], ['custom', 'Custom days']];
    return opts.map(function (o) {
      return '<option value="' + o[0] + '"' + (o[0] === (selected || 'none') ? ' selected' : '') + '>' + o[1] + '</option>';
    }).join('');
  }

  function scheduleNotification(task) {
    if (!task.timeStart || task.timeStart == null || !task.reminder) return;
    if (task.status === 'done') return;
    const d = Utils.fromStr(task.date);
    d.setHours(0, task.timeStart, 0, 0);
    const at = d.getTime() - task.reminder * 60000;
    if (at <= Date.now()) return;
    State.data.notifications.forEach(function (n) {
      if (n.taskId === task.id) {
        DB.del('notifications', n.id).then(function () {
          State.data.notifications = State.data.notifications.filter(function (x) { return x.id !== n.id; });
        });
      }
    });
    const rec = {
      id: Utils.uid(), taskId: task.id, title: task.title,
      at: new Date(at).toISOString(), fired: false
    };
    DB.put('notifications', rec).then(function () {
      State.data.notifications.push(rec);
    });
  }
  function clearNotificationsFor(taskId) {
    const doomed = State.data.notifications.filter(function (n) { return n.taskId === taskId; });
    doomed.forEach(function (n) { DB.del('notifications', n.id); });
    State.data.notifications = State.data.notifications.filter(function (n) { return n.taskId !== taskId; });
  }

  function taskModal(task, prefill) {
    const t = task || {};
    const isInstance = !!t.templateId;
    const recType = (t.recurring && t.recurring.type) || 'none';
    const isRec = recType !== 'none';
    const selectedWeekdays = (t.recurring && t.recurring.weekdays) || [];
    const today = Utils.todayStr();
    const body =
      '<form id="taskForm" novalidate>' +
      '<label class="field"><span>Title</span><input class="input" id="fTitle" required placeholder="What needs to be done?" value="' + Utils.escapeHtml(t.title || (prefill && prefill.title ? prefill.title : '')) + '"></label>' +
      '<label class="field"><span>Description</span><textarea class="input" id="fDesc" rows="2" placeholder="Optional details">' + Utils.escapeHtml(t.description || '') + '</textarea></label>' +
      '<div class="field-row">' +
      '<label class="field"><span>Date</span><input type="date" class="input" id="fDate" required value="' + (t.date || (prefill && prefill.date) || today) + '"></label>' +
      '<label class="field"><span>Category</span><select class="select" id="fCat">' + categoryOptions(t.category || (prefill && prefill.category) || '') + '</select></label>' +
      '</div>' +
      '<div class="field-row-3">' +
      '<label class="field"><span>Start</span><input type="time" class="input" id="fStart" value="' + (t.timeStart != null ? Utils.minToTime(t.timeStart, 24) : (prefill && prefill.start != null ? Utils.minToTime(prefill.start, 24) : '09:00')) + '"></label>' +
      '<label class="field"><span>End</span><input type="time" class="input" id="fEnd" value="' + (t.timeEnd != null ? Utils.minToTime(t.timeEnd, 24) : (prefill && prefill.start != null ? Utils.minToTime(prefill.start + 60, 24) : '10:00')) + '"></label>' +
      '<label class="field"><span>Status</span><select class="select" id="fStatus">' + statusOptions(t.status || 'todo') + '</select></label>' +
      '</div>' +
      '<div class="field-row">' +
      '<label class="field"><span>Priority</span><select class="select" id="fPriority">' + priorityOptions(t.priority || 'medium') + '</select></label>' +
      '<label class="field"><span>Reminder</span><select class="select" id="fReminder">' + reminderOptions(t.reminder) + '</select></label>' +
      '</div>' +
      (isInstance ? '' :
        '<label class="field"><span>Repeat</span><select class="select" id="fRec">' + recurringOptions(recType) + '</select></label>' +
        '<div class="field-row ' + (isRec ? '' : 'hidden') + '" id="recExtra">' +
        '<label class="field"><span>Every</span><input type="number" class="input" id="fRecInt" min="1" max="60" value="' + (t.recurring && t.recurring.interval ? t.recurring.interval : 1) + '"></label>' +
        '<label class="field"><span>Repeat on</span>' + weekChipsHtml('fRecDays', recType === 'custom' ? selectedWeekdays : []) + '</label>' +
        '</div>') +
      '<label class="field"><span>Link to Goal</span><select class="select" id="fGoal"><option value="">— None —</option>' +
      State.data.goals.map(function (g) { return '<option value="' + g.id + '"' + (t.goalId === g.id ? ' selected' : '') + '>' + Utils.escapeHtml(g.title) + '</option>'; }).join('') +
      '</select></label>' +
      '<div id="taskFormMsg"></div>' +
      '</form>';
    const m = modal({
      title: t.id ? 'Edit Task' : 'New Task',
      body: body,
      footer: '<div class="modal-foot"><button class="btn" data-mclose>Cancel</button><button class="btn btn-accent" data-save>' + (t.id ? 'Save Changes' : 'Create Task') + '</button></div>'
    });
    m.el.querySelectorAll('[data-mclose]').forEach(function (b) { b.addEventListener('click', m.close); });
    const recSelect = m.el.querySelector('#fRec');
    if (recSelect) {
      const extra = m.el.querySelector('#recExtra');
      recSelect.addEventListener('change', function () {
        const v = recSelect.value;
        extra.classList.toggle('hidden', v === 'none');
        m.el.querySelector('#fRecInt').type = (v === 'daily' || v === 'weekly' || v === 'monthly') ? 'number' : 'number';
        const daysWrap = m.el.querySelector('#fRecDays');
        if (daysWrap) daysWrap.closest('.field').style.display = (v === 'custom') ? '' : 'none';
      });
      recSelect.dispatchEvent(new Event('change'));
    }
    m.el.querySelector('[data-save]').addEventListener('click', async function () {
      const title = m.el.querySelector('#fTitle').value.trim();
      const date = m.el.querySelector('#fDate').value;
      if (!title) { m.el.querySelector('#fTitle').focus(); return; }
      if (!date) { m.el.querySelector('#fDate').focus(); return; }
      const start = Utils.timeToMin(m.el.querySelector('#fStart').value);
      const end = Utils.timeToMin(m.el.querySelector('#fEnd').value);
      let rec = null;
      if (!isInstance && recSelect) {
        const rtype = recSelect.value;
        if (rtype !== 'none') {
          const interval = Math.max(1, parseInt(m.el.querySelector('#fRecInt').value, 10) || 1);
          const weekdays = [];
          if (rtype === 'custom') {
            m.el.querySelectorAll('#fRecDays button.on').forEach(function (b) { weekdays.push(parseInt(b.dataset.val, 10)); });
          }
          rec = { type: rtype, interval: interval, enabled: true, weekdays: weekdays };
        }
      }
      const item = {
        id: t.id || Utils.uid(),
        title: title,
        description: m.el.querySelector('#fDesc').value.trim(),
        date: date,
        timeStart: start,
        timeEnd: end,
        priority: m.el.querySelector('#fPriority').value,
        category: m.el.querySelector('#fCat').value || 'General',
        status: m.el.querySelector('#fStatus').value,
        reminder: parseInt(m.el.querySelector('#fReminder').value, 10) || 0,
        recurring: rec || { type: 'none', interval: 1, enabled: false },
        goalId: m.el.querySelector('#fGoal').value || null,
        templateId: t.templateId || null,
        createdAt: t.createdAt || Utils.todayStr()
      };
      if (t.id) {
        await State.update('tasks', item);
        clearNotificationsFor(t.id);
        scheduleNotification(item);
        toast('Task updated', 'success', 'edit');
      } else {
        const saved = await State.add('tasks', item);
        scheduleNotification(saved);
        toast('Task created', 'success', 'check');
      }
      if (rec) {
        State.expandRecurring();
        await State.reload();
      }
      State.notify();
      m.close();
      Router.refresh();
    });
  }

  function eventModal(ev, prefill) {
    const e = ev || {};
    const today = Utils.todayStr();
    const colors = ['blue', 'violet', 'cyan', 'green', 'orange', 'pink'];
    const body =
      '<form id="eventForm">' +
      '<label class="field"><span>Title</span><input class="input" id="eTitle" required placeholder="Event name" value="' + Utils.escapeHtml(e.title || '') + '"></label>' +
      '<label class="field"><span>Date</span><input type="date" class="input" id="eDate" required value="' + (e.date || (prefill && prefill.date) || today) + '"></label>' +
      '<div class="field-row">' +
      '<label class="field"><span>Start</span><input type="time" class="input" id="eStart" value="' + (e.timeStart != null ? Utils.minToTime(e.timeStart, 24) : (prefill && prefill.start != null ? Utils.minToTime(prefill.start, 24) : '09:00')) + '"></label>' +
      '<label class="field"><span>End</span><input type="time" class="input" id="eEnd" value="' + (e.timeEnd != null ? Utils.minToTime(e.timeEnd, 24) : (prefill && prefill.start != null ? Utils.minToTime(prefill.start + 60, 24) : '10:00')) + '"></label>' +
      '</div>' +
      '<label class="field"><span>Color</span><div class="swatches" id="eColors">' +
      colors.map(function (c) {
        return '<button type="button" class="swatch" data-c="' + c + '" style="background:' + State.COLOR_HEX[c] + '"></button>';
      }).join('') + '</div></label>' +
      '</form>';
    const m = modal({
      title: e.id ? 'Edit Schedule Event' : 'New Schedule Event',
      body: body,
      footer: '<div class="modal-foot"><button class="btn" data-mclose>Cancel</button><button class="btn btn-accent" data-save>' + (e.id ? 'Save Changes' : 'Add Event') + '</button></div>'
    });
    m.el.querySelectorAll('[data-mclose]').forEach(function (b) { b.addEventListener('click', m.close); });
    const colorSel = e.color || 'blue';
    m.el.querySelectorAll('#eColors .swatch').forEach(function (s) {
      if (s.dataset.c === colorSel) s.classList.add('on');
      s.addEventListener('click', function () {
        m.el.querySelectorAll('#eColors .swatch').forEach(function (x) { x.classList.remove('on'); });
        s.classList.add('on');
      });
    });
    m.el.querySelector('[data-save]').addEventListener('click', async function () {
      const title = m.el.querySelector('#eTitle').value.trim();
      const date = m.el.querySelector('#eDate').value;
      if (!title || !date) return;
      const item = {
        id: e.id || Utils.uid(),
        title: title,
        date: date,
        timeStart: Utils.timeToMin(m.el.querySelector('#eStart').value),
        timeEnd: Utils.timeToMin(m.el.querySelector('#eEnd').value),
        color: m.el.querySelector('#eColors .swatch.on') ? m.el.querySelector('#eColors .swatch.on').dataset.c : 'blue'
      };
      if (e.id) { await State.update('events', item); toast('Event updated', 'success', 'edit'); }
      else { await State.add('events', item); toast('Event added to schedule', 'success', 'check'); }
      m.close();
      Router.refresh();
    });
  }

  function habitModal(habit) {
    const h = habit || {};
    const colors = ['blue', 'violet', 'cyan', 'green', 'orange', 'pink'];
    const body =
      '<form id="habitForm">' +
      '<label class="field"><span>Habit Name</span><input class="input" id="hName" required placeholder="e.g. Read 30 minutes" value="' + Utils.escapeHtml(h.name || '') + '"></label>' +
      '<label class="field"><span>Color</span><div class="swatches" id="hColors">' +
      colors.map(function (c) {
        return '<button type="button" class="swatch" data-c="' + c + '" style="background:' + State.COLOR_HEX[c] + '"></button>';
      }).join('') + '</div></label>' +
      '</form>';
    const m = modal({
      title: h.id ? 'Edit Habit' : 'New Habit',
      body: body,
      footer: '<div class="modal-foot"><button class="btn" data-mclose>Cancel</button><button class="btn btn-accent" data-save>' + (h.id ? 'Save Changes' : 'Create Habit') + '</button></div>'
    });
    m.el.querySelectorAll('[data-mclose]').forEach(function (b) { b.addEventListener('click', m.close); });
    const colorSel = h.color || 'blue';
    m.el.querySelectorAll('#hColors .swatch').forEach(function (s) {
      if (s.dataset.c === colorSel) s.classList.add('on');
      s.addEventListener('click', function () {
        m.el.querySelectorAll('#hColors .swatch').forEach(function (x) { x.classList.remove('on'); });
        s.classList.add('on');
      });
    });
    m.el.querySelector('[data-save]').addEventListener('click', async function () {
      const name = m.el.querySelector('#hName').value.trim();
      if (!name) { m.el.querySelector('#hName').focus(); return; }
      const item = {
        id: h.id || Utils.uid(),
        name: name,
        color: m.el.querySelector('#hColors .swatch.on') ? m.el.querySelector('#hColors .swatch.on').dataset.c : 'blue',
        createdAt: h.createdAt || Utils.todayStr()
      };
      if (h.id) { await State.update('habits', item); toast('Habit updated', 'success', 'edit'); }
      else { await State.add('habits', item); toast('Habit created', 'success', 'check'); }
      m.close();
      Router.refresh();
    });
  }

  function goalModal(goal) {
    const g = goal || {};
    const milestoneTitles = [];
    if (g.id) {
      State.data.milestones.filter(function (x) { return x.goalId === g.id; }).forEach(function (x) {
        if (!x.done) milestoneTitles.push(x.title);
      });
    }
    const colors = ['blue', 'violet', 'cyan', 'green', 'orange', 'pink'];
    const body =
      '<form id="goalForm">' +
      '<label class="field"><span>Goal Title</span><input class="input" id="gTitle" required placeholder="e.g. Learn JavaScript" value="' + Utils.escapeHtml(g.title || '') + '"></label>' +
      '<label class="field"><span>Description</span><textarea class="input" id="gDesc" rows="2">' + Utils.escapeHtml(g.description || '') + '</textarea></label>' +
      '<div class="field-row">' +
      '<label class="field"><span>Deadline</span><input type="date" class="input" id="gDeadline" value="' + (g.deadline || Utils.addDays(Utils.todayStr(), 30)) + '"></label>' +
      '<label class="field"><span>Color</span><div class="swatches" id="gColors">' +
      colors.map(function (c) {
        return '<button type="button" class="swatch" data-c="' + c + '" style="background:' + State.COLOR_HEX[c] + '"></button>';
      }).join('') + '</div></label>' +
      '</div>' +
      '<label class="field"><span>Milestones</span><div class="milestone-list" id="gMiles">' +
      milestoneTitles.map(function (t) {
        return '<div class="milestone-row"><button type="button" class="mr-del" data-del>' + Icons.get('x') + '</button><span class="mr-txt">' + Utils.escapeHtml(t) + '</span></div>';
      }).join('') + '</div>' +
      '<div class="mile-add-row"><input class="input" id="gMileIn" placeholder="Add a milestone and press +"><button type="button" class="btn btn-sm" id="gMileAdd">' + Icons.get('plus') + '</button></div></label>' +
      '</form>';
    const m = modal({
      title: g.id ? 'Edit Goal' : 'New Goal',
      body: body,
      footer: '<div class="modal-foot"><button class="btn" data-mclose>Cancel</button><button class="btn btn-accent" data-save>' + (g.id ? 'Save Changes' : 'Create Goal') + '</button></div>'
    });
    m.el.querySelectorAll('[data-mclose]').forEach(function (b) { b.addEventListener('click', m.close); });
    const colorSel = g.color || 'blue';
    m.el.querySelectorAll('#gColors .swatch').forEach(function (s) {
      if (s.dataset.c === colorSel) s.classList.add('on');
      s.addEventListener('click', function () {
        m.el.querySelectorAll('#gColors .swatch').forEach(function (x) { x.classList.remove('on'); });
        s.classList.add('on');
      });
    });
    function addMileRow() {
      const inp = m.el.querySelector('#gMileIn');
      const val = inp.value.trim();
      if (!val) return;
      const list = m.el.querySelector('#gMiles');
      const row = document.createElement('div');
      row.className = 'milestone-row';
      row.innerHTML = '<button type="button" class="mr-del">' + Icons.get('x') + '</button><span class="mr-txt">' + Utils.escapeHtml(val) + '</span>';
      row.querySelector('.mr-del').addEventListener('click', function () { row.remove(); });
      list.appendChild(row);
      inp.value = '';
      inp.focus();
    }
    m.el.querySelector('#gMileAdd').addEventListener('click', addMileRow);
    m.el.querySelector('#gMileIn').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); addMileRow(); } });
    m.el.querySelectorAll('#gMiles [data-del]').forEach(function (b) {
      b.addEventListener('click', function () { b.closest('.milestone-row').remove(); });
    });
    m.el.querySelector('[data-save]').addEventListener('click', async function () {
      const title = m.el.querySelector('#gTitle').value.trim();
      const deadline = m.el.querySelector('#gDeadline').value;
      if (!title || !deadline) return;
      const item = {
        id: g.id || Utils.uid(),
        title: title,
        description: m.el.querySelector('#gDesc').value.trim(),
        deadline: deadline,
        color: m.el.querySelector('#gColors .swatch.on') ? m.el.querySelector('#gColors .swatch.on').dataset.c : 'blue',
        createdAt: g.createdAt || Utils.todayStr()
      };
      if (g.id) await State.update('goals', item); else await State.add('goals', item);
      m.el.querySelectorAll('#gMiles .milestone-row').forEach(function (row) {
        const mt = row.querySelector('.mr-txt').textContent;
        State.add('milestones', { id: Utils.uid(), goalId: item.id, title: mt, done: false, doneDate: null });
      });
      toast(g.id ? 'Goal updated' : 'Goal created', 'success', 'target');
      m.close();
      Router.refresh();
    });
  }

  function quickAdd(type, prefill) {
    closeModals();
    if (type === 'task') taskModal(null, prefill);
    else if (type === 'habit') habitModal(null);
    else if (type === 'goal') goalModal(null);
    else eventModal(null, prefill);
  }

  function searchModal() {
    const body =
      '<div style="margin-bottom:14px"><div style="position:relative">' + Icons.get('search') +
      '<input class="input" id="searchInput" placeholder="Search tasks, habits, goals, events…" style="padding-left:38px">' +
      '</div><div id="searchMsg" style="margin-top:8px;font-size:12px;color:var(--text-muted)">' +
      '<span class="kbd">N</span> New task &nbsp; <span class="kbd">H</span> New habit &nbsp; <span class="kbd">T</span> Today &nbsp; <span class="kbd">C</span> Calendar &nbsp; <span class="kbd">ESC</span> Close</div></div>' +
      '<div id="searchResults" style="display:flex;flex-direction:column;gap:4px;max-height:52dvh;overflow-y:auto"></div>';
    const m = modal({ title: 'Quick Search', body: body, size: 'wide' });
    const input = m.el.querySelector('#searchInput');
    const results = m.el.querySelector('#searchResults');
    function iconTag(k) { return '<span style="width:30px;height:30px;border-radius:9px;display:grid;place-items:center;flex:none;background:var(--glass-bg);border:1px solid var(--glass-border)">' + Icons.get(k) + '</span>'; }
    function render() {
      const q = input.value.trim().toLowerCase();
      results.innerHTML = '';
      if (!q) {
        results.innerHTML = '<div class="empty" style="padding:30px"><div class="empty-ic">' + Icons.get('search') + '</div><div class="empty-title">Search everything</div><div class="empty-sub">Find any task, habit, goal or scheduled event.</div></div>';
        return;
      }
      const out = [];
      State.data.tasks.forEach(function (t) {
        if ((t.title + ' ' + (t.description || '')).toLowerCase().indexOf(q) >= 0) out.push({ kind: 'task', icon: 'tasks', label: t.title, sub: Utils.gregorianTitle(t.date) + (t.timeStart != null ? ' · ' + Utils.minToTime(t.timeStart, State.getSetting('timeFormat')) : ''), id: t.id });
      });
      State.data.habits.forEach(function (h) {
        if (h.name.toLowerCase().indexOf(q) >= 0) out.push({ kind: 'habit', icon: 'habits', label: h.name, sub: 'Habit', id: h.id });
      });
      State.data.goals.forEach(function (g) {
        if ((g.title + ' ' + (g.description || '')).toLowerCase().indexOf(q) >= 0) out.push({ kind: 'goal', icon: 'goals', label: g.title, sub: 'Deadline ' + Utils.dateLong(g.deadline), id: g.id });
      });
      State.data.events.forEach(function (e) {
        if (e.title.toLowerCase().indexOf(q) >= 0) out.push({ kind: 'event', icon: 'schedule', label: e.title, sub: Utils.gregorianTitle(e.date) + ' · ' + Utils.minToTime(e.timeStart, State.getSetting('timeFormat')), id: e.id });
      });
      if (!out.length) {
        results.innerHTML = '<div class="empty" style="padding:30px"><div class="empty-ic">' + Icons.get('alert') + '</div><div class="empty-title">No results</div><div class="empty-sub">Nothing matches &ldquo;' + Utils.escapeHtml(q) + '&rdquo;.</div></div>';
        return;
      }
      out.slice(0, 14).forEach(function (r) {
        const row = document.createElement('button');
        row.className = 'block-item';
        row.style.cssText = 'width:100%;text-align:left;cursor:pointer';
        row.innerHTML = iconTag(r.icon) +
          '<div class="bi-main"><div class="bi-title">' + Utils.escapeHtml(r.label) + '</div><div class="bi-time">' + Utils.escapeHtml(r.sub) + '</div></div>';
        row.addEventListener('click', function () {
          m.close();
          if (r.kind === 'task') Router.navigate('tasks', { q: r.label });
          else if (r.kind === 'habit') Router.navigate('habits');
          else if (r.kind === 'goal') Router.navigate('goals');
          else Router.navigate('calendar', { date: State.data.events.find(function (e) { return e.id === r.id; }).date });
        });
        results.appendChild(row);
      });
    }
    input.addEventListener('input', Utils.debounce(render, 140));
    setTimeout(function () { input.focus(); }, 80);
  }

  return {
    on: on, modal: modal, confirm: confirm, toast: toast, sheet: sheet, closeModals: closeModals,
    badgePriority: badgePriority, badgeStatus: badgeStatus, chipCategory: chipCategory, chipTime: chipTime,
    ring: ring, segHtml: segHtml, weekChipsHtml: weekChipsHtml,
    taskModal: taskModal, eventModal: eventModal, habitModal: habitModal, goalModal: goalModal,
    quickAdd: quickAdd, searchModal: searchModal, scheduleNotification: scheduleNotification, clearNotificationsFor: clearNotificationsFor
  };
})();