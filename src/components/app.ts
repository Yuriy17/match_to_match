import { Elements } from '../models/elements-model';
import { ImageCategoryModel } from '../models/image-category-models';
import Main from './content/main';
import CurrentPerson from './current-person';
import Database from './database';
import Entry from './entry/entry';
import Footer from './footer/footer';
import Game from './game/game';
import Header from './header/header';
import Router from './router/router';

export default class App {
  private readonly game: Game;

  private readonly footer: Footer;

  private readonly header: Header;

  private readonly main: Main;

  private readonly entry: Entry;

  private readonly router: Router;

  private readonly database: Database;

  private readonly currentPerson: CurrentPerson;

  private elements: Elements = {};

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.currentPerson = new CurrentPerson();

    this.database = new Database(this.currentPerson.setCurrentPerson);
    this.entry = new Entry(
      this.currentPerson.name,
      this.currentPerson.surname,
      this.database.addPerson,
      this.database.getPerson,
    );
    this.footer = new Footer();
    this.header = new Header(this.entry.buttonElements);
    this.main = new Main();
    this.initLayout();
    this.router = new Router();
    this.initRouter();
  }

  initLayout = (): void => {
    this.header.initLayout();
    this.footer.initLayout();

    this.main.element.append(this.game.element);
    this.rootElement.append(
      this.header.element,
      this.main.element,
      this.footer.element,
      this.entry.regModal.element,
      this.entry.logInModal.element,
    );
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
