const Notifications = (function () {
  let timer = null;
  let unread = 0;

  function permission() {
    return typeof Notification === 'undefined' ? 'unsupported' : Notification.permission;
  }
  function requestPermission() {
    if (permission() === 'unsupported') { UI.toast('Browser notifications are not supported here', 'warn', 'bell'); return; }
    if (permission() === 'granted') { UI.toast('Notifications already enabled', 'success', 'bell'); return; }
    Notification.requestPermission().then(function (p) {
      if (p === 'granted') UI.toast('Notifications enabled', 'success', 'bell');
      else UI.toast('Notification permission denied', 'warn', 'bell');
    });
  }

  function dueNotifications() {
    const now = Date.now();
    return State.data.notifications.filter(function (n) {
      return !n.fired && n.at && new Date(n.at).getTime() <= now;
    });
  }

  async function fireDue() {
    const due = dueNotifications();
    if (!due.length) return;
    const still = due.filter(function (n) {
      const task = State.data.tasks.find(function (t) { return t.id === n.taskId; });
      return task && task.status !== 'done';
    });
    for (const n of still) {
      if (State.getSetting('notificationsOn') && permission() === 'granted') {
        try {
          const nt = new Notification('Task reminder', {
            body: n.title + ' starts soon',
            icon: 'pwa/icon-192.png'
          });
          nt.onclick = function () { window.focus(); Router.navigate('tasks'); nt.close(); };
        } catch (e) { /* ignore */ }
      }
      UI.toast('<b>Reminder:</b> ' + Utils.escapeHtml(n.title) + ' is starting soon', 'info', 'alarm');
      unread++;
      updateBadge();
      n.fired = true;
      await DB.put('notifications', n);
    }
    const idx = State.data.notifications;
    for (const n of due) {
      const i = idx.findIndex(function (x) { return x.id === n.id; });
      if (i >= 0 && idx[i].fired !== n.fired) idx[i] = n;
    }
  }

  function unreadCount() {
    return State.data.notifications.filter(function (n) { return n.fired; }).length;
  }
  function updateBadge() {
    const dot = document.getElementById('bellDot');
    if (!dot) return;
    const n = unreadCount();
    dot.hidden = n === 0;
  }

  function panel() {
    const existing = document.querySelector('.bell-panel');
    if (existing) { existing.remove(); return; }
    const fired = State.data.notifications.filter(function (n) { return n.fired; })
      .sort(function (a, b) { return new Date(b.at) - new Date(a.at); });
    const panel = document.createElement('div');
    panel.className = 'bell-panel';
    panel.innerHTML =
      '<h4>Notifications <button class="bell-clear" id="bellClear">Clear all</button></h4>' +
      (fired.length
        ? fired.slice(0, 12).map(function (n) {
          return '<div class="bell-item"><span class="bi-ic">' + Icons.get('alarm') + '</span>' +
            '<div class="bi-text"><b>' + Utils.escapeHtml(n.title) + '</b> reminder' +
            '<div class="bi-time">' + new Date(n.at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) + '</div></div></div>';
        }).join('')
        : '<div style="padding:14px;text-align:center;font-size:12.5px;color:var(--text-muted)">No notifications yet.</div>');
    document.body.appendChild(panel);
    document.getElementById('bellClear').addEventListener('click', function () {
      State.data.notifications.filter(function (n) { return n.fired; }).forEach(function (n) { DB.del('notifications', n.id); });
      State.data.notifications = State.data.notifications.filter(function (n) { return !n.fired; });
      updateBadge();
      panel.remove();
    });
    setTimeout(function () {
      const close = function (e) {
        if (!panel.contains(e.target) && !document.getElementById('bellBtn').contains(e.target)) {
          panel.remove();
          document.removeEventListener('click', close);
        }
      };
      document.addEventListener('click', close);
    }, 50);
  }

  function start() {
    fireDue();
    timer = setInterval(function () { fireDue(); }, 30000);
  }
  function stop() { if (timer) clearInterval(timer); }

  return { start: start, stop: stop, fireDue: fireDue, panel: panel, updateBadge: updateBadge, requestPermission: requestPermission, permission: permission, unreadCount: unreadCount };
})();