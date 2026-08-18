window.StatisticsPage = (function () {
  function barChart(items) {
    const W = 620, H = 210, top = 12, bottom = 40, left = 34, right = 8;
    const n = items.length;
    const slot = (W - left - right) / n;
    const bw = slot * 0.55;
    const maxY = 100;
    const yScale = (H - top - bottom) / maxY;
    let grid = '';
    for (let g = 0; g <= 100; g += 25) {
      const y = top + (maxY - g) * yScale;
      grid += '<line class="grid-h" x1="' + left + '" y1="' + y + '" x2="' + (W - right) + '" y2="' + y + '"/>';
      grid += '<text class="axis-t" x="' + (left - 7) + '" y="' + (y + 3) + '" text-anchor="end">' + g + '</text>';
    }
    let bars = '';
    items.forEach(function (it, i) {
      const x = left + i * slot + (slot - bw) / 2;
      const val = it.pct == null ? 0 : it.pct;
      const h = Math.max(it.pct == null ? 3 : 4, val * yScale);
      const y = top + (maxY - val) * yScale - (it.pct == null ? 3 : 0);
      const fill = it.pct == null
        ? 'var(--glass-bg-strong)'
        : 'url(#barGrad' + (it.today ? 'T' : '') + ')';
      const cls = it.pct == null ? 'empty-rect' : '';
      bars += '<rect class="bar-rect ' + cls + '" x="' + x + '" y="' + y + '" width="' + bw + '" height="' + h + '" rx="5" fill="' + fill + '">' +
        '<title>' + (it.pct == null ? it.label + ': no data' : it.label + ': ' + it.pct + '%') + '</title></rect>';
      const labelY = H - 18;
      bars += '<text class="axis-t" x="' + (x + bw / 2) + '" y="' + labelY + '" text-anchor="middle">' + it.label + '</text>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="bar chart">' +
      '<defs>' +
      '<linearGradient id="barGrad" x1="0" y1="1" x2="0" y2="0">' +
      '<stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--accent-2)"/></linearGradient>' +
      '<linearGradient id="barGradT" x1="0" y1="1" x2="0" y2="0">' +
      '<stop offset="0" stop-color="var(--success)"/><stop offset="1" stop-color="#10b981"/></linearGradient>' +
      '</defs>' + grid + bars + '</svg>';
  }

  function areaChart(items) {
    const W = 620, H = 220, top = 14, bottom = 40, left = 34, right = 8;
    const n = items.length;
    const slot = (W - left - right) / (n - 1 || 1);
    const maxY = 100;
    const yScale = (H - top - bottom) / maxY;
    let grid = '';
    for (let g = 0; g <= 100; g += 25) {
      const y = top + (maxY - g) * yScale;
      grid += '<line class="grid-h" x1="' + left + '" y1="' + y + '" x2="' + (W - right) + '" y2="' + y + '"/>';
    }
    let path = '', area = '';
    items.forEach(function (it, i) {
      const x = left + i * slot;
      const val = it.pct == null ? 0 : it.pct;
      const y = top + (maxY - val) * yScale;
      path += (i === 0 ? 'M' : 'L') + x + ' ' + y + ' ';
      area += (i === 0 ? 'M' : 'L') + x + ' ' + y + ' ';
    });
    const lastX = left + (n - 1) * slot;
    area += 'L' + lastX + ' ' + (H - bottom) + ' L' + left + ' ' + (H - bottom) + ' Z';
    const labelEvery = Math.ceil(n / 6);
    let labels = '';
    items.forEach(function (it, i) {
      if (i % labelEvery !== 0) return;
      const x = left + i * slot;
      labels += '<text class="axis-t" x="' + x + '" y="' + (H - 16) + '" text-anchor="middle">' + it.label + '</text>';
    });
    let dots = '';
    items.forEach(function (it, i) {
      if (it.pct == null) return;
      const x = left + i * slot;
      const y = top + (maxY - it.pct) * yScale;
      dots += '<circle cx="' + x + '" cy="' + y + '" r="3.4" fill="var(--accent)"><title>' + it.label + ': ' + it.pct + '%</title></circle>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '">' +
      '<defs>' +
      '<linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--accent-2)"/></linearGradient>' +
      '<linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient>' +
      '</defs>' + grid + '<path class="fill-area" d="' + area + '"/><path class="line-path" d="' + path + '"/>' + dots + labels + '</svg>';
  }

  function donut(done, total, pct) {
    const R = 72, C = 2 * Math.PI * R;
    const p = total ? done / total : 0;
    const dash = C * p;
    const gap = Math.min(8, dash * 0.06);
    return '<svg viewBox="0 0 200 200">' +
      '<circle class="donut-track" cx="100" cy="100" r="' + R + '"/>' +
      (p > 0 ? '<circle class="donut-seg ds-green" cx="100" cy="100" r="' + R + '" stroke="url(#donutGrad)" stroke-dasharray="' + Math.max(dash - gap, 0.5) + ' ' + C + '" transform="rotate(-90 100 100)"/>' : '') +
      (p < 1 ? '<circle class="donut-seg" cx="100" cy="100" r="' + R + '" stroke="var(--warning)" stroke-dasharray="' + Math.max(C - dash - gap, 0.5) + ' ' + C + '" stroke-dashoffset="' + (-dash) + '" transform="rotate(-90 100 100)"/>' : '') +
      '<g class="donut-center"><text x="100" y="96" text-anchor="middle" font-size="30">' + (pct == null ? '—' : pct + '%') + '</text>' +
      '<text class="dc-label" x="100" y="118" text-anchor="middle">' + done + ' of ' + total + ' done</text></g>' +
      '<defs><linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--success)"/><stop offset="1" stop-color="#10b981"/></linearGradient></defs>' +
      '</svg>';
  }

  function heatmap() {
    const today = Utils.todayStr();
    const WEEKS = 26;
    const CELL = 13, GAP = 3;
    const start = Utils.addDays(today, -(WEEKS * 7 - 1));
    const ws = 0;
    const startDow = Utils.weekday(start);
    const offset = (startDow - ws + 7) % 7;
    const gridStart = Utils.addDays(start, -offset);
    let html = '<svg viewBox="0 0 ' + (WEEKS * (CELL + GAP) + 36) + ' 112" style="min-width:660px">';
    let prevMonth = null;
    const stats = { active: 0, total: 0, excellent: 0 };
    for (let w = 0; w < WEEKS; w++) {
      for (let d = 0; d < 7; d++) {
        const dateStr = Utils.addDays(gridStart, w * 7 + d);
        const inRange = dateStr >= start && dateStr <= today;
        const pct = inRange ? State.dayStats(dateStr).pct : null;
        const level = pct == null ? 0 : pct < 25 ? 1 : pct < 50 ? 2 : pct < 75 ? 3 : 4;
        if (inRange && pct != null) { stats.active++; stats.total += pct; if (level === 4) stats.excellent++; }
        const x = w * (CELL + GAP);
        const y = d * (CELL + GAP);
        html += '<rect class="hm-rect" x="' + x + '" y="' + y + '" width="' + CELL + '" height="' + CELL + '" rx="3.5" fill="var(--hm-l' + level + ',var(--glass-bg-strong))">' +
          '<title>' + Utils.monthDayYear(dateStr) + ': ' + (pct == null ? 'no activity' : pct + '% productivity') + '</title></rect>';
      }
      const monthCell = Utils.fromStr(Utils.addDays(gridStart, w * 7));
      const m = monthCell.getMonth();
      if (m !== prevMonth) {
        html += '<text class="axis-t" x="' + (w * (CELL + GAP)) + '" y="104">' + Utils.MONTHS_SHORT[m] + '</text>';
        prevMonth = m;
      }
    }
    html += '</svg>';
    const avg = stats.active ? Math.round(stats.total / stats.active) : null;
    return {
      html: html,
      stats: {
        activeDays: stats.active,
        avg: avg,
        excellent: stats.excellent,
        best: State.bestDayInRange(start, today)
      }
    };
  }

  function monthOverview() {
    const d = new Date();
    const y = d.getFullYear(), m = d.getMonth() + 1;
    const from = y + '-' + String(m).padStart(2, '0') + '-01';
    const today = Utils.todayStr();
    const to = today;
    const tasks = State.data.tasks.filter(function (t) { return t.date >= from && t.date <= to; });
    const done = tasks.filter(function (t) { return t.status === 'done'; });
    const habits = State.data.habits.length;
    const daysElapsed = Utils.diffDays(from, to) + 1;
    const doneLogs = State.data.habitLogs.filter(function (l) { return l.date >= from && l.date <= to && l.status === 'done'; }).length;
    let focus = 0;
    State.data.tasks.forEach(function (t) {
      if (t.status === 'done' && t.date >= from && t.date <= to && t.timeStart != null && t.timeEnd != null) focus += t.timeEnd - t.timeStart;
    });
    State.data.events.forEach(function (e) {
      if (e.date >= from && e.date <= to && e.timeStart != null && e.timeEnd != null) focus += e.timeEnd - e.timeStart;
    });
    let pctSum = 0, pctDays = 0;
    for (let x = from; x <= to; x = Utils.addDays(x, 1)) {
      const p = State.dayStats(x).pct;
      if (p != null) { pctSum += p; pctDays++; }
    }
    const habitPossible = habits * daysElapsed;
    return {
      tasks: tasks, done: done, rate: tasks.length ? Math.round((done.length / tasks.length) * 100) : null,
      habits: habits, habitRate: habitPossible ? Math.round((doneLogs / habitPossible) * 100) : null,
      focus: focus, avgProd: pctDays ? Math.round(pctSum / pctDays) : null,
      best: State.bestDayInRange(from, to), streak: State.bestCurrentStreak(),
      from: from, to: to
    };
  }

  function render(container) {
    const today = Utils.todayStr();
    const ov = monthOverview();
    const d = new Date();
    const monthStart = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-01';

    const bars14 = [];
    for (let i = 13; i >= 0; i--) {
      const dd = Utils.addDays(today, -i);
      bars14.push({ label: Utils.WEEK_SHORT[Utils.weekday(dd)][0], pct: State.dayStats(dd).pct, today: dd === today });
    }
    const weeks12 = [];
    for (let i = 11; i >= 0; i--) {
      const wEnd = Utils.addDays(today, -(i * 7));
      const wStart = Utils.addDays(wEnd, -6);
      let sum = 0, n = 0;
      for (let x = wStart; x <= wEnd; x = Utils.addDays(x, 1)) {
        const p = State.dayStats(x).pct;
        if (p != null) { sum += p; n++; }
      }
      weeks12.push({ label: 'W-' + (i + 1), pct: n ? Math.round(sum / n) : null });
    }
    const monthTasks = State.data.tasks.filter(function (t) { return Utils.monthStrOf(t.date) === Utils.monthStrOf(today); });
    const monthDone = monthTasks.filter(function (t) { return t.status === 'done'; });
    const donutPct = monthTasks.length ? Math.round((monthDone.length / monthTasks.length) * 100) : null;
    const hm = heatmap();

    const scoreDaily = State.scoreOn(today);
    const ws = State.getSetting('weekStart');
    const weekStart = Utils.startOfWeek(today, ws);
    const scoreWeekly = State.scoreRange(Utils.addDays(weekStart, -6), today);
    const scoreMonthly = State.scoreRange(monthStart, today);

    const habitRates = State.data.habits.map(function (h) {
      const s = State.habitStats(h.id, today);
      return { name: h.name, rate: s.rate, color: State.COLOR_HEX[h.color] };
    }).sort(function (a, b) { return b.rate - a.rate; });

    const mini = [
      { ic: 'tasks', cls: 'c1', label: 'Total Tasks', value: ov.tasks.length },
      { ic: 'check', cls: 'c3', label: 'Completed', value: ov.done.length },
      { ic: 'zap', cls: 'c2', label: 'Completion Rate', value: ov.rate == null ? '—' : ov.rate + '%' },
      { ic: 'habits', cls: 'c2', label: 'Habits Done', value: ov.habitRate == null ? '—' : ov.habitRate + '%' },
      { ic: 'timer', cls: 'c4', label: 'Focus Time', value: Utils.fmtDur(ov.focus) },
      { ic: 'statistics', cls: 'c1', label: 'Avg Daily Productivity', value: ov.avgProd == null ? '—' : ov.avgProd + '%' },
      { ic: 'trophy', cls: 'c3', label: 'Best Day', value: ov.best ? Utils.dateShort(ov.best.date) + ' · ' + ov.best.pct + '%' : '—' },
      { ic: 'flame', cls: 'c4', label: 'Current Streak', value: ov.streak.days + 'd' }
    ];

    container.innerHTML =
      '<div class="page-head">' +
      '<div><h2>Statistics</h2><div class="page-head-sub">' + Utils.monthYearStr(d.getFullYear(), d.getMonth() + 1) + ' · computed live from your data</div></div>' +
      '<div class="page-head-actions"><button class="btn btn-sm" data-action="goto-stats-cal">' + Icons.get('calendar') + ' Calendar</button></div>' +
      '</div>' +

      '<div class="section-title stats-head" style="margin-top:0"><span class="st-ic">' + Icons.get('statistics') + '</span>Monthly Overview</div>' +
      '<div class="stats-cards">' + mini.map(function (m) {
        return '<div class="glass stat-mini"><span class="sm-ic ' + m.cls + '">' + Icons.get(m.ic) + '</span>' +
          '<div class="sm-main"><div class="sm-label">' + m.label + '</div><div class="sm-value tnum">' + m.value + '</div></div></div>';
      }).join('') + '</div>' +

      '<div class="charts-row">' +
      '<div class="glass stat-card"><div class="sc-head"><span class="sc-title">' + Icons.get('zap') + ' Daily Productivity</span><span class="sc-legend"><span><span class="sl-dot" style="background:var(--accent)"></span>Last 14 days</span></span></div>' +
      '<div class="sc-chart">' + barChart(bars14) + '</div></div>' +

      '<div class="glass stat-card"><div class="sc-head"><span class="sc-title">' + Icons.get('tasks') + ' Task Completion</span><span class="sc-legend"><span><span class="sl-dot" style="background:var(--success)"></span>Done</span><span><span class="sl-dot" style="background:var(--warning)"></span>Remaining</span></span></div>' +
      '<div class="sc-chart" style="height:200px;display:grid;place-items:center">' + donut(monthDone.length, monthTasks.length, donutPct) + '</div></div>' +

      '<div class="glass stat-card full"><div class="sc-head"><span class="sc-title">' + Icons.get('statistics') + ' Weekly Productivity Trend</span><span class="sc-legend"><span><span class="sl-dot" style="background:var(--accent)"></span>Last 12 weeks</span></span></div>' +
      '<div class="sc-chart">' + areaChart(weeks12) + '</div></div>' +

      (habitRates.length
        ? '<div class="glass stat-card full"><div class="sc-head"><span class="sc-title">' + Icons.get('habits') + ' Habit Completion Rate</span></div>' +
          '<div style="display:flex;flex-direction:column">' + habitRates.map(function (h) {
            return '<div class="habit-rate-row"><span class="hrr-name">' + Utils.escapeHtml(h.name) + '</span>' +
              '<div class="hrr-bar"><div class="hrr-fill" style="width:' + h.rate + '%"></div></div>' +
              '<span class="hrr-pct tnum">' + h.rate + '%</span></div>';
          }).join('') + '</div></div>'
        : '') +
      '</div>' +

      '<div class="section-title stats-head"><span class="st-ic">' + Icons.get('calendar') + '</span>Productivity Heatmap</div>' +
      '<div class="glass heatmap"><div class="hm-head">' +
      '<div class="hm-stats">' +
      '<span>Active days <b>' + hm.stats.activeDays + '</b></span>' +
      '<span>Avg productivity <b>' + (hm.stats.avg == null ? '—' : hm.stats.avg + '%') + '</b></span>' +
      '<span>Excellent days <b>' + hm.stats.excellent + '</b></span>' +
      (hm.stats.best ? '<span>Best day <b>' + Utils.dateShort(hm.stats.best.date) + ' (' + hm.stats.best.pct + '%)</b></span>' : '') +
      '</div>' +
      '<div class="heat-scale"><span>Less</span><span class="hs-cell" style="background:var(--hm-l1)"></span><span class="hs-cell" style="background:var(--hm-l2)"></span><span class="hs-cell" style="background:var(--hm-l3)"></span><span class="hs-cell" style="background:var(--hm-l4)"></span><span>More</span></div>' +
      '</div>' + hm.html + '</div>' +

      '<div class="section-title stats-head"><span class="st-ic">' + Icons.get('zap') + '</span>Smart Productivity Score</div>' +
      '<div class="score-cards">' +
      scoreCard('Daily Score', scoreDaily.points, scoreDaily, 'Today · tasks +10, habits +5, milestones +20, missed −5/−2') +
      scoreCard('Weekly Score', scoreWeekly.points, scoreWeekly, 'Last 7 days') +
      scoreCard('Monthly Score', scoreMonthly.points, scoreMonthly, Utils.monthYearStr(d.getFullYear(), d.getMonth() + 1)) +
      '</div>';

    const existing = document.getElementById('hmColors');
    if (existing) existing.remove();
    const style = document.createElement('style');
    style.id = 'hmColors';
    style.textContent =
      ':root{--hm-l0:var(--glass-bg-strong);--hm-l1:color-mix(in srgb,var(--accent) 22%,transparent);--hm-l2:color-mix(in srgb,var(--accent) 45%,transparent);--hm-l3:color-mix(in srgb,var(--accent) 72%,transparent);--hm-l4:linear-gradient(135deg,var(--success),#10b981);}';
    document.head.appendChild(style);
  }

  function scoreCard(label, points, breakdown, sub) {
    return '<div class="glass score-card"><div class="sc-value tnum">' + points + '</div><div class="sc-label">' + label + '</div>' +
      '<div class="sc-sub">' + sub + '</div>' +
      '<div class="sc-breakdown">' +
      '<span>Tasks completed <b class="pos">+' + breakdown.doneTasks * 10 + '</b></span>' +
      '<span>Habits completed <b class="pos">+' + breakdown.doneHabits * 5 + '</b></span>' +
      '<span>Goal milestones <b class="pos">+' + breakdown.milestones * 20 + '</b></span>' +
      '<span>Missed tasks <b class="neg">−' + breakdown.missedTasks * 5 + '</b></span>' +
      '<span>Missed habits <b class="neg">−' + breakdown.missedHabits * 2 + '</b></span>' +
      '</div></div>';
  }

  const actions = {
    'goto-stats-cal': function () { Router.navigate('calendar'); }
  };

  return { render: render, actions: actions };
})();