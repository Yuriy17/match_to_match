import { Icons, Popups } from '../../utils/constant';
import { createElement } from '../../utils/utils';
import Modal from '../modal/modal';

export default class InfoPopup {
  modal: Modal;

  constructor(public typePopup: string, public text: string) {
    this.init();
  }

  init = (): void => {
    switch (this.typePopup) {
      case Popups.success:
        this.modal = this.createPopup(Icons.faCheck);
        break;
      case Popups.error:
        this.modal = this.createPopup(Icons.faExclamationTriangle);
        break;
      case Popups.info:
        this.modal = this.createPopup(Icons.faInfoCircle);
        break;
      default:
        break;
    }
  };

  createPopup = (icon: string): Modal => {
    const iconElement = createElement('i', ['fa', icon]);
    const textElement = createElement('p', ['modal-text']);
    textElement.innerText = `${this.text}`;
    const containerElement = createElement('div', ['modal-container']);
    containerElement.append(iconElement, textElement);
    return new Modal({
      id: `${this.typePopup}Popup`,
      body: {
        elements: [containerElement],
      },
      header: {
        title: this.typePopup,
      },
    });
  };
}
