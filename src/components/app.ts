import { ImageCategoryModel } from '../models/image-category-models';
import Game from './game/game';

export default class App {
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.rootElement.appendChild(this.game.element);
    this.rootElement.insertAdjacentHTML(
      'beforebegin',
      '<header>Match to match</header>',
    );
    this.rootElement.insertAdjacentHTML(
      'afterend',
      `
    <footer>
      <p class="footer-text">
        by <a href="https://github.com/Yuriy17" target="_blank">Yuriy</a> 
        thanks to <a href="https://github.com/rolling-scopes-school" target="_blank",>RS School</a>
      </p>
    </footer>
    `,
    );
  }

  async start() {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images, cat.bgImage);
  }
}
