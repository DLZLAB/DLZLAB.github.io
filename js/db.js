const DB = (function () {
  const NAME = 'flowos';
  const VERSION = 1;
  const STORES = ['tasks', 'events', 'habits', 'habitLogs', 'goals', 'milestones', 'categories', 'notifications'];
  let db = null;

  function open() {
    return new Promise((resolve, reject) => {
      if (db) return resolve(db);
      const req = indexedDB.open(NAME, VERSION);
      req.onupgradeneeded = function (e) {
        const d = e.target.result;
        STORES.forEach(function (s) {
          if (!d.objectStoreNames.contains(s)) d.createObjectStore(s, { keyPath: 'id' });
        });
      };
      req.onsuccess = function () { db = req.result; resolve(db); };
      req.onerror = function () { reject(req.error); };
      req.onblocked = function () { reject(new Error('IndexedDB blocked')); };
    });
  }

  function tx(store, mode) {
    return db.transaction(store, mode || 'readonly').objectStore(store);
  }

  function getAll(store) {
    return new Promise(function (resolve, reject) {
      const req = tx(store).getAll();
      req.onsuccess = function () { resolve(req.result || []); };
      req.onerror = function () { reject(req.error); };
    });
  }
  function put(store, value) {
    return new Promise(function (resolve, reject) {
      const req = tx(store, 'readwrite').put(value);
      req.onsuccess = function () { resolve(value); };
      req.onerror = function () { reject(req.error); };
    });
  }
  function bulkPut(store, values) {
    return new Promise(function (resolve, reject) {
      const t = db.transaction(store, 'readwrite');
      const os = t.objectStore(store);
      values.forEach(function (v) { os.put(v); });
      t.oncomplete = function () { resolve(values); };
      t.onerror = function () { reject(t.error); };
    });
  }
  function del(store, id) {
    return new Promise(function (resolve, reject) {
      const req = tx(store, 'readwrite').delete(id);
      req.onsuccess = function () { resolve(); };
      req.onerror = function () { reject(req.error); };
    });
  }
  function clear(store) {
    return new Promise(function (resolve, reject) {
      const req = tx(store, 'readwrite').clear();
      req.onsuccess = function () { resolve(); };
      req.onerror = function () { reject(req.error); };
    });
  }
  function clearAll() {
    return Promise.all(STORES.map(function (s) { return clear(s); }));
  }

  return {
    STORES: STORES,
    open: open,
    getAll: getAll,
    put: put,
    bulkPut: bulkPut,
    del: del,
    clear: clear,
    clearAll: clearAll
  };
})();