/* eslint-disable no-control-regex */

import { BootstrapType } from '../../utils/constant';
import { createElement } from '../../utils/utils';
import BootstrapComponent from '../bootstrap-component/bootstrap-component';
import Modal from '../modal/modal';
import './registration.scss';

const patterns = {
  username: /^[a-zA-Z0-9][^0-9]([._-](?![._-])|[a-zA-Z0-9]){3,25}[a-zA-Z0-9][^~!@#$%*()_—+=|:;"'`<>,.?/^\0-\cZ]+$/i,
  surname: /^[a-zA-Z0-9][^0-9]([._-](?![._-])|[a-zA-Z0-9]){3,25}[a-zA-Z0-9][^~!@#$%*()_—+=|:;"'`<>,.?/^\0-\cZ]+$/i,
  // eslint-disable-next-line max-len
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
};

export default class Registration {
  readonly modal: Modal;

  readonly button: HTMLElement;

  readonly element: HTMLElement;

  readonly id: string = 'registration';

  constructor() {
    this.modal = new Modal(this.createModal());
    this.element = this.modal.element;
    this.button = this.createLink(this.id);
  }

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
    const avatarBox = createElement('div', ['avatar__box']);
    const avatarImageLabel = createElement(
      'label',
      ['avatar__image'],
      [['for', 'avatarImage']],
    );
    const avatarImage = createElement(
      'img',
      [],
      [
        ['src', 'images/avatar.png'],
        ['alt', 'avatar placeholder'],
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
    avatarImageLabel.append(avatarImage);
    avatarBox.append(avatarImageLabel, avatarImageHover);
    avatar.append(avatarBox);

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
}
