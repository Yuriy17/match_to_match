// import '@popperjs/core/dist/umd/popper.min';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import Popper from '@popperjs/core';
// import { createPopperLite as createPopper } from '@popperjs/core';
import { BootstrapType } from '../../utils/constant';
import { createElement } from '../../utils/utils';
import BootstrapComponent from '../bootstrap-component/bootstrap-component';
import Modal from '../modal/modal';
import './registration.scss';

export default class Registration {
  readonly modal;

  readonly loginButton: HTMLElement;

  constructor() {
    this.modal = new Modal(this.createModal());
  }

  // static initModal() {
  //   Array.from(document.querySelectorAll('.modal'))
  //     .forEach((modalNode) => new Modal(modalNode));
  // }

  createModal = ():HTMLElement => {
    const col1 = createElement('div', ['col-12', 'col-md-6']);
    const col2 = createElement('div', ['col-12', 'col-md-6']);
    const buttonSubmit = createElement('button',
      ['btn-primary', 'btn'],
      [
        ['type', 'submit'],
      ]);
    const buttonCancel = createElement('button',
      ['btn-secondary', 'btn'],
      [
        ['type', 'button'],
        ['data-bs-dismiss', 'modal'],
      ]);
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
    const avatarImageLabel = createElement('label', ['avatar__image'], [['for', 'avatarImage']]);
    const avatarImage = createElement('img', [], [
      ['src', 'images/avatar.png'],
      ['alt', 'avatar placeholder'],
    ]);
    const avatarImageHover = createElement('img', ['avatar__hover'], [
      ['src', 'images/avatar-hover.png'],
      ['alt', 'avatar placeholder hover'],
    ]);
    avatarImageLabel.append(avatarImage);
    avatarBox.append(avatarImageLabel, avatarImageHover);
    avatar.append(avatarBox);

    buttonCancel.innerText = 'cancel';
    buttonSubmit.innerText = 'submit';

    col1.append(inputName.element, inputSurname.element, inputEmail.element);
    col2.append(avatar);

    return {
      id: 'registration',
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
      isLink: true,
      isForm: true,
    };
  };
}
