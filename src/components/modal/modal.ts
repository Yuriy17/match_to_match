import { Modal as BootstrapModal } from 'bootstrap';
import { createElement } from '../../utils/utils';
import BaseComponent from '../base-component';
import './modal.scss';

export default class Modal extends BaseComponent {
  readonly jsModal;

  // public footer:HTMLElement;

  // public header:HTMLElement;

  // public body:HTMLElement;

  public readonly button: HTMLElement;

  constructor(properties: {
    id: string,
    body: {
      elements: Array<HTMLElement>,
    },
    header?: {
      title: string,
    },
    footer?: {
      isCenter: boolean,
      elements: Array<HTMLElement>,
    },
    isLink?: boolean,
    isForm?: boolean

  }) {
    super('div', ['modal', 'fade'],
      [
        ['id', properties.id],
        ['data-bs-keyboard', 'false'],
        ['tabindex', '-1'],
        ['aria-labelledby', 'modalLabel'],
        ['aria-hidden', 'true'],
      ]);

    this.element.append(this.createModal(
      properties.header, properties.body, properties.footer, properties.isForm,
    ));
    this.jsModal = new BootstrapModal(this.element);
  }

  createModal = (header: { title: string }, body: { elements: Array<HTMLElement> },
    footer: { isCenter: boolean, elements: Array<HTMLElement> }, isForm:boolean):HTMLElement => {
    const modalDialog = createElement('div',
      ['modal-dialog', 'modal-lg', 'modal-dialog-centered', 'modal-dialog-scrollable']);
    const modalContent = isForm ? createElement('form', ['modal-content'], [['novalidate', '']])
      : createElement('div', ['modal-content']);

    modalContent.append(
      this.addHeader(header.title),
      this.addBody(body.elements),
      this.addFooter(footer.elements, footer.isCenter),
    );
    modalDialog.append(modalContent);

    return modalDialog;
  };

  addHeader = (title: string):HTMLElement => {
    const header = createElement('div', ['modal-header']);
    const buttonClose = createElement('button',
      ['btn-close'],
      [
        ['type', 'button'],
        ['data-bs-dismiss', 'modal'],
        ['aria-label', 'Close'],
      ]);

    const modalTitle = createElement('div', ['modal-title']);
    modalTitle.innerText = title;
    header.append(modalTitle, buttonClose);
    return header;
  };

  addBody = (elements: Array<HTMLElement>):HTMLElement => {
    const body = createElement('div', ['modal-body', 'row']);
    body.append(...elements);
    return body;
  };

  addFooter = (elements: Array<HTMLElement>, isCenter?: boolean):HTMLElement => {
    const footer = isCenter ? createElement('div', ['modal-footer', 'justify-content-center'])
      : createElement('div', ['modal-footer']);
    footer.append(...elements);
    return footer;
  };
}
