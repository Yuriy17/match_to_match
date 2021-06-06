import 'registration.scss';
import { Elements } from '../../models/elements-model';
import { createElement } from '../../utils/utils';
import BaseComponent from '../base-component';

export default class Registration extends BaseComponent {
  private elements:Elements = {};

  constructor() {
    super('div', ['modal'], [['id', 'jsModalForm']]);
    this.elements = this.createElements();
  }

  createElements = ():Elements => {
    const overlay = createElement('div', ['modal__overlay', 'jsOverlay']);
    const container = createElement('div', ['modal__container']);
    const content = createElement('div', ['modal__content']);
    const form = createElement('form', ['modal__form']);
    const title = createElement('span', ['modal__title']);
    const block = createElement('div', ['modal__form-block']);
    const buttonSend = createElement('button', ['jsModalClose', 'button', 'modal__button']);
    const buttonClose = createElement('button', ['modal__close', 'modal__close']);

    buttonClose.innerText = '&#10005;';
    form.append(title, block, buttonSend);
    content.append(form);
    container.append(content, buttonClose);

    this.element.append(overlay, container);
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

    return {
      overlay,
      container,
      content,
      form,
      title,
      block,
      buttonSend,
      buttonClose,
    };
  };
}
