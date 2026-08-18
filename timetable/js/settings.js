window.SettingsPage = (function () {
  const ACCENTS = [
    { id: 'blue', c: '#4f7cff' },
    { id: 'cyan', c: '#22d3ee' },
    { id: 'violet', c: '#8b5cf6' },
    { id: 'purple', c: '#b348f7' },
    { id: 'emerald', c: '#10b981' }
  ];

  let installPrompt = null;

  function render(container) {
    const s = State.settings;
    const online = navigator.onLine;
    let swStatus = 'not registered';
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(function (r) {
        const el = container.querySelector('#swStatus');
        if (el) el.textContent = r ? 'active' : 'not registered';
      });
    }

    container.innerHTML =
      '<div class="page-head"><div><h2>Settings</h2><div class="page-head-sub">DLZLAB Timing v1.0 · ' + (online ? 'Online' : 'Offline mode') + '</div></div></div>' +

      '<div class="settings-grid">' +

      '<div class="glass set-card">' +
      '<div class="set-head"><span class="set-ic">' + Icons.get('moon') + '</span><div><h3>Appearance</h3><p>Theme and accent color</p></div></div>' +
      '<div class="set-row"><div class="sr-main"><div class="sr-title">Theme</div><div class="sr-desc">Dark is the premium default</div></div>' +
      UI.segHtml('setTheme', [
        { val: 'dark', label: 'Dark' }, { val: 'light', label: 'Light' }
      ], s.theme, true) + '</div>' +
      '<div class="set-row"><div class="sr-main"><div class="sr-title">Accent Color</div><div class="sr-desc">Used across the whole app</div></div>' +
      '<div class="swatches">' + ACCENTS.map(function (a) {
        return '<button class="swatch' + (s.accent === a.id ? ' on' : '') + '" data-accent="' + a.id + '" style="background:' + a.c + '"></button>';
      }).join('') + '</div></div>' +
      '</div>' +

      '<div class="glass set-card">' +
      '<div class="set-head"><span class="set-ic">' + Icons.get('bell') + '</span><div><h3>General</h3><p>Notifications and formats</p></div></div>' +
      '<div class="set-row"><div class="sr-main"><div class="sr-title">Notifications</div><div class="sr-desc">' + (State.getSetting('notificationsOn') ? 'Enabled — reminders will fire' : 'Disabled — reminders suppressed') + '</div></div>' +
      '<span class="switch"><input type="checkbox" id="setNotif"' + (s.notificationsOn ? ' checked' : '') + '><span class="track"></span></span></div>' +
      (State.getSetting('notificationsOn')
        ? '<div class="set-row"><div class="sr-main"><div class="sr-title">Browser Permission</div><div class="sr-desc">' + Notifications.permission() + '</div></div>' +
          '<button class="btn btn-sm" data-action="req-perm">' + (Notifications.permission() === 'granted' ? 'Granted' : 'Request') + '</button></div>'
        : '') +
      '<div class="set-row"><div class="sr-main"><div class="sr-title">Week Starts On</div><div class="sr-desc">Calendar &amp; weekly views</div></div>' +
      '<select class="select" id="setWeek" style="width:110px">' + Utils.WEEK.map(function (w, i) {
        return '<option value="' + i + '"' + (s.weekStart === i ? ' selected' : '') + '>' + w + '</option>';
      }).join('') + '</select></div>' +
      '<div class="set-row"><div class="sr-main"><div class="sr-title">Time Format</div><div class="sr-desc">24h or 12h clock</div></div>' +
      UI.segHtml('setTime', [
        { val: 24, label: '24h' }, { val: 12, label: '12h' }
      ], s.timeFormat, true) + '</div>' +
      '</div>' +

      '<div class="glass set-card">' +
      '<div class="set-head"><span class="set-ic">' + Icons.get('lock') + '</span><div><h3>Security</h3><p>Protect the app with a PIN lock</p></div></div>' +
      (window.Lock && Lock.isSetup()
        ? '<div class="set-row"><div class="sr-main"><div class="sr-title">PIN Lock</div><div class="sr-desc">4–6 digits · locks on each return to the app</div></div>' +
          '<div style="display:flex;gap:8px"><button class="btn btn-sm" data-action="pin-change">Change</button>' +
          '<button class="btn btn-sm" data-action="pin-remove">Disable</button></div></div>' +
          '<div class="set-row"><div class="sr-main"><div class="sr-title">Lock Now</div><div class="sr-desc">Hide the app immediately</div></div>' +
          '<button class="btn btn-sm" data-action="lock-now">Lock</button></div>'
        : '<div class="set-row"><div class="sr-main"><div class="sr-title">PIN Lock</div><div class="sr-desc">Off — anyone who opens the app sees its contents</div></div>' +
          '<button class="btn btn-sm" data-action="pin-set">Set PIN</button></div>') +
      '</div>' +

      '<div class="glass set-card">' +
      '<div class="set-head"><span class="set-ic">' + Icons.get('download') + '</span><div><h3>Data Management</h3><p>Your data lives only on this device</p></div></div>' +
      '<div class="set-actions">' +
      '<button class="btn" data-action="export-data">' + Icons.get('download') + ' Export Data (JSON)</button>' +
      '<button class="btn" data-action="import-data">' + Icons.get('upload') + ' Import Data (JSON)</button>' +
      '<input type="file" id="importFile" accept="application/json,.json" hidden>' +
      '<button class="btn" data-action="load-demo">' + Icons.get('zap') + ' Load Demo Data</button>' +
      '<button class="btn btn-danger" data-action="clear-data">' + Icons.get('trash') + ' Clear All Data</button>' +
      '</div></div>' +

      '<div class="glass set-card">' +
      '<div class="set-head"><span class="set-ic">' + Icons.get('info') + '</span><div><h3>About &amp; PWA</h3><p>DLZLAB Timing — your time management app</p></div></div>' +
      '<div class="set-row"><div class="sr-main"><div class="sr-title">App Version</div><div class="sr-desc">Vanilla HTML / CSS / JS · IndexedDB</div></div><span class="chip accent">v1.0</span></div>' +
      '<div class="set-row"><div class="sr-main"><div class="sr-title">Install App</div><div class="sr-desc">Add to home screen</div></div>' +
      '<button class="btn btn-sm" id="installBtn" data-action="install-app">' + (installPrompt ? 'Install' : 'Available') + '</button></div>' +
      '<div class="set-row"><div class="pwa-status' + (online ? '' : ' offline') + '"><span class="ps-dot"></span>' +
      (online ? 'Online — changes sync locally' : 'Offline — cached copy in use') +
      '<span class="ps-sub" id="swStatus">checking…</span></div></div>' +
      '<div class="set-row" style="padding-bottom:0"><div class="sr-main"><div class="sr-title">Storage</div><div class="sr-desc">' + storageInfo() + '</div></div></div>' +
      '</div>' +

      '</div>';

    const themeSeg = container.querySelector('#setTheme');
    themeSeg.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () { setTheme(b.dataset.val); });
    });
    const timeSeg = container.querySelector('#setTime');
    timeSeg.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () { setTimeFormat(parseInt(b.dataset.val, 10)); });
    });
    container.querySelectorAll('.swatch[data-accent]').forEach(function (s2) {
      s2.addEventListener('click', function () { setAccent(s2.dataset.accent); });
    });
    container.querySelector('#setNotif').addEventListener('change', function (e) {
      State.setSetting('notificationsOn', e.target.checked);
      UI.toast(e.target.checked ? 'Notifications enabled' : 'Notifications disabled', 'info', 'bell');
      Router.refresh();
    });
    container.querySelector('#setWeek').addEventListener('change', function (e) {
      State.setSetting('weekStart', parseInt(e.target.value, 10));
      UI.toast('Week starts on ' + Utils.WEEK[parseInt(e.target.value, 10)], 'success', 'calendar');
    });
    const importInput = container.querySelector('#importFile');
    importInput.addEventListener('change', function () {
      const file = importInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async function () {
        try {
          const payload = JSON.parse(reader.result);
          const ok = await UI.confirm({
            title: 'Import backup?',
            message: 'This will <b>replace all current data</b> with the backup. This cannot be undone.',
            danger: true, okText: 'Import & Replace'
          });
          if (!ok) return;
          await State.importData(payload);
          UI.toast('Data imported successfully', 'success', 'check');
          Router.refresh();
        } catch (err) {
          UI.toast('Import failed: invalid backup file', 'error', 'alert');
        }
      };
      reader.readAsText(file);
      importInput.value = '';
    });
  }

  function storageInfo() {
    let bytes = 0;
    Object.keys(State.data).forEach(function (k) {
      bytes += JSON.stringify(State.data[k]).length;
    });
    return Utils.fmtDur(0).length && bytes > 0
      ? (bytes > 1048576 ? (bytes / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(bytes / 1024)) + ' KB') + ' in use'
      : 'Local only';
  }

  function setTheme(t) {
    State.setSetting('theme', t);
    UI.toast(t === 'dark' ? 'Dark theme applied' : 'Light theme applied', 'success', t === 'dark' ? 'moon' : 'sun');
    Router.refresh();
  }
  function setAccent(a) {
    State.setSetting('accent', a);
    UI.toast('Accent color updated', 'success', 'palette');
    Router.refresh();
  }
  function setTimeFormat(f) {
    State.setSetting('timeFormat', f);
    UI.toast('Time format set to ' + f + 'h', 'success', 'clock');
    Router.refresh();
  }

  async function exportData() {
    const payload = State.buildExport();
    Utils.download('flowos-backup-' + Utils.todayStr() + '.json', JSON.stringify(payload, null, 2), 'application/json');
    UI.toast('Backup exported', 'success', 'download');
  }

  function pinModal(mode) {
    const current = mode === 'change';
    const body =
      '<form id="pinForm">' +
      (current
        ? '<label class="field"><span>Current PIN</span><input class="input" id="pinCur" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder="4–6 digits" style="letter-spacing:6px;font-size:18px;text-align:center"></label>'
        : '') +
      '<label class="field"><span>' + (current ? 'New PIN' : 'PIN') + '</span><input class="input" id="pinNew" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder="4–6 digits" style="letter-spacing:6px;font-size:18px;text-align:center"></label>' +
      '<label class="field"><span>Confirm PIN</span><input class="input" id="pinConf" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder="Repeat digits" style="letter-spacing:6px;font-size:18px;text-align:center"></label>' +
      '<div id="pinMsg" style="min-height:16px;font-size:11.5px;color:var(--danger);font-weight:700"></div>' +
      '</form>';
    const m = UI.modal({
      title: current ? 'Change PIN' : 'Set PIN Lock',
      body: body,
      footer: '<div class="modal-foot"><button class="btn" data-mclose>Cancel</button><button class="btn btn-accent" data-save>' + (current ? 'Save PIN' : 'Set PIN') + '</button></div>'
    });
    m.el.querySelectorAll('[data-mclose]').forEach(function (b) { b.addEventListener('click', m.close); });
    m.el.querySelector('[data-save]').addEventListener('click', async function () {
      const msg = m.el.querySelector('#pinMsg');
      const cur = m.el.querySelector('#pinCur');
      const del = m.el.querySelector('#pinNew').value.trim();
      const conf = m.el.querySelector('#pinConf').value.trim();
      if (!/^\d{4,6}$/.test(del)) { msg.textContent = 'PIN must be 4–6 digits.'; return; }
      if (cur && !(await Lock.checkPin(cur.value.trim()))) { msg.textContent = 'Current PIN is incorrect.'; m.el.querySelector('#pinCur').focus(); return; }
      if (del !== conf) { msg.textContent = 'PINs do not match.'; m.el.querySelector('#pinConf').focus(); return; }
      await Lock.setPin(del);
      m.close();
      UI.toast(current ? 'PIN changed' : 'PIN lock enabled', 'success', 'lock');
      Router.refresh();
    });
  }

  const actions = {
    'pin-set': function () { pinModal('set'); },
    'pin-change': function () { pinModal('change'); },
    'pin-remove': async function () {
      const ok = await UI.confirm({
        title: 'Disable PIN lock?',
        message: 'Anyone who opens DLZLAB Timing on this device will have full access to its contents.',
        danger: true, okText: 'Disable PIN'
      });
      if (!ok) return;
      Lock.removePin();
      UI.toast('PIN lock disabled', 'success', 'check');
      Router.refresh();
    },
    'lock-now': function () { Lock.lock(); },
    'export-data': exportData,
    'import-data': function () {
      const f = document.getElementById('importFile');
      if (f) f.click();
    },
    'load-demo': async function () {
      const ok = await UI.confirm({
        title: 'Load demo data?',
        message: 'This replaces your current data with sample content so you can explore the app.',
        danger: true, okText: 'Load Demo'
      });
      if (!ok) return;
      await DB.clearAll();
      await State.seedData();
      await State.reload();
      State.expandRecurring();
      await State.reload();
      UI.toast('Demo data loaded', 'success', 'zap');
      Router.refresh();
    },
    'clear-data': async function () {
      const ok = await UI.confirm({
        title: 'Clear all data?',
        message: 'This permanently deletes every task, habit, goal and event on this device. Your settings are kept.',
        danger: true, okText: 'Erase Everything'
      });
      if (!ok) return;
      await State.clearAllData();
      UI.toast('All data cleared', 'info', 'trash');
      Router.refresh();
    },
    'req-perm': function () {
      Notifications.requestPermission();
      setTimeout(function () { Router.refresh(); }, 1200);
    },
    'install-app': function () {
      if (installPrompt) {
        installPrompt.prompt();
        installPrompt = null;
      } else {
        UI.toast('Use your browser menu → "Install app" or "Add to home screen"', 'info', 'info');
      }
    }
  };

  function setInstallPrompt(p) {
    installPrompt = p;
    const btn = document.getElementById('installBtn');
    if (btn) btn.textContent = 'Install';
  }

  return { render: render, actions: actions, setInstallPrompt: setInstallPrompt };
})();