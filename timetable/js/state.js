const State = (function () {
  const SETTINGS_KEY = 'flowos_settings_v1';
  const data = {
    tasks: [], events: [], habits: [], habitLogs: [],
    goals: [], milestones: [], categories: [], notifications: []
  };
  let settings = {
    theme: 'dark', accent: 'blue', weekStart: 0, timeFormat: 24,
    notificationsOn: true, seeded: false
  };
  const listeners = new Set();
  let ready = false;

  function notify() {
    listeners.forEach(function (fn) { fn(); });
  }
  function subscribe(fn) { listeners.add(fn); return function () { listeners.delete(fn); }; }

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
  function getSetting(key) { return settings[key]; }
  function setSetting(key, value) {
    settings[key] = value;
    saveSettings();
    notify();
  }
  function setSettings(obj) {
    Object.keys(obj).forEach(function (k) { settings[k] = obj[k]; });
    saveSettings();
    notify();
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', settings.theme);
    document.documentElement.setAttribute('data-accent', settings.accent);
  }

  async function init() {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) settings = Object.assign(settings, JSON.parse(stored));
    } catch (e) { /* keep defaults */ }
    applyTheme();
    await DB.open();
    await reload();
    ready = true;
    if (!settings.seeded) {
      await seedData();
      await reload();
      settings.seeded = true;
      saveSettings();
    }
    expandRecurring();
    await reload();
    return true;
  }

  async function reload() {
    const jobs = Object.keys(data).map(function (k) {
      return DB.getAll(k).then(function (items) { data[k] = items; });
    });
    await Promise.all(jobs);
  }

  async function add(store, item) {
    item.id = item.id || Utils.uid();
    await DB.put(store, item);
    data[store].push(item);
    notify();
    return item;
  }
  async function update(store, item) {
    await DB.put(store, item);
    const i = data[store].findIndex(function (x) { return x.id === item.id; });
    if (i >= 0) data[store][i] = item; else data[store].push(item);
    notify();
    return item;
  }
  async function replace(store, id, patch) {
    const item = data[store].find(function (x) { return x.id === id; });
    if (!item) return null;
    Object.assign(item, patch);
    return update(store, item);
  }
  async function remove(store, id) {
    await DB.del(store, id);
    data[store] = data[store].filter(function (x) { return x.id !== id; });
    notify();
  }

  function tasksFor(dateStr) {
    return data.tasks.filter(function (t) { return t.date === dateStr; });
  }
  function eventsFor(dateStr) {
    return data.events.filter(function (e) { return e.date === dateStr; });
  }
  function logFor(habitId, dateStr) {
    return data.habitLogs.find(function (l) { return l.habitId === habitId && l.date === dateStr; });
  }
  function logsForDate(dateStr) {
    return data.habitLogs.filter(function (l) { return l.date === dateStr; });
  }
  function categoryOf(name) {
    const cat = settings && data.categories.find(function (c) { return c.name === name; });
    return cat || { name: name || 'General', color: 'blue' };
  }

  const COLORS = ['blue', 'violet', 'cyan', 'green', 'orange', 'pink'];
  function colorOf(name) {
    if (!name) return COLORS[0];
    const cat = data.categories.find(function (c) { return c.name === name; });
    if (cat) return cat.color;
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
    return COLORS[hash % COLORS.length];
  }
  const COLOR_HEX = {
    blue: '#4f7cff', violet: '#a78bfa', cyan: '#22d3ee',
    green: '#34d399', orange: '#fb923c', pink: '#f472b6'
  };

  function taskOverlaps(a, b) {
    if (!a.date || a.date !== b.date) return false;
    if (a.timeStart == null || b.timeStart == null || a.timeEnd == null || b.timeEnd == null) return false;
    return a.timeStart < b.timeEnd && b.timeStart < a.timeEnd;
  }
  function getConflicts(dateStr) {
    const items = [];
    data.tasks.forEach(function (t) {
      if (t.date === dateStr && t.timeStart != null && t.timeEnd != null && t.timeEnd > t.timeStart) {
        items.push({ kind: 'task', id: t.id, title: t.title, timeStart: t.timeStart, timeEnd: t.timeEnd });
      }
    });
    data.events.forEach(function (e) {
      if (e.date === dateStr && e.timeStart != null && e.timeEnd != null) {
        items.push({ kind: 'event', id: e.id, title: e.title, timeStart: e.timeStart, timeEnd: e.timeEnd });
      }
    });
    const pairs = [];
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        if (items[i].timeStart < items[j].timeEnd && items[j].timeStart < items[i].timeEnd) {
          pairs.push([items[i], items[j]]);
        }
      }
    }
    return pairs;
  }

  function dayStats(dateStr) {
    const tasks = tasksFor(dateStr);
    const doneTasks = tasks.filter(function (t) { return t.status === 'done'; });
    const habits = data.habits;
    const logs = logsForDate(dateStr);
    const doneHabits = logs.filter(function (l) { return l.status === 'done'; }).length;
    const skippedHabits = logs.filter(function (l) { return l.status === 'skipped'; }).length;
    const weightedDone = doneTasks.length + doneHabits * 0.5;
    const weightedPossible = tasks.length + (habits.length - skippedHabits) * 0.5;
    const pct = weightedPossible > 0 ? Math.round((weightedDone / weightedPossible) * 100) : null;
    return {
      tasks: tasks, doneTasks: doneTasks, tasksTotal: tasks.length,
      doneHabits: doneHabits, habitsTotal: habits.length, skippedHabits: skippedHabits,
      pct: pct == null ? null : Math.min(100, Math.max(0, pct))
    };
  }

  function focusMin(dateStr) {
    let m = 0;
    tasksFor(dateStr).forEach(function (t) {
      if (t.status === 'done' && t.timeStart != null && t.timeEnd != null) m += t.timeEnd - t.timeStart;
    });
    eventsFor(dateStr).forEach(function (e) {
      if (e.timeStart != null && e.timeEnd != null && e.timeEnd > e.timeStart) m += e.timeEnd - e.timeStart;
    });
    return m > 0 ? m : 0;
  }

  function milestonesDoneOn(dateStr) {
    return data.milestones.filter(function (m) { return m.done && m.doneDate === dateStr; }).length;
  }
  function missedTasksOn(dateStr) {
    const today = Utils.todayStr();
    return tasksFor(dateStr).filter(function (t) {
      return dateStr < today && t.status !== 'done' && !t.recurring;
    }).length;
  }
  function missedHabitsOn(dateStr) {
    const today = Utils.todayStr();
    if (dateStr >= today) return 0;
    let n = 0;
    data.habits.forEach(function (h) {
      const created = h.createdAt || '0001-01-01';
      if (created > dateStr) return;
      const log = logFor(h.id, dateStr);
      if (!log) n++;
    });
    return n;
  }
  function scoreOn(dateStr) {
    const s = dayStats(dateStr);
    const pts = s.doneTasks.length * 10 + s.doneHabits * 5 + milestonesDoneOn(dateStr) * 20
      - missedTasksOn(dateStr) * 5 - missedHabitsOn(dateStr) * 2;
    return {
      points: pts,
      pos: s.doneTasks.length * 10 + s.doneHabits * 5 + milestonesDoneOn(dateStr) * 20,
      neg: missedTasksOn(dateStr) * 5 + missedHabitsOn(dateStr) * 2,
      doneTasks: s.doneTasks.length, doneHabits: s.doneHabits,
      milestones: milestonesDoneOn(dateStr), missedTasks: missedTasksOn(dateStr), missedHabits: missedHabitsOn(dateStr)
    };
  }
  function scoreRange(from, to) {
    let points = 0, pos = 0, neg = 0;
    for (let d = from; d <= to; d = Utils.addDays(d, 1)) {
      const s = scoreOn(d);
      points += s.points; pos += s.pos; neg += s.neg;
    }
    return { points: points, pos: pos, neg: neg };
  }
  function habitLogStatus(habitId, dateStr) {
    const l = logFor(habitId, dateStr);
    return l ? l.status : null;
  }
  function habitStats(habitId, endDate) {
    const habit = data.habits.find(function (h) { return h.id === habitId; }) || {};
    const created = habit.createdAt || '0001-01-01';
    const today = Utils.todayStr();
    const d = endDate && endDate < today ? endDate : today;
    const grace = d === today;
    let current = 0;
    let y = d;
    while (y >= created) {
      const st = habitLogStatus(habitId, y);
      if (st === 'done') { current++; y = Utils.addDays(y, -1); }
      else if (st === 'skipped') break;
      else if (grace && y === d) { y = Utils.addDays(y, -1); continue; }
      else break;
    }
    let total = 0, best = 0, run = 0;
    let x = created;
    while (x <= d) {
      const st = habitLogStatus(habitId, x);
      if (st === 'done') { total++; run++; best = Math.max(best, run); }
      else if (st === 'skipped') run = 0;
      else if (grace && x === d) {}
      else run = 0;
      x = Utils.addDays(x, 1);
    }
    const activeDays = Utils.diffDays(created, d) + 1;
    const rate = activeDays > 0 ? Math.round((total / activeDays) * 100) : 0;
    return { current: current, best: best, total: total, rate: rate };
  }
  function bestCurrentStreak() {
    let best = 0, bestHabit = null;
    data.habits.forEach(function (h) {
      const s = habitStats(h.id, Utils.todayStr());
      if (s.current > best) { best = s.current; bestHabit = h; }
    });
    return { days: best, habit: bestHabit };
  }
  function bestDayInRange(from, to) {
    let bestPct = -1, bestDate = null;
    for (let d = from; d <= to; d = Utils.addDays(d, 1)) {
      const pct = dayStats(d).pct;
      if (pct != null && pct > bestPct) { bestPct = pct; bestDate = d; }
    }
    return bestDate ? { date: bestDate, pct: bestPct } : null;
  }

  function matchRecurring(t, dateStr) {
    if (!t.recurring || t.recurring.type === 'none') return false;
    const r = t.recurring;
    const diff = Utils.diffDays(t.date, dateStr);
    if (diff <= 0) return false;
    const dow = Utils.weekday(dateStr);
    switch (r.type) {
      case 'daily': return diff % (r.interval || 1) === 0;
      case 'weekdays': return dow >= 1 && dow <= 5 && ((r.interval || 1) === 1 || Math.floor(diff / 7) % (r.interval || 1) === 0);
      case 'weekly': return dow === Utils.weekday(t.date) && Math.floor(diff / 7) % (r.interval || 1) === 0;
      case 'monthly': {
        const a = Utils.fromStr(t.date), b = Utils.fromStr(dateStr);
        const months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
        if (months > 0 && months % (r.interval || 1) === 0) {
          const dayA = a.getDate();
          const lastDayB = Utils.daysInMonth(b.getFullYear(), b.getMonth() + 1);
          const target = Math.min(dayA, lastDayB);
          return b.getDate() === target;
        }
        return false;
      }
      case 'custom': return (r.weekdays || []).indexOf(dow) >= 0 && ((r.interval || 1) === 1 || Math.floor(diff / 7) % (r.interval || 1) === 0);
      default: return false;
    }
  }

  function expandRecurring() {
    const today = Utils.todayStr();
    const horizon = Utils.addDays(today, 35);
    const templates = data.tasks.filter(function (t) {
      return t.recurring && t.recurring.type !== 'none' && t.recurring.enabled !== false;
    });
    templates.forEach(function (tpl) {
      let d = Utils.addDays(tpl.date, 1);
      while (d <= horizon) {
        if (matchRecurring(tpl, d)) {
          const exists = data.tasks.some(function (t) {
            return t.templateId === tpl.id && t.date === d;
          });
          if (!exists) {
            const inst = {
              id: Utils.uid(), templateId: tpl.id,
              title: tpl.title, description: tpl.description || '',
              date: d, timeStart: tpl.timeStart, timeEnd: tpl.timeEnd,
              priority: tpl.priority, category: tpl.category,
              status: 'todo', reminder: tpl.reminder, createdAt: tpl.createdAt
            };
            data.tasks.push(inst);
            DB.put('tasks', inst);
          }
        }
        d = Utils.addDays(d, 1);
      }
    });
  }

  function deleteTask(id) {
    const t = data.tasks.find(function (x) { return x.id === id; });
    if (t && t.templateId) {
      return remove('tasks', id);
    }
    if (t && t.recurring && t.recurring.type !== 'none') {
      const ids = data.tasks.filter(function (x) { return x.templateId === t.id; }).map(function (x) { return x.id; });
      ids.push(t.id);
      return Promise.all(ids.map(function (i) { return remove('tasks', i); }));
    }
    return remove('tasks', id);
  }

  function buildExport() {
    return {
      app: 'flowos', version: 1, exportedAt: new Date().toISOString(),
      data: data
    };
  }
  async function importData(payload) {
    if (!payload || payload.app !== 'flowos' || !payload.data) throw new Error('Invalid backup file');
    const d = payload.data;
    ['tasks', 'events', 'habits', 'habitLogs', 'goals', 'milestones', 'categories', 'notifications'].forEach(function (k) {
      if (!Array.isArray(d[k])) d[k] = [];
    });
    await DB.clearAll();
    const jobs = [];
    Object.keys(d).forEach(function (k) {
      if (k === 'notifications') return;
      if (Array.isArray(d[k])) jobs.push(DB.bulkPut(k, d[k]));
    });
    await Promise.all(jobs);
    await reload();
    expandRecurring();
    await reload();
    notify();
  }

  async function clearAllData() {
    await DB.clearAll();
    const keep = { notificationsOn: settings.notificationsOn, theme: settings.theme, accent: settings.accent, weekStart: settings.weekStart, timeFormat: settings.timeFormat };
    settings = Object.assign(settings, keep);
    settings.seeded = true;
    saveSettings();
    await reload();
    notify();
  }

  function seedData() {
    const t = Utils.todayStr();
    const uid = Utils.uid;
    const jobs = [];
    const habits = [
      { name: 'Morning Workout', color: 'orange' },
      { name: 'Read 30 Minutes', color: 'cyan' },
      { name: 'JavaScript Study', color: 'blue' },
      { name: 'Deep Work Block', color: 'violet' },
      { name: 'Meditation', color: 'green' },
      { name: 'Daily Planning', color: 'pink' }
    ];
    habits.forEach(function (h, i) {
      const hid = uid();
      const hObj = { id: hid, name: h.name, color: h.color, createdAt: Utils.addDays(t, -21) };
      jobs.push(DB.put('habits', hObj));
      for (let back = 21; back >= 1; back--) {
        if ((i + back) % 7 === 2) continue;
        if ((i === 3 && (i + back) % 5 === 0)) continue;
        jobs.push(DB.put('habitLogs', { id: uid(), habitId: hid, date: Utils.addDays(t, -back), status: 'done' }));
      }
      jobs.push(DB.put('habitLogs', { id: uid(), habitId: hid, date: t, status: 'done' }));
    });

    const cats = [
      { id: uid(), name: 'Work', color: 'blue' },
      { id: uid(), name: 'Personal', color: 'violet' },
      { id: uid(), name: 'Health', color: 'green' },
      { id: uid(), name: 'Learning', color: 'cyan' },
      { id: uid(), name: 'Finance', color: 'orange' }
    ];
    cats.forEach(function (c) { jobs.push(DB.put('categories', c)); });

    const mkTask = function (p) {
      jobs.push(DB.put('tasks', Object.assign({
        id: uid(), description: '', status: 'todo', priority: 'medium',
        reminder: 0, recurring: { type: 'none', interval: 1, enabled: false }, createdAt: t
      }, p)));
    };
    mkTask({ title: 'Daily Planning', date: t, timeStart: 480, timeEnd: 510, priority: 'low', category: 'Personal', status: 'done' });
    mkTask({ title: 'Morning Workout', date: t, timeStart: 510, timeEnd: 570, priority: 'medium', category: 'Health', status: 'done' });
    mkTask({ title: 'JavaScript Study', date: t, timeStart: 540, timeEnd: 660, priority: 'high', category: 'Learning', status: 'done' });
    mkTask({ title: 'Client Project', date: t, timeStart: 840, timeEnd: 1020, priority: 'urgent', category: 'Work', status: 'in-progress', description: 'Final sprint on the dashboard module' });
    mkTask({ title: 'Read 30 Minutes', date: t, timeStart: 1260, timeEnd: 1290, priority: 'low', category: 'Personal' });
    mkTask({ title: 'Team Standup', date: Utils.addDays(t, 1), timeStart: 540, timeEnd: 570, priority: 'medium', category: 'Work' });
    mkTask({ title: 'Weekly Review', date: Utils.addDays(t, 2), timeStart: 960, timeEnd: 1020, priority: 'medium', category: 'Work', recurring: { type: 'weekly', interval: 1, enabled: true } });
    mkTask({ title: 'Pay Subscription Bills', date: Utils.addDays(t, 3), timeStart: 1050, timeEnd: 1080, priority: 'medium', category: 'Finance' });
    mkTask({ title: 'Plan Weekend Trip', date: Utils.addDays(t, 4), timeStart: 1140, timeEnd: 1200, priority: 'low', category: 'Personal' });
    mkTask({ title: 'Missed Expense Review', date: Utils.addDays(t, -1), timeStart: 1020, timeEnd: 1050, priority: 'medium', category: 'Finance' });
    mkTask({ title: 'Old Notes Cleanup', date: Utils.addDays(t, -2), timeStart: 900, timeEnd: 930, priority: 'low', category: 'Personal' });

    const events = [
      { title: 'Morning Routine', date: t, timeStart: 480, timeEnd: 510, color: 'cyan' },
      { title: 'Deep Work', date: t, timeStart: 540, timeEnd: 660, color: 'blue' },
      { title: 'Team Meeting', date: t, timeStart: 660, timeEnd: 720, color: 'violet' },
      { title: 'Lunch', date: t, timeStart: 780, timeEnd: 840, color: 'orange' },
      { title: 'Client Project', date: t, timeStart: 840, timeEnd: 1020, color: 'blue' },
      { title: 'Exercise', date: t, timeStart: 1050, timeEnd: 1110, color: 'green' }
    ];
    events.forEach(function (e) { jobs.push(DB.put('events', Object.assign({ id: uid() }, e))); });

    const g1 = { id: uid(), title: 'Learn JavaScript', description: 'Master modern JavaScript and build production-grade apps.', deadline: Utils.addDays(t, 45), color: 'blue', createdAt: t };
    const g2 = { id: uid(), title: 'Launch Personal Website', description: 'Design, build and ship a personal portfolio site.', deadline: Utils.addDays(t, 60), color: 'violet', createdAt: t };
    const g3 = { id: uid(), title: 'Run 5K Comfortably', description: 'Build up endurance to run 5 kilometers without stopping.', deadline: Utils.addDays(t, 30), color: 'green', createdAt: t };
    jobs.push(DB.put('goals', g1), DB.put('goals', g2), DB.put('goals', g3));
    [
      { goalId: g1.id, title: 'Complete core syntax', done: true },
      { goalId: g1.id, title: 'Understand async & promises', done: true },
      { goalId: g1.id, title: 'Build 3 mini projects', done: true },
      { goalId: g1.id, title: 'Master DOM manipulation', done: false },
      { goalId: g1.id, title: 'Ship a full app', done: false }
    ].forEach(function (m) { jobs.push(DB.put('milestones', Object.assign({ id: uid(), doneDate: null }, m))); });
    [
      { goalId: g2.id, title: 'Pick a stack & design', done: true },
      { goalId: g2.id, title: 'Build core pages', done: true },
      { goalId: g2.id, title: 'Add case studies', done: false },
      { goalId: g2.id, title: 'Deploy & announce', done: false }
    ].forEach(function (m) { jobs.push(DB.put('milestones', Object.assign({ id: uid(), doneDate: null }, m))); });
    [
      { goalId: g3.id, title: 'Run 1K non-stop', done: true },
      { goalId: g3.id, title: 'Run 3K non-stop', done: true },
      { goalId: g3.id, title: 'Run 5K non-stop', done: false }
    ].forEach(function (m) { jobs.push(DB.put('milestones', Object.assign({ id: uid(), doneDate: null }, m))); });

    return Promise.all(jobs);
  }

  return {
    data: data, ready: ready,
    settings: settings,
    init: init, reload: reload, notify: notify, subscribe: subscribe,
    getSetting: getSetting, setSetting: setSetting, setSettings: setSettings,
    add: add, update: update, replace: replace, remove: remove,
    tasksFor: tasksFor, eventsFor: eventsFor, logFor: logFor, logsForDate: logsForDate,
    categoryOf: categoryOf, colorOf: colorOf, COLOR_HEX: COLOR_HEX,
    taskOverlaps: taskOverlaps, getConflicts: getConflicts,
    dayStats: dayStats, focusMin: focusMin, milestonesDoneOn: milestonesDoneOn,
    missedTasksOn: missedTasksOn, missedHabitsOn: missedHabitsOn,
    scoreOn: scoreOn, scoreRange: scoreRange,
    habitLogStatus: habitLogStatus, habitStats: habitStats,
    bestCurrentStreak: bestCurrentStreak, bestDayInRange: bestDayInRange,
    matchRecurring: matchRecurring, expandRecurring: expandRecurring,
    deleteTask: deleteTask,
    buildExport: buildExport, importData: importData, clearAllData: clearAllData,
    seedData: seedData
  };
})();