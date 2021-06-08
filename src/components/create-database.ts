function idbOK() {
  return 'indexedDB' in window
  && !/iPad|iPhone|iPod/.test(navigator.platform);
}

export default class CreateDatabase {
  private openRequest:IDBOpenDBRequest;

  // constructor() {}

  init() {
    // No support? Go in the corner and pout.
    if (!idbOK()) return;

    this.openRequest = window.indexedDB.open('ora_idb1', 1);

    this.openRequest.onupgradeneeded = function (e) {
      console.log('running onupgradeneeded');
    };

    this.openRequest.onsuccess = function (e) {
      console.log('running onsuccess');
      // db = e.target.result;
    };

    this.openRequest.onerror = function (e) {
      console.log('onerror!');
      console.dir(e);
    };
  }
}
