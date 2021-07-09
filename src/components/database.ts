import { PersonFields } from '../models/person-model';
import { State } from '../utils/constant';

function idbOK() {
  return 'indexedDB' in window
  && !/iPad|iPhone|iPod/.test(navigator.platform);
}

export default class CreateDatabase {
  private openRequest: IDBOpenDBRequest;

  db: IDBDatabase;

  peopleOS: IDBObjectStore;

  constructor(private setCurrentPerson: (props: PersonFields) => void) {
    this.init();
  }

  init(): void {
    // No support? Go in the corner and pout.
    if (!idbOK()) return;

    this.openRequest = window.indexedDB.open('register', 1);

    this.openRequest.onupgradeneeded = this.onupgradeneeded;

    this.openRequest.onsuccess = this.onsuccess;

    // eslint-disable-next-line no-console
    this.openRequest.onerror = (e) => console.dir(e);
  }

  onupgradeneeded = (e: Event): void => {
    const request = <IDBRequest>e.target;
    const thisDB = request.result;
    console.log('running onupgradeneeded');

    if (!thisDB.objectStoreNames.contains('people')) {
      this.peopleOS = thisDB.createObjectStore('people', { keyPath: 'email' });
    }
  };

  onsuccess = (e: Event): void => {
    console.log('running onsuccess');
    const request = <IDBRequest>e.target;
    this.db = request.result;

    // Start listening for button clicks
    // $('#addPerson').on('click', this.addPerson);
  };

  addPerson = (
    personFields: PersonFields,
    changeEntryState: (state: string) => void,
  ): void => {
    // console.log(`About to add ${name}/${email}/${surname}/${photo}`);

    // Get a transaction
    // default for OS list is all, default for type is read
    const transaction = this.db.transaction(['people'], 'readwrite');
    // Ask for the objectStore
    const store = transaction.objectStore('people');

    // Perform the add
    const request = store.add(personFields);

    request.onerror = (e: Event): void => {
      const req = <IDBRequest>e.target;
      console.log('Error', req.error.name);
      // some type of error handler
    };

    request.onsuccess = (): void => {
      changeEntryState(State.registered);
      console.log('Woot! Did it We are registered ( ͡° ͜ʖ ͡°)');

      this.setCurrentPerson(personFields);
    };
  };

  getPerson = (
    email: string,
    changeEntryState: (state: string) => void,
  ): void => {
    if (!email) return;

    const transaction = this.db.transaction(['people'], 'readonly');
    const store = transaction.objectStore('people');

    const request = store.get(email);

    request.onsuccess = (event: Event): void => {
      const req = <IDBRequest>event.target;
      console.log(`Yeah! Did it We are logged in ʕ•ᴥ•ʔ
        ${JSON.stringify(req.result)}
      `);
      this.setCurrentPerson(req.result);
      console.log(State.loggedIn);
      console.dir(changeEntryState);
      changeEntryState(State.loggedIn);
    };

    request.onerror = (event: Event): void => {
      console.log('Error');
      const req = <IDBRequest>event.target;
      console.dir(req.result);
    };
  };

  // updatePerson = (): void => {
  //   const name = $('#name').val();
  //   const email = $('#email').val();
  //   const created = $('#created').val();

  //   console.log(`About to update ${name}/${email}`);

  //   // Get a transaction
  //   // default for OS list is all, default for type is read
  //   const transaction = this.db.transaction(['people'], 'readwrite');
  //   // Ask for the objectStore
  //   const store = transaction.objectStore('people');

  //   const person = {
  //     name,
  //     email,
  //     created,
  //   };

  //   // Perform the update
  //   const request = store.put(person);

  //   request.onerror = (event: Event): void => {
  //     const req = <IDBRequest>event.target;
  //     console.log('Error', req.error.name);
  //     // some type of error handler
  //   };

  //   request.onsuccess = (): void => {
  //     console.log('Woot! Did it');
  //   };
  // };

  // deletePerson = (): void => {
  //   const key = $('#email').val();
  //   if (key === '') return;

  //   const transaction = this.db.transaction(['people'], 'readwrite');
  //   const store = transaction.objectStore('people');

  //   const request = store.delete(key);

  //   request.onsuccess = (event: Event) => {
  //     console.log('Person deleted');
  //     console.dir(event);
  //   };

  //   request.onerror = (event: Event) => {
  //     console.log('Error');
  //     console.dir(event);
  //   };
  // };
}
