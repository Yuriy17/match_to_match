import { dom, library } from '@fortawesome/fontawesome-svg-core';
import {
  faCog, faQuestion, faSpinner, faTrophy, faWarehouse
} from '@fortawesome/free-solid-svg-icons';
import { Elements } from '../models/elements-model';
import { ImageCategoryModel } from '../models/image-category-models';
import { createElement } from '../utils/utils';
import CreateDatabase from './create-database';
import Game from './game/game';
import Registration from './registration/registration';
import Router from './router/router';

// We are only using the user-astronaut icon
library.add(faTrophy, faCog, faQuestion, faWarehouse, faSpinner);

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch();
export default class App {
  private readonly game: Game;

  private readonly registration: Registration;

  private readonly router: Router;

  private readonly createDatabase: CreateDatabase;

  private elements: Elements = {};

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.registration = new Registration();
    this.createDatabase = new CreateDatabase(this.registration);

    this.initLayout();
    this.router = new Router();
    this.initRouter();
  }

  initLayout = (): void => {
    const header = createElement('header', ['header']);
    const headerContainer = createElement('div', ['header__container']);
    const logo = createElement('a', ['spa-link', 'logo'], [['href', '/']]);
    const logoIcon = createElement('i', ['fa', 'fa-warehouse']);
    const nav = createElement('nav', ['nav']);
    const navAboutIcon = createElement('span', ['nav__icon']);
    const navSettingsIcon = createElement('span', ['nav__icon']);
    const navScoreIcon = createElement('span', ['nav__icon']);
    const navAboutText = createElement('span', ['nav__text']);
    const navSettingsText = createElement('span', ['nav__text']);
    const navScoreText = createElement('span', ['nav__text']);
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
    const scoreIcon = createElement('i', ['fa', 'fa-trophy']);
    const settingsIcon = createElement('i', ['fa', 'fa-cog']);
    const aboutIcon = createElement('i', ['fa', 'fa-question']);

    const main = createElement('main', ['main']);
    const footer = createElement('footer', ['footer']);
    footer.innerHTML = `
      <p class="footer-text">
        by <a href="https://github.com/Yuriy17" target="_blank">Yuriy</a>
        thanks to <a href="https://github.com/rolling-scopes-school" target="_blank" ,>RS School</a>
      </p>`;
    logo.append(logoIcon);

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

    headerContainer.append(logo, nav, this.registration.button);
    header.append(headerContainer);
    main.append(this.game.element);
    this.rootElement.append(header, main, footer, this.registration.element);
  };

  initRouter = (): void => {
    this.router
      .add(/about/, () => {
        alert('welcome in about page');
      })
      .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
        alert(`products: ${id} specification: ${specification}`);
      })
      .add('', () => {
        // general controller
        console.log('welcome in catch all controller');
      });
  };

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images, cat.bgImage);
  }
}
