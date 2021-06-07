import { Elements } from '../models/elements-model';
import { ImageCategoryModel } from '../models/image-category-models';
import { createElement } from '../utils/utils';
import Game from './game/game';
import Registration from './registration/registration';
import Router from './router/router';

export default class App {
  private readonly game: Game;

  private readonly registration: Registration;

  private readonly router: Router;

  private elements:Elements = {};

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.registration = new Registration();
    this.initLayout();
    this.router = new Router();
    this.initRouter();
  }

  initLayout = (): void => {
    const header = createElement('header', ['header']);
    const headerContainer = createElement('div', ['header__conrainer']);
    const logo = createElement('a', ['spa-link', 'logo'], [['href', '/']]);
    const logoIcon = createElement('i', ['fa', 'fa-fa-warehouse']);
    const nav = createElement('nav', ['nav']);
    const navIcon = createElement('span', ['nav__icon']);
    const aboutLink = createElement('a', ['spa-link', 'nav__link'], [['href', '/about']]);
    const scoreLink = createElement('a', ['spa-link', 'nav__link'], [['href', '/score']]);
    const settingsLink = createElement('a', ['spa-link', 'nav__link'], [['href', '/settings']]);
    const scroreIcon = createElement('i', ['fa', 'fa-trophy']);
    const settingsIcon = createElement('i', ['fa', 'fa-cog']);
    const aboutIcon = createElement('i', ['fa', 'fa-question']);

    this.rootElement.appendChild(this.game.element);
    // this.rootElement.insertAdjacentHTML(
    //   'beforebegin',
    //   `<header>
    //     <div class="header__container">
    //       <a href="/" class="spa-link logo">
    //         <i class="fa fa-warehouse"></i>
    //       </a>
    //       <nav class="nav">
    //         <a href="/score" class="spa-link nav__link" title="leader score page">
    //           <span class="nav__icon"><i class="fas fa-trophy"></i></span>
    //           <span class="nav__text">Score</span>
    //         </a>
    //         <a href="/settings" class="spa-link nav__link" title="config page">
    //           <span class="nav__icon"><i class="fas fa-cog"></i></span>
    //           <span class="nav__text">Settings</span>
    //         </a>
    //         <a href="/about" class="spa-link nav__link" title="question page">
    //           <span class="nav__icon"><i class="fas fa-question"></i></span>
    //           <span class="nav__text">About</span>
    //         </a>
    //       </nav>
    //       <a href="#" class="auth-button">
    //         register new player
    //       </a>
    //     </div>
    //   </header>`,
    // );
    // this.rootElement.insertAdjacentHTML(
    //   'afterend',
    //   `
    // <footer>
    // <ul>
    //   <li><a href="/">Home</a></li>
    //   <li><a href="/about">About page</a></li>
    //   <li><a href="/products/12/specification/10">Go to the product 12</a></li>
    //   <li><a href="/products/22/specification/12">Go to the product 22</a></li>
    // </ul>
    //   <p class="footer-text">
    //     by <a href="https://github.com/Yuriy17" target="_blank">Yuriy</a>
    //     thanks to <a href="https://github.com/rolling-scopes-school" target="_blank",>RS School</a>
    //   </p>
    // </footer>
    // `,
    // );
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
