import { Modal } from 'bootstrap';
// import '@popperjs/core/dist/umd/popper.min';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import Popper from '@popperjs/core';
// import { createPopperLite as createPopper } from '@popperjs/core';
import { BootstrapType } from '../../utils/constant';
import { createElement } from '../../utils/utils';
import BaseComponent from '../base-component';
import BootstrapComponent from '../bootstrap-component/bootstrap-component';
import './registration.scss';

export default class Registration extends BaseComponent {
  readonly jsModal;

  constructor() {
    super('div', ['modal', 'fade'],
      [
        ['id', 'staticBackdrop'],
        ['data-bs-backdrop', 'static'],
        ['data-bs-keyboard', 'false'],
        ['tabindex', '-1'],
        ['aria-labelledby', 'staticBackdropLabel'],
        ['aria-hidden', 'true'],
      ]);
    this.element.append(this.createModal());
    this.jsModal = new Modal(this.element);
  }

  // static initModal() {
  //   Array.from(document.querySelectorAll('.modal'))
  //     .forEach((modalNode) => new Modal(modalNode));
  // }

  createModal = ():HTMLElement => {
    const modalDialog = createElement('div',
      ['modal-dialog', 'modal-lg', 'modal-dialog-centered', 'modal-dialog-scrollable']);
    const modalContent = createElement('form', ['modal-content']);
    const modalHeader = createElement('div', ['modal-header']);
    const modalTitle = createElement('div', ['modal-title']);
    const modalBody = createElement('div', ['modal-body', 'row']);
    const col1 = createElement('div', ['col-12', 'col-md-6']);
    const col2 = createElement('div', ['col-12', 'col-md-6']);
    const modalFooter = createElement('div', ['modal-footer']);
    const buttonClose = createElement('button',
      ['btn-close'],
      [
        ['type', 'button'],
        ['data-bs-dismiss', 'modal'],
        ['aria-label', 'Close'],
      ]);
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
    modalTitle.innerText = 'Register new Player';
    modalHeader.append(modalTitle, buttonClose);
    col1.append(inputName.element, inputSurname.element, inputEmail.element);
    col2.append(avatar);
    modalBody.append(col1, col2);
    modalFooter.append(buttonCancel, buttonSubmit);
    modalContent.append(modalHeader, modalBody, modalFooter);
    modalDialog.append(modalContent);

    return modalDialog;
  };
}
