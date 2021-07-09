import { EntryButtons, ModalConfig } from '../../models/elements-model';
import { PersonFields } from '../../models/person-model';
/* eslint-disable no-control-regex */
import { BootstrapType } from '../../utils/constant';
import { createElement, createImageElement } from '../../utils/utils';
import BootstrapComponent from '../bootstrap-component/bootstrap-component';
import Modal from '../modal/modal';
import './entry.scss';

/**
 * Resize a base 64 Image
 * @param {String} base64 - The base64 string (must include MIME type)
 * @param {Number} newWidth - The width of the image in pixels
 * @param {Number} newHeight - The height of the image in pixels
 */
const resizeBase64Img = (
  base64:string,
  newMinSize:number,
) => new Promise((resolve) => {
  const img = document.createElement('img');
  img.src = base64;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    let scale;
    if (img.width >= img.height) {
      scale = newMinSize / img.height;
    } else {
      scale = newMinSize / img.width;
    }
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    canvas.style.width = `${(img.width * scale).toString()}px`;
    canvas.style.height = `${(img.height * scale).toString()}px`;
    const context = canvas.getContext('2d');
    context.scale(scale, scale);

    context.drawImage(img, 0, 0);

    resolve(canvas.toDataURL());
  };
});
const patterns = {
  username: /^[a-zA-Z0-9][^0-9]([._-](?![._-])|[a-zA-Z0-9]){3,25}[a-zA-Z0-9][^~!@#$%*()_—+=|:;"'`<>,.?/^\0-\cZ]+$/,
  surname: /^[a-zA-Z0-9][^0-9]([._-](?![._-])|[a-zA-Z0-9]){3,25}[a-zA-Z0-9][^~!@#$%*()_—+=|:;"'`<>,.?/^\0-\cZ]+$/,
  // eslint-disable-next-line max-len
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
};
const clearInputFile = (f: any) => {
  if (f.value) {
    try {
      // eslint-disable-next-line no-param-reassign
      f.value = ''; // for IE11, latest Chrome/Firefox/Opera...
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    if (f.value) { // for IE5 ~ IE10
      const form = document.createElement('form');
      const { parentNode } = f; const
        ref = f.nextSibling;
      form.appendChild(f);
      form.reset();
      parentNode.insertBefore(f, ref);
    }
  }
};

export default class Entry {
  readonly element: HTMLElement;

  readonly logInId: string = 'login';

  readonly logInModal: Modal;

  readonly logInModalForm: HTMLElement;

  private logInEmailElement: HTMLInputElement;

  readonly regId: string = 'registration';

  readonly regModalForm: HTMLElement;

  readonly regModal: Modal;

  private regEmailElement: HTMLInputElement;

  private regSurnameElement: HTMLInputElement;

  private regNameElement: HTMLInputElement;

  avatarImage: HTMLImageElement;

  avatarLabel: HTMLElement;

  oFReader: FileReader;

  buttonElements: EntryButtons;

  constructor(
    private addPerson: (
      personFields: PersonFields,
      changeEntryState: (state: string) => void
    ) => void,
    private getPerson: (
      email: string,
      changeEntryState: (state: string) => void
    ) => void,
    private changeEntryState: (state: string) => void,
  ) {
    this.buttonElements = {
      regButton: this.createLink(this.regId, 'register new player'),
      logInButton: this.createLink(this.logInId, 'log in'),
      logOutButton: this.createLink('logOut', 'log out'),
    };

    this.regModal = new Modal(this.createRegModal());
    this.regModalForm = this.regModal?.modalContent;
    this.logInModal = new Modal(this.createLogInModal());
    this.logInModalForm = this.logInModal?.modalContent;

    this.addLogInFormValidation();
    this.addRegFormValidation();
  }

  // validate = (
  //   input: HTMLElement,
  //   regex: RegExp,
  //   errorMessage: string,
  // ): void => {};

  createRegModal = (): ModalConfig => {
    const col1 = createElement('div', ['col-12', 'col-md-6']);
    const col2 = createElement('div', ['col-12', 'col-md-6']);
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
    const inputName = new BootstrapComponent({
      type: BootstrapType.input,
      typeInput: 'text',
      classes: ['input-name', 'mb-2'],
      id: 'inputName',
      placeholder: 'First Name',
      floatLabel: 'First Name',
      isRequired: true,
      invalid:
        'enter without: whitespaces, only numbers, ~ ! @ # $ % * () _ — + = | : ; " \' ` < > , . ? / ^',
      pattern: patterns.username.toString(),
    });
    const inputSurname = new BootstrapComponent({
      type: BootstrapType.input,
      typeInput: 'text',
      classes: ['input-surname', 'mb-2'],
      id: 'inputSurname',
      placeholder: 'Last Name',
      floatLabel: 'Last Name',
      isRequired: true,
      invalid:
        'enter without: whitespaces, only numbers, ~ ! @ # $ % * () _ — + = | : ; " \' ` < > , . ? / ^',
      pattern: patterns.surname.toString(),
    });
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
    this.regEmailElement = <HTMLInputElement>inputEmail.targetElement;
    this.regSurnameElement = <HTMLInputElement>inputSurname.targetElement;
    this.regNameElement = <HTMLInputElement>inputName.targetElement;
    const avatar = createElement('div', ['avatar']);
    this.avatarLabel = createElement(
      'label',
      ['avatar__label'],
      [['for', 'avatar_file']],
    );
    this.avatarImage = createImageElement(
      'img',
      ['avatar__image'],
      [
        ['src', 'data:,'],
        ['alt', 'avatar placeholder'],
      ],
    );
    const avatarDefaultImage = createImageElement(
      'img',
      ['avatar__image_default'],
      [
        ['src', 'images/avatar.png'],
        ['alt', 'avatar placeholder default'],
      ],
    );
    const avatarImageHover = createElement(
      'img',
      ['avatar__hover'],
      [
        ['src', 'images/avatar-hover.png'],
        ['alt', 'avatar placeholder hover'],
      ],
    );
    const avatarTrashIcon = createElement(
      'img',
      ['avatar__preview-trash'],
      [
        ['src', 'images/ic_trash.svg'],
        ['alt', 'icon trash'],
      ],
    );
    const fileInput = createElement(
      'input',
      ['avatar__file'],
      [
        ['id', 'avatar_file'],
        ['name', 'avatar file'],
        ['type', 'file'],
        ['hidden', ''],
        ['accept', 'image/png, image/jpeg, image/jpg'],
      ],
    );
    if (fileInput) {
      fileInput.addEventListener('change', this.previewListener);
      if (avatarTrashIcon) {
        avatarTrashIcon.addEventListener('click', () => {
          clearInputFile(fileInput);
          this.avatarLabel.classList.remove('loaded');
        });
      }
    }
    const loadingIcon = createElement('i', [
      'fas',
      'fa-spinner',
      'fa-spin',
      'fa-5x',
    ]);
    this.avatarLabel.append(
      this.avatarImage,
      avatarDefaultImage,
      avatarImageHover,
      loadingIcon,
    );
    avatar.append(this.avatarLabel, avatarTrashIcon, fileInput);

    buttonCancel.innerText = 'cancel';
    buttonSubmit.innerText = 'register';

    col1.append(inputName.element, inputSurname.element, inputEmail.element);
    col2.append(avatar);

    return {
      id: this.regId,
      body: {
        elements: [col1, col2],
      },
      header: {
        title: 'Register new Player',
      },
      footer: {
        isSpaceBetween: false,
        elements: [buttonCancel, buttonSubmit],
      },
      isForm: true,
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

  previewListener = (e: Event): void => {
    const uploadInput = <HTMLInputElement>e.currentTarget;

    if (this.avatarLabel && this.avatarImage && uploadInput.value !== '') {
      this.oFReader = new FileReader();
      this.oFReader.readAsDataURL(uploadInput.files[0]);

      this.oFReader.onload = (oFREvent) => {
        if (typeof oFREvent.target.result === 'string') {
          if (uploadInput.files[0].size > 307200) {
            this.avatarLabel.classList.add('loading');
            resizeBase64Img(oFREvent.target.result, 307).then(
              (value: any): void | PromiseLike<void> => {
                this.avatarImage.src = value.toString();
                this.avatarLabel.classList.add('loaded');
                this.avatarLabel.classList.remove('loading');
              },
            );
          } else {
            this.avatarLabel.classList.add('loaded');
            this.avatarImage.src = oFREvent.target.result;
          }
        }
      };
    }
  };

  successPopup = (text = 'success!'): Modal => {
    const iconElement = createElement('i', ['fa', 'fa-check']);
    const textElement = createElement('p', ['modal-text']);
    textElement.innerText = `${text}`;
    const containerElement = createElement('div', ['modal-container']);
    containerElement.append(iconElement, textElement);
    return new Modal({
      id: 'successPopup',
      body: {
        elements: [containerElement],
      },
      header: {
        title: 'Success',
      },
    });
  };

  addRegFormValidation = (): void => {
    const { regModalForm, regModal, successPopup } = this;
    regModalForm.onsubmit = (event: Event): boolean => {
      const email = this.regEmailElement.value;
      const surname = this.regSurnameElement.value;
      const name = this.regNameElement.value;

      if (!(<HTMLFormElement>regModalForm).checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else if (email.length && surname.length && name.length) {
        this.addPerson(
          {
            email,
            surname,
            name,
            photo: this.avatarLabel.classList.contains('loaded')
              ? this.avatarImage.src
              : null,
            created: new Date().getTime(),
          },
          this.changeEntryState,
        );
        const modalS = successPopup('Success! You are registered!');
        regModal.jsModal.hide();
        modalS.jsModal.show();
      }

      regModalForm.classList.add('was-validated');
      return false;
    };
  };

  addLogInFormValidation = (): void => {
    const { logInModal, logInModalForm, successPopup } = this;
    logInModalForm.onsubmit = (event: Event): boolean => {
      const email = this.logInEmailElement.value;

      if (!(<HTMLFormElement>logInModalForm).checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else if (email.length) {
        this.getPerson(email, this.changeEntryState);
        const modalS = successPopup('Success! You are logged in!');
        logInModal.jsModal.hide();
        modalS.jsModal.show();
      }

      logInModalForm.classList.add('was-validated');
      return false;
    };
  };
}
