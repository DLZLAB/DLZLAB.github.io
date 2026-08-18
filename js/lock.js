window.Lock = (function () {
  const KEY = 'flowos_pin_v1';
  const MIN_PIN = 4;
  const MAX_PIN = 6;
  let unlocked = false;
  let needsRelock = false;
  let sh = null;

  function record() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }

  function fallbackHash(text) {
    let h1 = 5381, h2 = 52711;
    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      h1 = (h1 * 33) ^ c; h1 >>>= 0;
      h2 = (h2 * 31) ^ c; h2 >>>= 0;
    }
    return 'h' + h1.toString(16) + h2.toString(16);
  }

  function sha256(text) {
    if (window.crypto && crypto.subtle && crypto.subtle.digest) {
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (b) { return b.toString(16).padStart(2, '0'); }).join('');
      });
    }
    return Promise.resolve(fallbackHash(text));
  }

  function isSetup() { return !!record(); }

  async function setPin(pin) {
    const salt = Utils.uid().replace(/[^a-z0-9]/gi, '').slice(0, 12) + Date.now().toString(36);
    const hash = await sha256(salt + ':' + pin);
    localStorage.setItem(KEY, JSON.stringify({ salt: salt, hash: hash }));
    unlocked = false;
    return true;
  }

  async function checkPin(pin) {
    const rec = record();
    if (!rec) return false;
    return (await sha256(rec.salt + ':' + pin)) === rec.hash;
  }

  function removePin() {
    localStorage.removeItem(KEY);
    const ls = document.getElementById('lockScreen');
    if (ls) ls.remove();
    unlocked = true;
  }

  function screen() { return document.getElementById('lockScreen'); }

  function build() {
    const existing = screen();
    if (existing) return existing;
    const div = document.createElement('div');
    div.id = 'lockScreen';
    div.className = 'lock-screen';
    div.innerHTML =
      '<div class="lock-card">' +
      '<div class="lk-brand"><span class="lk-mark">' + Icons.get('zap') + '</span><span class="lk-name">FlowOS</span></div>' +
      '<div class="lk-title">Welcome back</div>' +
      '<div class="lk-sub">Enter your PIN to unlock</div>' +
      '<div class="lk-dots" id="lockDots"></div>' +
      '<div class="lk-err" id="lockErr"></div>' +
      '<div class="lk-pad" id="lockPad">' +
      [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (n) {
        return '<button class="lk-key" type="button" data-k="' + n + '">' + n + '</button>';
      }).join('') +
      '<span class="lk-ghost"></span>' +
      '<button class="lk-key" type="button" data-k="0">0</button>' +
      '<button class="lk-key" type="button" id="lkBack" aria-label="Delete">' + Icons.get('x') + '</button>' +
      '</div>' +
      '<button class="lk-forgot" type="button" id="lkForgot">Forgot PIN?</button>' +
      '</div>';
    document.body.appendChild(div);

    const card = div.querySelector('.lock-card');
    const dots = div.querySelector('#lockDots');
    const err = div.querySelector('#lockErr');
    const pad = div.querySelector('#lockPad');
    let buffer = '';

    function renderDots() {
      dots.innerHTML = '';
      for (let i = 0; i < MAX_PIN; i++) {
        const s = document.createElement('span');
        if (i < buffer.length) s.className = 'filled';
        dots.appendChild(s);
      }
    }
    function fail() {
      pad.classList.add('busy');
      card.classList.add('shake');
      err.textContent = 'Wrong PIN';
      err.classList.add('show');
      buffer = '';
      renderDots();
      setTimeout(function () { pad.classList.remove('busy'); card.classList.remove('shake'); }, 500);
    }
    async function tryVerify() {
      if (buffer.length < MIN_PIN || pad.classList.contains('busy')) return;
      pad.classList.add('busy');
      const ok = await checkPin(buffer);
      if (ok) {
        unlocked = true;
        needsRelock = false;
        div.classList.remove('show');
        setTimeout(function () { div.remove(); }, 320);
      } else {
        fail();
      }
    }
    function press(k) {
      if (pad.classList.contains('busy')) return;
      if (buffer.length >= MAX_PIN) return;
      err.classList.remove('show');
      buffer += String(k);
      renderDots();
      if (buffer.length === MIN_PIN) tryVerify();
    }
    function back() {
      if (pad.classList.contains('busy')) return;
      err.classList.remove('show');
      buffer = buffer.slice(0, -1);
      renderDots();
    }
    function tryEnter() {
      if (buffer.length >= MIN_PIN) tryVerify();
      else { err.textContent = 'PIN is 4–6 digits'; err.classList.add('show'); }
    }

    div.querySelectorAll('[data-k]').forEach(function (b) {
      b.addEventListener('click', function () { press(b.dataset.k); });
    });
    div.querySelector('#lkBack').addEventListener('click', back);
    div.querySelector('#lkForgot').addEventListener('click', function () {
      if (pad.classList.contains('busy')) return;
      UI.confirm({
        title: 'Forgot your PIN?',
        message: 'There is no way to recover a forgotten PIN. You can reset it, but <b>all FlowOS data on this device will be erased</b>.',
        danger: true, okText: 'Reset App'
      }).then(function (ok) {
        if (!ok) return;
        localStorage.removeItem(KEY);
        localStorage.removeItem('flowos_settings_v1');
        DB.clearAll().then(function () { window.location.reload(); });
      });
    });

    sh = { press: press, back: back, enter: tryEnter };
    renderDots();
    return div;
  }

  function lock() {
    if (!isSetup()) return;
    const ls = build();
    ls.classList.add('show');
  }

  function unlock() {
    const ls = screen();
    if (ls) {
      ls.classList.remove('show');
      setTimeout(function () { ls.remove(); }, 320);
    }
    unlocked = true;
    needsRelock = false;
  }

  document.addEventListener('keydown', function (e) {
    const ls = screen();
    if (!ls || !ls.classList.contains('show') || !sh) return;
    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      sh.press(e.key);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      sh.back();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      sh.enter();
    }
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (isSetup()) needsRelock = true;
    } else if (needsRelock && isSetup()) {
      needsRelock = false;
      lock();
    }
  });

  return {
    isSetup: isSetup,
    setPin: setPin,
    checkPin: checkPin,
    removePin: removePin,
    lock: lock,
    unlock: unlock,
    isLocked: function () { return !unlocked; }
  };
})();