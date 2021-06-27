import Registration from './registration/registration';

function idbOK() {
  return 'indexedDB' in window
  && !/iPad|iPhone|iPod/.test(navigator.platform);
}

export default class CreateDatabase {
  private openRequest:IDBOpenDBRequest;

  db: IDBDatabase;

  peopleOS:IDBObjectStore;

  constructor(private registration: Registration) {
    this.init();
  }

  init():void {
    // No support? Go in the corner and pout.
    if (!idbOK()) return;

    this.openRequest = window.indexedDB.open('register', 1);

    this.openRequest.onupgradeneeded = this.onupgradeneeded;

    this.openRequest.onsuccess = this.onsuccess;

    // eslint-disable-next-line no-console
    this.openRequest.onerror = (e) => console.dir(e);
    this.formValidation();
  }

  onupgradeneeded = (e:Event):void => {
    const request = <IDBRequest>e.target;
    const thisDB = request.result;
    console.log('running onupgradeneeded');

    if (!thisDB.objectStoreNames.contains('people')) {
      this.peopleOS = thisDB.createObjectStore('people',
        { keyPath: 'email' });
    }
  };

  onsuccess = (e:Event):void => {
    console.log('running onsuccess');
    const request = <IDBRequest>e.target;
    this.db = request.result;

    // Start listening for button clicks
    // $('#addPerson').on('click', this.addPerson);
  };

  addPerson = (email:string, surname:string, name:string):void => {
    const { photo, avatarLabel } = this.registration;

    console.log(`About to add ${name}/${email}/${surname}/${photo}`);

    // Get a transaction
    // default for OS list is all, default for type is read
    const transaction = this.db.transaction(['people'], 'readwrite');
    // Ask for the objectStore
    const store = transaction.objectStore('people');

    // Define a person
    const person = {
      photo: avatarLabel.classList.contains('loaded') ? photo : undefined,
      name,
      surname,
      email,
      created: new Date().getTime(),
    };

    // Perform the add
    const request = store.add(person);

    request.onerror = (e:Event):void => {
      const req = <IDBRequest>e.target;
      console.log('Error', req.error.name);
      // some type of error handler
    };

    request.onsuccess = ():void => {
      console.log('Woot! Did it');
    };
  };

  getPerson = ():void => {
    const key = $('#getemail').val();
    if (key === '') return;

    const transaction = this.db.transaction(['people'], 'readonly');
    const store = transaction.objectStore('people');

    const request = store.get(key);

    request.onsuccess = (event:Event):void => {
      const req = <IDBRequest>event.target;
      console.dir(req.result);
    };

    request.onerror = (event:Event):void => {
      console.log('Error');
      const req = <IDBRequest>event.target;
      console.dir(req.result);
    };
  };

  updatePerson = ():void => {
    const name = $('#name').val();
    const email = $('#email').val();
    const created = $('#created').val();

    console.log(`About to update ${name}/${email}`);

    // Get a transaction
    // default for OS list is all, default for type is read
    const transaction = this.db.transaction(['people'], 'readwrite');
    // Ask for the objectStore
    const store = transaction.objectStore('people');

    const person = {
      name,
      email,
      created,
    };

    // Perform the update
    const request = store.put(person);

    request.onerror = (event:Event):void => {
      const req = <IDBRequest>event.target;
      console.log('Error', req.error.name);
    // some type of error handler
    };

    request.onsuccess = ():void => {
      console.log('Woot! Did it');
    };
  }
  ;

  deletePerson = ():void => {
    const key = $('#email').val();
    if (key === '') return;

    const transaction = this.db.transaction(['people'], 'readwrite');
    const store = transaction.objectStore('people');

    const request = store.delete(key);

    request.onsuccess = (event:Event) => {
      console.log('Person deleted');
      console.dir(event);
    };

    request.onerror = (event:Event) => {
      console.log('Error');
      console.dir(event);
    };
  };

  formValidation = ():void => {
    const { modalForm } = this.registration;
    modalForm.onsubmit = (event:Event):boolean => {
      const {
        email, surname, name,
      } = this.registration;
      // console.log(this.registration.name);
      console.log((<HTMLFormElement>modalForm).checkValidity());

      if (!(<HTMLFormElement> modalForm).checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else if (email.length && surname.length && name.length) {
        // console.log(`email = ${email}`);
        // console.log(`surname = ${surname}`);
        // console.log(`name = ${name}`);
        // console.log(`oFReader = ${oFReader?.result} photo = ${photo}`);

        // console.log(`email = ${email}`);
        // console.log(`surname = ${surname}`);
        // console.log(`name = ${name}`);
        this.addPerson(email, surname, name);
      }

      modalForm.classList.add('was-validated');
      return false;
    };
  };
}
