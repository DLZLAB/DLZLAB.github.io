const Router = (function () {
  const pages = {};
  const meta = {};
  let current = 'dashboard';
  let currentParams = {};
  const view = document.getElementById('view');
  let lastDateStr = Utils.todayStr();
  let pendingRender = null;

  function register(name, renderFn, pageMeta) {
    pages[name] = renderFn;
    meta[name] = pageMeta || {};
  }
  function title(name) {
    return meta[name].title || (name[0].toUpperCase() + name.slice(1));
  }

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, '') || 'dashboard';
    const parts = raw.split('?');
    const name = parts[0] || 'dashboard';
    const params = {};
    if (parts[1]) {
      parts[1].split('&').forEach(function (kv) {
        const i = kv.indexOf('=');
        if (i > 0) params[decodeURIComponent(kv.slice(0, i))] = decodeURIComponent(kv.slice(i + 1));
      });
    }
    return { name: name, params: params };
  }

  function setActiveNav(name) {
    document.querySelectorAll('#nav .nav-item').forEach(function (el) {
      el.classList.toggle('on', el.dataset.route === name);
    });
    document.querySelectorAll('#bottomNav button').forEach(function (el) {
      const r = el.dataset.action.replace('nav-', '');
      el.classList.toggle('on', (r === 'more' ? false : r === name) || (r === 'dashboard' && name === 'dashboard'));
    });
    document.getElementById('pageTitle').textContent = title(name);
    document.getElementById('pageSub').textContent = meta[name].sub || Utils.monthDayYear(Utils.todayStr());
  }

  function navigate(name, params) {
    current = name;
    currentParams = params || {};
    const qs = currentParams && Object.keys(currentParams).length
      ? '?' + Object.keys(currentParams).map(function (k) { return k + '=' + encodeURIComponent(currentParams[k]); }).join('&')
      : '';
    const target = '#/' + name + qs;
    if (location.hash === target) doRender();
    else location.hash = target;
  }

  async function doRender() {
    const parsed = parseHash();
    current = pages[parsed.name] ? parsed.name : 'dashboard';
    currentParams = parsed.params || {};
    if (parsed.name === 'tasks' && parsed.params.q) {
      const Tasks = window.TasksPage;
      if (Tasks && Tasks.setSearch) Tasks.setSearch(parsed.params.q);
    }
    setActiveNav(current);
    view.classList.remove('page');
    view.innerHTML = '';
    void view.offsetWidth;
    view.classList.add('page');
    const fn = pages[current] || pages.dashboard;
    try {
      await fn(view, currentParams);
    } catch (err) {
      console.error(err);
      view.innerHTML = '<div class="empty"><div class="empty-ic">' + Icons.get('alert') + '</div><div class="empty-title">Something went wrong</div><div class="empty-sub">' + Utils.escapeHtml(String(err)) + '</div></div>';
    }
  }

  function refresh() {
    if (pendingRender) return;
    pendingRender = setTimeout(function () {
      pendingRender = null;
      doRender();
    }, 30);
  }

  function hashChange() {
    const p = parseHash();
    if (pages[p.name]) doRender();
  }

  function init() {
    window.addEventListener('hashchange', hashChange);
    State.subscribe(function () {
      const now = Utils.todayStr();
      if (now !== lastDateStr) { lastDateStr = now; }
      refresh();
    });
    document.getElementById('view').addEventListener('click', function (e) {
      const el = e.target.closest('[data-action]');
      if (!el) return;
      const a = el.dataset.action;
      const currentPage = current;
      const pageModule = window[currentPage[0].toUpperCase() + currentPage.slice(1) + 'Page'];
      if (pageModule && pageModule.actions && typeof pageModule.actions[a] === 'function') {
        e.preventDefault();
        pageModule.actions[a](e, el);
      }
    });
    document.getElementById('view').addEventListener('change', function (e) {
      const el = e.target;
      if (!el.dataset || !el.dataset.change) return;
      const a = el.dataset.change;
      const pageModule = window[current[0].toUpperCase() + current.slice(1) + 'Page'];
      if (pageModule && pageModule.actions && typeof pageModule.actions[a] === 'function') {
        pageModule.actions[a](e, el);
      }
    });
    if (!location.hash) location.hash = '#/dashboard';
    hashChange();
  }

  return {
    register: register, init: init, navigate: navigate, refresh: refresh,
    get current() { return current; },
    get params() { return currentParams; }
  };
})();