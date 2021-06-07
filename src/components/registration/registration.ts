// import '@popperjs/core/dist/umd/popper.min';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import Popper from '@popperjs/core';
// import { createPopperLite as createPopper } from '@popperjs/core';
import { Modal } from 'bootstrap';
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
    const modalDialog = createElement('div', ['modal-dialog']);
    const modalContent = createElement('div', ['modal-content']);
    const modalHeader = createElement('div', ['modal-header']);
    const modalTitle = createElement('div', ['modal-title']);
    const modalBody = createElement('div', ['modal-body']);
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
        ['type', 'button'],
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
      classes: ['input-name'],
      id: 'inputName',
      placeholder: 'First Name',
      floatLabel: 'First Name',
    });
    const inputSurname = new BootstrapComponent({
      type: BootstrapType.input,
      typeInput: 'text',
      classes: ['input-surname'],
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
    modalTitle.innerText = 'Register new Player';
    modalHeader.append(modalTitle, buttonClose);
    modalBody.append(inputName.element, inputSurname.element, inputEmail.element);
    modalFooter.append(buttonCancel, buttonSubmit);
    modalContent.append(modalHeader, modalBody, modalFooter);
    modalDialog.append(modalContent);
    // const form = `
    // <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
    //   data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    //   <div class="modal-dialog">
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
    //         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //       </div>
    //       <div class="modal-body">
    //         ...
    //       </div>
    //       <div class="modal-footer">
    //         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //         <button type="button" class="btn btn-primary">Understood</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>`;

    // buttonClose.innerText = '&#10005;';
    // form.append(title, block, buttonSend);
    // content.append(form);
    // container.append(content, buttonClose);

    // this.element.append(overlay, container);
    // this.element.innerHTML = `
    // <div class="modal__overlay jsOverlay"></div>
    // <div class="modal__container">
    //   <div class="modal__content">
    //     <form class="modal__form">
    //       <span class="modal__title">ОТправить запрос</span>
    //       <div class="modal__form-block">
    //         <input type="text" class="modal__input modal__input_name" placeholder="Иван Васильевич" required>
    //         <input type="tel" class="modal__input modal__input_surname" placeholder="Телефон" required>
    //         <input type="email" class="modal__input modal__input_email" placeholder="E-mail" required>
    //       </div>
    //       <a href="#jsModalThanks" class="jsModalClose jsModalTrigger button modal__button">отправить</a>
    //       <!-- <button class="button modal__button">отправить</button> -->
    //     </form>
    //   </div>
    //   <button class="modal__close jsModalClose">&#10005;</button>
    // </div>
    // `;

    return modalDialog;
  };
}
