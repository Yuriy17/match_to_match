import { EntryButtons } from '../../models/elements-model';
import { Icons } from '../../utils/constant';
import { createElement } from '../../utils/utils';
import BaseComponent from '../base-component';
import './header.scss';

export default class Header extends BaseComponent {
  logButtons: EntryButtons;

  constructor(private controlContainer: HTMLElement, private nav: HTMLElement) {
    super('header', ['header']);
  }

  initLayout = (): void => {
    const logoIcon = createElement('i', ['fa', Icons.faWarehouse]);
    const logo = createElement(
      'a',
      ['spa-link', 'logo'],
      [['href', '/']],
    );
    const logoBlock = createElement(
      'div',
      ['header__item'],
    );
    const headerContainer = createElement('div', ['header__container']);

    logo.append(logoIcon);
    logoBlock.append(logo);
    headerContainer.append(logoBlock, this.nav, this.controlContainer);
    this.element.append(headerContainer);
  };
}
