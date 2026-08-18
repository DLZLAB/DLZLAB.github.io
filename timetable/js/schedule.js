window.SchedulePage = (function () {
  let date = Utils.todayStr();
  const ROWH = 52;
  const MIN_BLOCK = 30;

  function buildItems() {
    const items = State.tasksFor(date)
      .filter(function (t) { return t.timeStart != null && t.timeEnd != null && t.timeEnd > t.timeStart; })
      .map(function (t) {
        return { kind: 'task', id: t.id, title: t.title, timeStart: t.timeStart, timeEnd: t.timeEnd, status: t.status, cat: t.category };
      })
      .concat(State.eventsFor(date).map(function (e) {
        return { kind: 'event', id: e.id, title: e.title, timeStart: e.timeStart, timeEnd: e.timeEnd, color: e.color };
      }))
      .sort(function (a, b) { return a.timeStart - b.timeStart; });
    return items;
  }

  function conflictsFor(items) {
    const set = {};
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i], b = items[j];
        if (a.timeStart < b.timeEnd && b.timeStart < a.timeEnd) {
          set[a.kind + ':' + a.id] = true;
          set[b.kind + ':' + b.id] = true;
        }
      }
    }
    return set;
  }

  function render(container) {
    const today = Utils.todayStr();
    const isToday = date === today;
    const fmt = State.getSetting('timeFormat');
    const items = buildItems();
    const conflictIds = conflictsFor(items);
    const conflicts = State.getConflicts(date);
    const totalFocus = items.reduce(function (acc, it) { return acc + (it.timeEnd - it.timeStart); }, 0);

    container.innerHTML =
      '<div class="page-head">' +
      '<div><h2>Daily Schedule</h2><div class="page-head-sub">' + Utils.gregorianTitle(date) + (isToday ? ' · <b style="color:var(--accent)">Today</b>' : '') + '</div></div>' +
      '<div class="page-head-actions">' +
      '<button class="icon-btn" data-action="day-prev">' + Icons.get('chevL') + '</button>' +
      '<button class="btn btn-sm" data-action="day-today" style="min-width:92px;justify-content:center">' + Utils.dateShort(date) + '</button>' +
      '<button class="icon-btn" data-action="day-next">' + Icons.get('chevR') + '</button>' +
      '<button class="btn btn-accent btn-sm" data-action="add-task">' + Icons.get('plus') + ' Task</button>' +
      '<button class="btn btn-sm" data-action="add-event">' + Icons.get('plus') + ' Event</button>' +
      '</div></div>' +

      (conflicts.length ? '<div class="conflict-banner"><span class="cb-ic">' + Icons.get('alert') + '</span>' +
        '<div class="cb-main"><b>Time conflict detected</b><div class="cb-list">' + conflicts.map(function (p) {
          return '<span>&bull; <b>' + Utils.escapeHtml(p[0].title) + '</b> (' + Utils.minToTime(p[0].timeStart, fmt) + '–' + Utils.minToTime(p[0].timeEnd, fmt) + ') overlaps with <b>' + Utils.escapeHtml(p[1].title) + '</b> (' + Utils.minToTime(p[1].timeStart, fmt) + '–' + Utils.minToTime(p[1].timeEnd, fmt) + ')</span>';
        }).join('') + '</div></div></div>' : '') +

      '<div class="tl-stage" id="tlStage" style="--tl-h:' + ROWH + 'px">' +
      Array.from({ length: 24 }, function (_, h) {
        return '<div class="tl-hour" style="top:' + (h * ROWH) + 'px"><span class="tl-label">' + Utils.minToTime(h * 60, fmt) + '</span></div>';
      }).join('') +
      items.map(function (it) {
        const top = (it.timeStart / 60) * ROWH;
        const h = Math.max(MIN_BLOCK, ((it.timeEnd - it.timeStart) / 60) * ROWH);
        return '<div class="tl-block type-' + it.kind + (conflictIds[it.kind + ':' + it.id] ? ' conflict' : '') + '"' +
          ' data-kind="' + it.kind + '" data-id="' + it.id + '"' +
          ' style="top:' + top + 'px;height:' + h + 'px">' +
          '<span class="tlb-title">' + Utils.escapeHtml(it.title) + (it.kind === 'task' && it.status === 'done' ? ' ✓' : '') + '</span>' +
          '<span class="tlb-time">' + Utils.minToTime(it.timeStart, fmt) + ' – ' + Utils.minToTime(it.timeEnd, fmt) + ' · ' + Utils.fmtDur(it.timeEnd - it.timeStart) + '</span>' +
          (h >= 56 ? '<span class="tlb-cats">' +
            (it.kind === 'task'
              ? '<span class="tlb-tag">' + Utils.escapeHtml(it.cat || 'Task') + '</span>' + (it.status === 'done' ? '<span class="tlb-tag" style="background:var(--success-soft);color:var(--success)">done</span>' : '')
              : '<span class="tlb-tag">event</span>') +
            '</span>' : '') +
          '<span class="tlb-handle" data-resize></span>' +
          '</div>';
      }).join('') +
      (isToday ? '<div class="tl-now-line" style="top:' + ((Utils.nowMin() / 60) * ROWH) + 'px"></div>' : '') +
      '</div>' +

      '<div class="sch-quick-stats">' +
      '<span>' + Icons.get('schedule') + ' <b>' + items.length + '</b> blocks</span>' +
      '<span>' + Icons.get('timer') + ' <b>' + Utils.fmtDur(totalFocus) + '</b> planned</span>' +
      (conflicts.length ? '<span style="color:var(--danger)">' + Icons.get('alert') + ' <b>' + conflicts.length + '</b> conflict' + (conflicts.length > 1 ? 's' : '') + '</span>' : '') +
      '<span style="margin-left:auto;color:var(--text-muted)">Drag blocks to move · drag the bottom edge to resize · click empty space to add</span>' +
      '</div>';

    bindStage(container, items);
  }

  function bindStage(container, items) {
    const stage = container.querySelector('#tlStage');
    const fmt = State.getSetting('timeFormat');

    stage.querySelectorAll('.tl-block').forEach(function (block) {
      const kind = block.dataset.kind;
      const id = block.dataset.id;
      const item = items.find(function (i) { return i.kind === kind && i.id === id; });
      if (!item) return;

      let mode = null;
      let startY = 0, startTime = 0, startDur = 0;
      let moved = 0;
      let currentStart = item.timeStart, currentEnd = item.timeEnd;
      let preview = null;

      function findOverlap(cs, ce) {
        for (const other of items) {
          if (other.kind === kind && other.id === id) continue;
          if (cs < other.timeEnd && other.timeStart < ce) return other;
        }
        return null;
      }
      function livePreview() {
        const top = (currentStart / 60) * ROWH;
        const h = Math.max(MIN_BLOCK, ((currentEnd - currentStart) / 60) * ROWH);
        block.style.top = top + 'px';
        block.style.height = h + 'px';
        const overlap = findOverlap(currentStart, currentEnd);
        block.classList.toggle('conflict', !!overlap);
        block.querySelector('.tlb-time').textContent =
          Utils.minToTime(currentStart, fmt) + ' – ' + Utils.minToTime(currentEnd, fmt) + ' · ' + Utils.fmtDur(currentEnd - currentStart);
      }

      block.addEventListener('pointerdown', function (e) {
        if (e.button !== 0) return;
        const resizing = !!e.target.closest('[data-resize]');
        mode = resizing ? 'resize' : 'move';
        startY = e.clientY;
        startTime = item.timeStart;
        startDur = item.timeEnd - item.timeStart;
        moved = 0;
        currentStart = item.timeStart;
        currentEnd = item.timeEnd;
        block.classList.add('dragging');
        document.body.style.userSelect = 'none';
        block.setPointerCapture(e.pointerId);
        e.preventDefault();
      });

      block.addEventListener('pointermove', function (e) {
        if (!mode) return;
        const deltaMin = Math.round(((e.clientY - startY) / ROWH) * 60 / 5) * 5;
        moved = Math.max(moved, Math.abs(e.clientY - startY));
        if (mode === 'move') {
          currentStart = Math.round(Utils.clamp(startTime + deltaMin, 0, 1440 - startDur) / 5) * 5;
          currentEnd = currentStart + startDur;
        } else {
          currentEnd = Math.round(Utils.clamp(startTime + startDur + deltaMin, startTime + MIN_BLOCK, 1440) / 5) * 5;
        }
        livePreview();
      });

      function commit(e) {
        if (!mode) return;
        block.releasePointerCapture && block.releasePointerCapture(e.pointerId);
        block.classList.remove('dragging');
        document.body.style.userSelect = '';
        mode = null;
        if (moved < 6) return;
        const patch = { timeStart: currentStart, timeEnd: currentEnd };
        const store = kind === 'task' ? 'tasks' : 'events';
        const real = State.data[store].find(function (x) { return x.id === id; });
        if (!real) return;
        State.update(store, Object.assign({}, real, patch)).then(function () {
          const overlap = findOverlap(currentStart, currentEnd);
          if (overlap) {
            UI.toast('<b>Time conflict:</b> ' + Utils.escapeHtml(item.title) + ' now overlaps with ' + Utils.escapeHtml(overlap.title), 'warn', 'alert');
          } else {
            UI.toast('Rescheduled to ' + Utils.minToTime(currentStart, fmt), 'success', 'schedule');
          }
        });
      }
      block.addEventListener('pointerup', commit);
      block.addEventListener('pointercancel', function () {
        block.classList.remove('dragging');
        document.body.style.userSelect = '';
        mode = null;
      });

      block.addEventListener('click', function (e) {
        if (moved >= 6) { e.stopPropagation(); return; }
        e.stopPropagation();
        if (kind === 'task') {
          const t = State.data.tasks.find(function (x) { return x.id === id; });
          if (t) UI.taskModal(t);
        } else {
          const ev = State.data.events.find(function (x) { return x.id === id; });
          if (ev) UI.eventModal(ev);
        }
      });
    });

    stage.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.tl-block')) return;
      const rect = stage.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const start = Utils.clamp(Math.round((y / ROWH) * 2) * 30, 0, 1410);
      UI.quickAdd('schedule', { date: date, start: start });
    });
  }

  const actions = {
    'day-prev': function () { date = Utils.addDays(date, -1); Router.refresh(); },
    'day-next': function () { date = Utils.addDays(date, 1); Router.refresh(); },
    'day-today': function () { date = Utils.todayStr(); Router.refresh(); },
    'add-task': function () { UI.quickAdd('task', { date: date }); },
    'add-event': function () { UI.quickAdd('schedule', { date: date }); }
  };

  return {
    render: render, actions: actions,
    setDate: function (d) { date = d; },
    get date() { return date; }
  };
})();