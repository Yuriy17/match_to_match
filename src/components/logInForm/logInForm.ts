import { ModalConfig } from '../../models/elements-model';
import { PersonFields } from '../../models/person-model';
import {
  BootstrapType, patterns, Popups, State
} from '../../utils/constant';
import { createElement } from '../../utils/utils';
import BootstrapComponent from '../bootstrap-component/bootstrap-component';
import InfoPopup from '../info-popup/infoPopup';
import Modal from '../modal/modal';

export default class LogInForm {
  readonly element: HTMLElement;

  readonly logInId: string = 'login';

  readonly modal: Modal;

  readonly modalForm: HTMLElement;

  private logInEmailElement: HTMLInputElement;

  successPopup: InfoPopup;

  constructor(
    private getPerson: (
      email: string,
      successCallback: (personFields: PersonFields) => void,
      errorCallback: () => void
    ) => void,
    private changeEntryState: (state: string) => void,
    public setCurrentPerson: (props: PersonFields) => void,
  ) {
    this.modal = new Modal(this.createLogInModal());
    this.modalForm = this.modal?.modalContent;

    this.addLogInFormValidation();

    this.successPopup = new InfoPopup(
      Popups.success,
      'Success! You are logged in!',
    );
    this.addLogInFormValidation();
  }

  getExample = ():Node => this.modalForm.cloneNode(true);

  addLogInFormValidation = (): void => {
    const { modal: logInModal, modalForm: logInModalForm, successPopup } = this;
    logInModalForm.onsubmit = (event: Event): boolean => {
      const email = this.logInEmailElement.value;

      if (!(<HTMLFormElement>logInModalForm).checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else if (email.length) {
        this.getPerson(
          email,
          (result: PersonFields) => {
            this.setCurrentPerson(result);
            this.changeEntryState(State.loggedIn);
            logInModal.jsModal.hide();
            successPopup.modal.jsModal.show();
          },
          () => {
            const rowMessage = this.modalForm.querySelector('.row-message');
            if (!rowMessage) {
              const container = this.modalForm.querySelector(
                '.modal-body > .container',
              );
              const row = createElement('div', ['row', 'row-message']);
              const errorText = createElement('span', ['invalid-feedback']);

              errorText.innerText = "Ooops, we couldn't find you ಠ~ಠ, check your password or try register again";
              row.append(errorText);
              container.append(row);
            }
          },
        );
      }

      logInModalForm.classList.add('was-validated');
      return false;
    };
  };

  createLogInModal = (): ModalConfig => {
    const buttonSubmit = createElement(
      'button',
      ['btn-primary', 'btn'],
      [['type', 'submit']],
    );
    const buttonCancel = createElement(
      'button',
      ['btn-secondary', 'btn'],
      [
        ['type', 'button'],
        ['data-bs-dismiss', 'modal'],
      ],
    );

    const inputEmail = new BootstrapComponent({
      type: BootstrapType.input,
      typeInput: 'email',
      classes: ['input-email'],
      id: 'inputEmail',
      placeholder: 'E-mail',
      floatLabel: 'E-mail',
      isRequired: true,
      invalid: 'enter email in format test@test.com',
      pattern: patterns.email.toString(),
    });
    this.logInEmailElement = <HTMLInputElement>inputEmail.targetElement;

    buttonCancel.innerText = 'cancel';
    buttonSubmit.innerText = 'login';

    return {
      id: this.logInId,
      body: {
        elements: [inputEmail.element],
      },
      header: {
        title: 'Logging in',
      },
      footer: {
        isSpaceBetween: false,
        elements: [buttonCancel, buttonSubmit],
      },
      isForm: true,
      size: 'sm',
    };
  };
}
