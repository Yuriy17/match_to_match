import { Modal as BootstrapModal } from 'bootstrap';
import { ModalConfig } from '../../models/elements-model';
import { createElement } from '../../utils/utils';
import BaseComponent from '../base-component';
import './modal.scss';

export default class Modal extends BaseComponent {
  readonly jsModal;

  modalContent: HTMLElement;

  // public footer:HTMLElement;

  // public header:HTMLElement;

  // public body:HTMLElement;

  public readonly button: HTMLElement;

  constructor(properties: ModalConfig) {
    super(
      'div',
      ['modal', 'fade'],
      [
        ['id', properties.id ? properties.id : 'temporaryId'],
        ['data-bs-keyboard', 'false'],
        ['tabindex', '-1'],
        ['aria-labelledby', 'modalLabel'],
        ['aria-hidden', 'true'],
      ],
    );
    const modalFragment = document.createDocumentFragment();
    modalFragment.append(
      this.createModal(
        properties.header,
        properties.body,
        properties.isForm ? properties.isForm : false,
        properties.footer ? properties.footer : null,
      ),
    );
    this.element.append(modalFragment);
    this.jsModal = new BootstrapModal(this.element);
  }

  createModal = (
    header: { title: string },
    body: { elements: Array<HTMLElement> },
    isForm: boolean,
    footer?: { isSpaceBetween: boolean; elements: Array<HTMLElement> },
  ): HTMLElement => {
    const modalDialog = createElement('div', [
      'modal-dialog',
      'modal-lg',
      'modal-dialog-centered',
      'modal-dialog-scrollable',
    ]);

    this.modalContent = isForm
      ? createElement(
        'form',
        ['modal-content', 'needs-validation'],
        [['novalidate', '']],
      )
      : createElement('div', ['modal-content']);

    this.modalContent.append(
      this.addHeader(header.title),
      this.addBody(body.elements),
      footer ? this.addFooter(footer.elements, footer.isSpaceBetween) : '',
    );
    modalDialog.append(this.modalContent);

    return modalDialog;
  };

  addHeader = (title: string): HTMLElement => {
    const header = createElement('div', ['modal-header']);
    const buttonClose = createElement(
      'button',
      ['btn-close'],
      [
        ['type', 'button'],
        ['data-bs-dismiss', 'modal'],
        ['aria-label', 'Close'],
      ],
    );

    const modalTitle = createElement('div', ['modal-title']);
    modalTitle.innerText = title;
    header.append(modalTitle, buttonClose);
    return header;
  };

  addBody = (elements: Array<HTMLElement>): HTMLElement => {
    const body = createElement('div', ['modal-body', 'row']);
    body.append(...elements);
    return body;
  };

  addFooter = (
    elements: Array<HTMLElement>,
    isSpaceBetween?: boolean,
  ): HTMLElement => {
    const footer = isSpaceBetween
      ? createElement('div', ['modal-footer', 'justify-space-between'])
      : createElement('div', ['modal-footer']);
    footer.append(...elements);
    return footer;
  };
}
