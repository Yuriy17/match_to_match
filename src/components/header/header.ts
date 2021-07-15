import { EntryButtons } from '../../models/elements-model';
import { createElement } from '../../utils/utils';
import BaseComponent from '../base-component';
import './header.scss';

export default class Header extends BaseComponent {
  logButtons: EntryButtons;

  constructor(private controlContainer: HTMLElement, private nav: HTMLElement) {
    super('header', ['header']);
  }

  initLayout = (): void => {
    const logoIcon = createElement('i', ['fa', 'fa-warehouse']);
    const logo = createElement(
      'a',
      ['spa-link', 'logo', 'header__item'],
      [['href', '/']],
    );
    const headerContainer = createElement('div', ['header__container']);

    logo.append(logoIcon);
    headerContainer.append(logo, this.nav, this.controlContainer);
    this.element.append(headerContainer);
  };
}
