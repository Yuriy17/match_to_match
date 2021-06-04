import { ImageCategoryModel } from '../models/image-category-models';
import Game from './game/game';
import Router from './router/router';

export default class App {
  private readonly game: Game;

  private readonly router: Router;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.initLayout();
    this.router = new Router();
    this.initRouter();
    console.log(this.router);
  }

  initLayout = (): void => {
    this.rootElement.appendChild(this.game.element);
    // this.rootElement.insertAdjacentHTML(
    //   'beforebegin',
    //   '<header>Match to match</header>',
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
