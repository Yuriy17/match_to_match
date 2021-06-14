/* eslint-disable no-control-regex */
import { BootstrapType } from '../../utils/constant';
import { createElement, createImageElement } from '../../utils/utils';
import BootstrapComponent from '../bootstrap-component/bootstrap-component';
import Modal from '../modal/modal';
import './registration.scss';

const patterns = {
  username: /^[a-zA-Z0-9][^0-9]([._-](?![._-])|[a-zA-Z0-9]){3,25}[a-zA-Z0-9][^~!@#$%*()_—+=|:;"'`<>,.?/^\0-\cZ]+$/i,
  surname: /^[a-zA-Z0-9][^0-9]([._-](?![._-])|[a-zA-Z0-9]){3,25}[a-zA-Z0-9][^~!@#$%*()_—+=|:;"'`<>,.?/^\0-\cZ]+$/i,
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

export default class Registration {
  readonly modal: Modal;

  readonly modalForm: HTMLElement;

  readonly button: HTMLElement;

  readonly element: HTMLElement;

  readonly id: string = 'registration';

  avatarImage: HTMLImageElement;

  avatarLabel:HTMLElement;

  oFReader: FileReader;

  constructor() {
    this.modal = new Modal(this.createModal());
    this.modalForm = this.modal.modalContent;
    this.formValidation();
    this.element = this.modal.element;
    this.button = this.createLink(this.id);
  }

  formValidation = () => {
    this.modalForm.addEventListener('submit', (event:Event) => {
      if (!(<HTMLFormElement> this.modalForm).checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.modalForm.classList.add('was-validated');
      // return false;
    }, false);
  };

  validate = (input: HTMLElement, regex: RegExp, errorMessage: string) => {

  };

  createModal = (): {
    id: string;
    body: {
      elements: Array<HTMLElement>;
    };
    header?: {
      title: string;
    };
    footer?: {
      isCenter: boolean;
      elements: Array<HTMLElement>;
    };
    isLink?: boolean;
    isForm?: boolean;
  } => {
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
      classes: ['input-name', 'mb-3'],
      id: 'inputName',
      placeholder: 'First Name',
      floatLabel: 'First Name',
      isRequired: true,
      invalid: `enter First Name(- Имя не может быть пустым.
        - Имя не может состоять из цифр.
        - Имя не может содержать служебные символы (~ ! @ # $ % * () _ — + = | : ; " ' \` < > , . ? / ^).)`,
    });
    const inputSurname = new BootstrapComponent({
      type: BootstrapType.input,
      typeInput: 'text',
      classes: ['input-surname', 'mb-3'],
      id: 'inputSurname',
      placeholder: 'Last Name',
      floatLabel: 'Last Name',
    });
    const inputEmail = new BootstrapComponent({
      type: BootstrapType.input,
      typeInput: 'email',
      classes: ['input-email'],
      id: 'inputEmail',
      placeholder: 'E-mail',
      floatLabel: 'E-mail',
    });
    const avatar = createElement('div', ['avatar']);
    this.avatarLabel = createElement('label',
      ['avatar__label'],
      [['for', 'avatar_file']]);
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
          console.log(1);

          clearInputFile(fileInput);
          this.avatarLabel.classList.remove('loaded');
        });
      }
    }
    this.avatarLabel.append(this.avatarImage, avatarDefaultImage, avatarImageHover);
    avatar.append(this.avatarLabel, avatarTrashIcon, fileInput);

    buttonCancel.innerText = 'cancel';
    buttonSubmit.innerText = 'submit';

    col1.append(inputName.element, inputSurname.element, inputEmail.element);
    col2.append(avatar);

    return {
      id: this.id,
      body: {
        elements: [col1, col2],
      },
      header: {
        title: 'Register new Player',
      },
      footer: {
        isCenter: false,
        elements: [buttonCancel, buttonSubmit],
      },
      isForm: true,
    };
  };

  createLink = (id: string): HTMLElement => {
    const link = createElement(
      'button',
      ['auth-button'],
      [
        ['data-bs-toggle', 'modal'],
        ['data-bs-target', `#${id}`],
      ],
    );
    link.innerText = 'register new player';
    return link;
  };

  previewListener = (e: Event):void => {
    const uploadInput = <HTMLInputElement>e.currentTarget;

    if (this.avatarLabel && this.avatarImage) {
      this.oFReader = new FileReader();
      this.oFReader.readAsDataURL(uploadInput.files[0]);

      this.oFReader.onload = (oFREvent) => {
        this.avatarLabel.classList.add('loaded');
        if (typeof oFREvent.target.result === 'string') {
          this.avatarImage.src = oFREvent.target.result;
        }
      };
    }
  };
}
