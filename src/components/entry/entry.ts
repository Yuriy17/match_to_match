import { EntryButtons } from '../../models/elements-model';
import { PersonFields } from '../../models/person-model';
/* eslint-disable no-control-regex */
import { State } from '../../utils/constant';
import { createElement } from '../../utils/utils';
import LogInForm from '../logInForm/logInForm';
import RegForm from '../regForm/regForm';
import './entry.scss';

export default class Entry {
  readonly element: HTMLElement;

  readonly logInId: string = 'login';

  readonly regId: string = 'registration';

  avatarImage: HTMLImageElement;

  avatarLabel: HTMLElement;

  oFReader: FileReader;

  regForm: RegForm;

  logInForm: LogInForm;

  buttonElements: EntryButtons;

  constructor(
    addPerson: (
      personFields: PersonFields,
      successCallback: (personFields: PersonFields) => void,
      errorCallback: () => void
    ) => void,
    getPerson: (
      email: string,
      successCallback: (personFields: PersonFields) => void,
      errorCallback: () => void
    ) => void,
    changeEntryState: (state: string) => void,
    public setCurrentPerson: (props: PersonFields) => void,
  ) {
    const logOutButton = createElement('button', ['auth-button']);
    logOutButton.innerText = 'log out';
    logOutButton.addEventListener('click', () => changeEntryState(State.loggedOut));
    this.buttonElements = {
      regButton: this.createLink(this.regId, 'register new player'),
      logInButton: this.createLink(this.logInId, 'log in'),
      logOutButton,
    };

    this.regForm = new RegForm(addPerson, changeEntryState, setCurrentPerson);
    this.logInForm = new LogInForm(
      getPerson,
      changeEntryState,
      setCurrentPerson,
    );
  }

  // validate = (
  //   input: HTMLElement,
  //   regex: RegExp,
  //   errorMessage: string,
  // ): void => {};

  createLink = (id: string, text: string): HTMLElement => {
    const link = createElement(
      'button',
      ['auth-button', 'btn'],
      [
        ['data-bs-toggle', 'modal'],
        ['data-bs-target', `#${id}`],
      ],
    );
    link.innerText = text;
    return link;
  };

  // successPopup = (text = 'success!'): Modal => {
  //   const iconElement = createElement('i', ['fa', 'fa-check']);
  //   const textElement = createElement('p', ['modal-text']);
  //   textElement.innerText = `${text}`;
  //   const containerElement = createElement('div', ['modal-container']);
  //   containerElement.append(iconElement, textElement);
  //   return new Modal({
  //     id: 'successPopup',
  //     body: {
  //       elements: [containerElement],
  //     },
  //     header: {
  //       title: 'Success',
  //     },
  //   });
  // };
}
