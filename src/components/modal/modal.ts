import { Modal as BootstrapModal } from 'bootstrap';
import { ModalConfig } from '../../models/elements-model';
import { createElement } from '../../utils/utils';
import BaseComponent from '../base-component';
import './modal.scss';

export default class Modal extends BaseComponent {
  readonly jsModal;

  modalContent: HTMLElement;

  public readonly button: HTMLElement;

  constructor(properties: ModalConfig) {
    super(
      'div',
      ['modal', 'fade'],
      [
        ['id', properties.id || 'temporaryId'],
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
        properties.isForm || false,
        properties.size || 'lg',
        properties.footer || null,
        properties.id || '',
      ),
    );
    this.element.append(modalFragment);
    this.jsModal = properties.isExample ? null : new BootstrapModal(this.element);
  }

  createModal = (
    header: { title: string },
    body: { elements: Array<HTMLElement> },
    isForm: boolean,
    size: string,
    footer?: { isSpaceBetween: boolean; elements: Array<HTMLElement> },
    id?: string,
  ): HTMLElement => {
    const modalDialog = createElement('div', [
      'modal-dialog',
      `modal-${size}`,
      'modal-dialog-centered',
      'modal-dialog-scrollable',
    ]);

    this.modalContent = isForm
      ? createElement(
        'form',
        ['modal-content', 'needs-validation'],
        [
          ['novalidate', ''],
          ['id', `${id}Form` || ''],
        ],
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
    const body = createElement('div', ['modal-body']);
    const container = createElement('div', ['container']);
    const row = createElement('div', ['row']);
    row.append(...elements);
    container.append(row);
    body.append(container);
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
