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

    this.openRequest = window.indexedDB.open('register', 1);

    this.openRequest.onupgradeneeded = this.onupgradeneeded;

    this.openRequest.onsuccess = this.onsuccess;

    this.openRequest.onerror = function (e) {
      console.log('onerror!');
      console.dir(e);
    };
  }

  onsuccess = (e:Event) => {
    console.log('running onsuccess');
    db = e.target.result;

    // Start listening for button clicks
    $('#addPerson').on('click', this.addPerson);
  }
  ;

  onupgradeneeded = (e:Event) => {
    const thisDB = e.target.result;
    console.log('running onupgradeneeded');

    if (!thisDB.objectStoreNames.contains('people')) {
      const peopleOS = thisDB.createObjectStore('people',
        { keyPath: 'email' });
    }
  }
  ;

  addPerson = () => {
    const name = $('#name').val();
    const email = $('#email').val();

    console.log(`About to add ${name}/${email}`);

    // Get a transaction
    // default for OS list is all, default for type is read
    const transaction = db.transaction(['people'], 'readwrite');
    // Ask for the objectStore
    const store = transaction.objectStore('people');

    // Define a person
    const person = {
      name,
      email,
      created: new Date().getTime(),
    };

    // Perform the add
    const request = store.add(person);

    request.onerror = function (e) {
      console.log('Error', e.target.error.name);
      // some type of error handler
    };

    request.onsuccess = function (e) {
      console.log('Woot! Did it');
    };
  };
}
