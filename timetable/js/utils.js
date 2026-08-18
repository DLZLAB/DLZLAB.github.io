const Utils = (function () {
  const WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const WEEK_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function pad(n) { return String(n).padStart(2, '0'); }

  function toStr(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function fromStr(s) {
    const p = String(s).split('-').map(Number);
    return new Date(p[0], (p[1] || 1) - 1, p[2] || 1);
  }
  function todayStr() { return toStr(new Date()); }
  function addDays(dateStr, n) {
    const d = fromStr(dateStr);
    d.setDate(d.getDate() + n);
    return toStr(d);
  }
  function daysInMonth(year, month1to12) { return new Date(year, month1to12, 0).getDate(); }
  function isLeap(year) { return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0; }
  function weekday(dateStr) { return fromStr(dateStr).getDay(); }
  function monthKey(dateStr) { return dateStr.slice(0, 7); }
  function startOfWeek(dateStr, weekStart) {
    const d = fromStr(dateStr);
    const diff = (d.getDay() - (weekStart || 0) + 7) % 7;
    d.setDate(d.getDate() - diff);
    return toStr(d);
  }

  function monthMatrix(year, monthIndex0, weekStart) {
    const days = daysInMonth(year, monthIndex0 + 1);
    const firstDow = (new Date(year, monthIndex0, 1).getDay() - (weekStart || 0) + 7) % 7;
    const cells = [];
    for (let i = 0; i < firstDow; i++) {
      const prev = new Date(year, monthIndex0, i - firstDow + 1);
      cells.push({ date: toStr(prev), inMonth: false, day: prev.getDate() });
    }
    for (let d = 1; d <= days; d++) {
      const dt = new Date(year, monthIndex0, d);
      cells.push({ date: toStr(dt), inMonth: true, day: d });
    }
    let rem = cells.length % 7;
    if (rem !== 0) rem = 7 - rem;
    for (let i = 1; i <= rem; i++) {
      const nx = new Date(year, monthIndex0 + 1, i);
      cells.push({ date: toStr(nx), inMonth: false, day: i });
    }
    return cells;
  }

  function timeToMin(t) {
    if (!t || typeof t !== 'string') return null;
    const p = t.split(':').map(Number);
    return p[0] * 60 + (p[1] || 0);
  }
  function minToTime(m, fmt) {
    m = Math.max(0, Math.min(1439, Math.round(m)));
    let h = Math.floor(m / 60);
    const mm = m % 60;
    if ((fmt || 24) === 12) {
      const ap = h >= 12 ? 'PM' : 'AM';
      h = h % 12 === 0 ? 12 : h % 12;
      return h + ':' + pad(mm) + ' ' + ap;
    }
    return pad(h) + ':' + pad(mm);
  }
  function fmtDur(min) {
    min = Math.max(0, Math.round(min));
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h === 0) return m + 'm';
    if (m === 0) return h + 'h';
    return h + 'h ' + m + 'm';
  }
  function fmtDurLong(min) {
    min = Math.max(0, Math.round(min));
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h === 0) return m + ' minutes';
    if (m === 0) return h + ' hours';
    return h + 'h ' + m + 'm';
  }

  function monthName(m1to12) { return MONTHS[m1to12 - 1]; }
  function dayName(dow) { return WEEK[dow]; }
  function dayNameShort(dow) { return WEEK_SHORT[dow]; }
  function monthDayYear(dateStr) {
    const d = fromStr(dateStr);
    return WEEK[d.getDay()] + ', ' + MONTHS_SHORT[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  function relDay(dateStr) {
    const today = todayStr();
    if (dateStr === today) return 'Today';
    if (dateStr === addDays(today, 1)) return 'Tomorrow';
    if (dateStr === addDays(today, -1)) return 'Yesterday';
    const d = fromStr(dateStr);
    return WEEK[d.getDay()];
  }
  function gregorianTitle(dateStr) {
    const d = fromStr(dateStr);
    return WEEK[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate();
  }
  function dateShort(dateStr) {
    const d = fromStr(dateStr);
    return MONTHS_SHORT[d.getMonth()] + ' ' + d.getDate();
  }
  function dateLong(dateStr) {
    const d = fromStr(dateStr);
    return MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  function monthYearStr(year, m1to12) { return MONTHS[m1to12 - 1] + ' ' + year; }

  function diffDays(aStr, bStr) {
    const a = fromStr(aStr), b = fromStr(bStr);
    return Math.round((b - a) / 86400000);
  }
  function daysAgo(n) { return addDays(todayStr(), -n); }
  function monthStrOf(dateStr) { return dateStr.slice(0, 7); }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function uid() {
    try { return crypto.randomUUID(); } catch (e) {
      return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
    }
  }
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function debounce(fn, ms) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }
  function greeting() {
    const h = new Date().getHours();
    if (h < 5) return { text: 'Working Late', icon: 'moon' };
    if (h < 12) return { text: 'Good Morning', icon: 'sun' };
    if (h < 17) return { text: 'Good Afternoon', icon: 'cloud-sun' };
    return { text: 'Good Evening', icon: 'moon' };
  }
  function download(filename, content, mime) {
    const blob = new Blob([content], { type: mime || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 400);
  }
  function ymd(offsetDays) { return addDays(todayStr(), offsetDays || 0); }

  function nowMin() {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  }

  return {
    WEEK, WEEK_SHORT, MONTHS, MONTHS_SHORT,
    pad, toStr, fromStr, todayStr, addDays, daysInMonth, isLeap, weekday, monthKey,
    startOfWeek, monthMatrix, timeToMin, minToTime, fmtDur, fmtDurLong,
    monthName, dayName, dayNameShort, monthDayYear, relDay, gregorianTitle, dateShort, dateLong,
    monthYearStr, diffDays, daysAgo, monthStrOf, clamp, uid, escapeHtml, debounce,
    greeting, download, ymd, nowMin
  };
})();