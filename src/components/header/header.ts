import { EntryButtons } from '../../models/elements-model';
import { createElement } from '../../utils/utils';
import BaseComponent from '../base-component';
import './header.scss';

export default class Header extends BaseComponent {
  logButtons: EntryButtons;

  constructor(private controlContainer: HTMLElement) {
    super('header', ['header']);
  }

  initLayout = (): void => {
    const aboutLink = createElement(
      'a',
      ['spa-link', 'nav__link'],
      [['href', '/about']],
    );
    const scoreLink = createElement(
      'a',
      ['spa-link', 'nav__link'],
      [['href', '/score']],
    );
    const settingsLink = createElement(
      'a',
      ['spa-link', 'nav__link'],
      [['href', '/settings']],
    );
    const nav = createElement('nav', ['nav']);
    const logoIcon = createElement('i', ['fa', 'fa-warehouse']);
    const logo = createElement('a', ['spa-link', 'logo'], [['href', '/']]);
    const headerContainer = createElement('div', ['header__container']);
    const navAboutIcon = createElement('span', ['nav__icon']);
    const navSettingsIcon = createElement('span', ['nav__icon']);
    const navScoreIcon = createElement('span', ['nav__icon']);
    const navAboutText = createElement('span', ['nav__text']);
    const navSettingsText = createElement('span', ['nav__text']);
    const navScoreText = createElement('span', ['nav__text']);
    const scoreIcon = createElement('i', ['fa', 'fa-trophy']);
    const settingsIcon = createElement('i', ['fa', 'fa-cog']);
    const aboutIcon = createElement('i', ['fa', 'fa-question']);

    navAboutIcon.append(aboutIcon);
    navSettingsIcon.append(settingsIcon);
    navScoreIcon.append(scoreIcon);
    navAboutText.innerText = 'About';
    navSettingsText.innerText = 'Settings';
    navScoreText.innerText = 'Score';
    aboutLink.append(navAboutIcon, navAboutText);
    settingsLink.append(navSettingsIcon, navSettingsText);
    scoreLink.append(navScoreIcon, navScoreText);
    nav.append(aboutLink, settingsLink, scoreLink);
    logo.append(logoIcon);
    headerContainer.append(logo, nav, this.controlContainer);
    this.element.append(headerContainer);
  };
}
