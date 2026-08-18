(function () {
  const NAV = [
    { route: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { route: 'today', label: 'Today', icon: 'today' },
    { route: 'calendar', label: 'Calendar', icon: 'calendar' },
    { route: 'tasks', label: 'Tasks', icon: 'tasks' },
    { route: 'schedule', label: 'Schedule', icon: 'schedule' },
    { route: 'timetable', label: 'Timetable', icon: 'timetable' },
    { route: 'habits', label: 'Habits', icon: 'habits' },
    { route: 'goals', label: 'Goals', icon: 'goals' },
    { route: 'statistics', label: 'Statistics', icon: 'statistics' },
    { route: 'settings', label: 'Settings', icon: 'settings' }
  ];

  const SUB = {
    dashboard: 'Your day at a glance',
    today: 'Focus on today',
    calendar: 'Your month, week and day',
    tasks: 'Everything you need to do',
    schedule: 'Plan your time blocks',
    timetable: 'Your weekly timetable',
    habits: 'Build your routine',
    goals: 'Milestones that matter',
    statistics: 'Live insights from your data',
    settings: 'Preferences & data'
  };

  function buildNav() {
    const nav = document.getElementById('nav');
    nav.innerHTML = NAV.map(function (n) {
      return '<a class="nav-item" data-route="' + n.route + '" href="#/' + n.route + '">' +
        Icons.get(n.icon) + '<span class="n-label">' + n.label + '</span>' +
        (n.route === 'tasks'
          ? '<span class="n-count hidden" id="navTaskCount"></span>'
          : n.route === 'habits'
            ? '<span class="n-count hidden" id="navHabitCount"></span>'
            : '') +
        '</a>';
    }).join('');
  }

  function updateChrome() {
    const today = Utils.todayStr();
    const pageTitle = document.getElementById('pageTitle');
    const pageSub = document.getElementById('pageSub');
    if (pageSub && Router.current && SUB[Router.current]) {
      pageSub.textContent = SUB[Router.current];
    }

    const dueToday = State.tasksFor(today).filter(function (t) { return t.status !== 'done'; });
    const taskBadge = document.getElementById('navTaskCount');
    if (taskBadge) {
      taskBadge.textContent = dueToday.length;
      taskBadge.classList.toggle('hidden', dueToday.length === 0);
    }
    const habitsOpen = State.data.habits.length - State.logsForDate(today).filter(function (l) { return l.status === 'done'; }).length;
    const habitBadge = document.getElementById('navHabitCount');
    if (habitBadge) {
      habitBadge.textContent = habitsOpen > 0 ? habitsOpen : '';
      habitBadge.classList.toggle('hidden', habitsOpen <= 0);
    }

    const streak = State.bestCurrentStreak();
    const foot = document.getElementById('sideStreak');
    if (foot) {
      foot.innerHTML = '<span class="fs-ic">' + Icons.get('flame') + '</span>' +
        '<div class="fs-main"><div class="fs-val tnum">' + streak.days + ' day' + (streak.days === 1 ? '' : 's') + '</div>' +
        '<div class="fs-label">Current Streak</div></div>' +
        '<span class="fs-pct tnum">' + (State.dayStats(today).pct == null ? '—' : State.dayStats(today).pct + '%') + '</span>';
    }

    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      themeIcon.innerHTML = '';
      themeIcon.outerHTML = '<svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        (State.getSetting('theme') === 'dark'
          ? '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'
          : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>') +
        '</svg>';
    }
    void themeBtn;
    Notifications.updateBadge();
  }

  function toggleTheme() {
    const next = State.getSetting('theme') === 'dark' ? 'light' : 'dark';
    State.setSetting('theme', next);
    UI.toast(next === 'dark' ? 'Dark theme applied' : 'Light theme applied', 'success', next === 'dark' ? 'moon' : 'sun');
  }

  function bindChrome() {
    document.getElementById('menuBtn').addEventListener('click', function () {
      document.getElementById('sidebar').classList.add('open');
      document.getElementById('scrim').classList.add('show');
    });
    document.getElementById('scrim').addEventListener('click', closeDrawer);
    document.querySelectorAll('#nav a').forEach(function (a) {
      a.addEventListener('click', closeDrawer);
    });

    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
    document.getElementById('bellBtn').addEventListener('click', function () { Notifications.panel(); });
    document.getElementById('searchBtn').addEventListener('click', function () { UI.searchModal(); });
    document.getElementById('avatarBtn').addEventListener('click', function () { Router.navigate('settings'); });

    const fab = document.getElementById('fab');
    const fabMenu = document.getElementById('fabMenu');
    fab.addEventListener('click', function () {
      const open = !fab.classList.contains('open');
      fab.classList.toggle('open', open);
      fabMenu.hidden = !open;
      if (!open) closeDrawer();
    });
    fabMenu.querySelectorAll('.fab-item').forEach(function (b) {
      b.addEventListener('click', function () {
        fab.classList.remove('open');
        fabMenu.hidden = true;
        UI.quickAdd(b.dataset.action.replace('add-', '') === 'schedule' ? 'schedule' : b.dataset.action.replace('add-', ''));
      });
    });
    document.addEventListener('click', function (e) {
      if (!fab.contains(e.target) && !fabMenu.contains(e.target) && !fabMenu.hidden) {
        fabMenu.hidden = true;
        fab.classList.remove('open');
      }
    });

    document.querySelectorAll('#bottomNav button').forEach(function (b) {
      b.addEventListener('click', function () {
        const a = b.dataset.action;
        if (a === 'nav-more') {
          moreSheet();
          return;
        }
        Router.navigate(a.replace('nav-', ''));
      });
    });
  }

  function moreSheet() {
    const links = NAV.filter(function (n) {
      return ['dashboard', 'calendar', 'tasks', 'habits'].indexOf(n.route) < 0;
    });
    UI.sheet('<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px">' +
      links.map(function (n) {
        return '<button class="btn" data-action="sheet-nav" data-route="' + n.route + '" style="justify-content:flex-start;gap:10px;padding:12px 14px">' +
          '<span style="color:var(--accent);display:grid;place-items:center;width:20px;height:20px">' + Icons.get(n.icon) + '</span>' + n.label + '</button>';
      }).join('') +
      '</div>').querySelectorAll('[data-action="sheet-nav"]').forEach(function (b) {
      b.addEventListener('click', function () {
        Router.navigate(b.dataset.route);
      });
    });
  }

  function closeDrawer() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('scrim').classList.remove('show');
  }

  function shortcuts(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (document.querySelector('.modal-overlay') && e.key !== 'Escape') return;
    if (e.key === 'n' || e.key === 'N') { e.preventDefault(); UI.quickAdd('task'); }
    else if (e.key === 'h' || e.key === 'H') { e.preventDefault(); UI.habitModal(null); }
    else if (e.key === 't' || e.key === 'T') { e.preventDefault(); Router.navigate('today'); }
    else if (e.key === 'c' || e.key === 'C') { e.preventDefault(); Router.navigate('calendar'); }
    else if (e.key === '/') { e.preventDefault(); UI.searchModal(); }
  }

  function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./service-worker.js').catch(function (err) {
        console.warn('Service worker registration failed (needs http/https):', err);
      });
    });
  }

  async function boot() {
    if (window.Lock && Lock.isSetup()) Lock.lock();
    buildNav();
    await State.init();
    Router.register('dashboard', DashboardPage.render, { title: 'Dashboard', sub: SUB.dashboard });
    Router.register('today', TodayPage.render, { title: 'Today', sub: SUB.today });
    Router.register('calendar', CalendarPage.render, { title: 'Calendar', sub: SUB.calendar });
    Router.register('tasks', TasksPage.render, { title: 'Tasks', sub: SUB.tasks });
    Router.register('schedule', SchedulePage.render, { title: 'Schedule', sub: SUB.schedule });
    Router.register('timetable', TimetablePage.render, { title: 'Timetable', sub: SUB.timetable });
    Router.register('habits', HabitsPage.render, { title: 'Habit Tracker', sub: SUB.habits });
    Router.register('goals', GoalsPage.render, { title: 'Goals', sub: SUB.goals });
    Router.register('statistics', StatisticsPage.render, { title: 'Statistics', sub: SUB.statistics });
    Router.register('settings', SettingsPage.render, { title: 'Settings', sub: SUB.settings });

    bindChrome();
    document.addEventListener('keydown', shortcuts);
    State.subscribe(updateChrome);
    updateChrome();

    setInterval(function () {
      const now = Utils.todayStr();
      if (window.__flowDay !== now) {
        window.__flowDay = now;
        State.notify();
      }
    }, 60000);

    Notifications.start();
    registerSW();

    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      SettingsPage.setInstallPrompt(e);
    });
    window.addEventListener('appinstalled', function () {
      UI.toast('FlowOS installed', 'success', 'check');
    });
    window.addEventListener('online', function () { UI.toast('Back online', 'success', 'wifi'); });
    window.addEventListener('offline', function () { UI.toast('You are offline — using cached copy', 'warn', 'wifi'); });

    Router.init();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();