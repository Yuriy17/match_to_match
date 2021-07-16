import { RouteLinks } from '../../models/elements-model';
import { Icons } from '../../utils/constant';
import { createElement } from '../../utils/utils';
import BaseComponent from '../base-component';

export default class HeaderNav extends BaseComponent {
  public routeLinks:RouteLinks = {
    aboutLink: HTMLElement,
    scoreLink: HTMLElement,
    settingsLink: HTMLElement,
  };

  constructor() {
    super('nav', ['nav', 'header__item']);
    this.routeLinks = {
      aboutLink: createElement(
        'a',
        ['spa-link', 'nav__link'],
        [['href', '/about']],
      ),
      scoreLink: createElement(
        'a',
        ['spa-link', 'nav__link'],
        [['href', '/score']],
      ),
      settingsLink: createElement(
        'a',
        ['spa-link', 'nav__link'],
        [['href', '/settings']],
      ),
    };
  }

  public init(): void {
    const { aboutLink, settingsLink, scoreLink } = this.routeLinks;
    const navAboutIcon = createElement('span', ['nav__icon']);
    const navSettingsIcon = createElement('span', ['nav__icon']);
    const navScoreIcon = createElement('span', ['nav__icon']);
    const navAboutText = createElement('span', ['nav__text']);
    const navSettingsText = createElement('span', ['nav__text']);
    const navScoreText = createElement('span', ['nav__text']);
    const scoreIcon = createElement('i', ['fa', Icons.faTrophy]);
    const settingsIcon = createElement('i', ['fa', Icons.faCog]);
    const aboutIcon = createElement('i', ['fa', Icons.faQuestion]);

    navAboutIcon.append(aboutIcon);
    navSettingsIcon.append(settingsIcon);
    navScoreIcon.append(scoreIcon);
    navAboutText.innerText = 'About';
    navSettingsText.innerText = 'Settings';
    navScoreText.innerText = 'Score';
    aboutLink.append(navAboutIcon, navAboutText);
    settingsLink.append(navSettingsIcon, navSettingsText);
    scoreLink.append(navScoreIcon, navScoreText);
    this.element.append(aboutLink, settingsLink, scoreLink);
    // Object.keys(this.routeLinks).forEach((link) => {
    //   this.routeLinks[link].addEventListener('click', (e: Event): boolean => {
    //     e.preventDefault();
    //     // return false;
    //   });
    // });
  }
}
