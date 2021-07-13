import { Elements } from '../models/elements-model';
import About from '../pages/about/about';
import Game from '../pages/game/game';
import Score from '../pages/score/score';
import Settings from '../pages/settings/settings';
import { Pages } from '../utils/constant';
import { createElement } from '../utils/utils';
import ConcreteSubject from './concrete-subject';
import CurrentPerson from './current-person';
import Database from './database';
import Entry from './entry/entry';
import Footer from './footer/footer';
import HeaderControl from './header-control/header-control';
import HeaderNav from './header-nav/header-nav';
import Header from './header/header';
import Router from './router/router';

export default class App {
  private readonly game: Game;

  private readonly footer: Footer;

  private readonly header: Header;

  private readonly headerControl: HeaderControl;

  private readonly headerNav: HeaderNav;

  private readonly main: HTMLElement;

  private readonly subject: ConcreteSubject;

  private readonly entry: Entry;

  private readonly router: Router;

  private readonly about: About;

  private readonly score: Score;

  private readonly settings: Settings;

  private readonly database: Database;

  private readonly currentPerson: CurrentPerson;

  private elements: Elements = {};

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.currentPerson = new CurrentPerson();

    this.database = new Database(this.currentPerson.setCurrentPerson);
    this.subject = new ConcreteSubject();
    this.entry = new Entry(
      this.database.addPerson,
      this.database.getPerson,
      this.subject.changeEntryState,
    );
    this.footer = new Footer();
    this.headerControl = new HeaderControl(
      this.entry.buttonElements,
      this.currentPerson.photo,
      this.game.gameButton,
    );
    this.headerNav = new HeaderNav();
    this.header = new Header(this.headerControl.element, this.headerNav.element);
    this.main = createElement('main', ['main']);
    this.about = new About();
    this.router = new Router();
  }

  init(): void {
    this.headerNav.init();
    this.subject.attach(this.headerControl);
    this.initLayout();
    this.initRouter();
  }

  initLayout = (): void => {
    this.header.initLayout();
    this.footer.initLayout();
    this.goToPage(Pages.about);
    this.rootElement.append(
      this.header.element,
      this.main,
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
      .add(/settings/, () => {
        alert('welcome in settings page');
      })
      .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
        alert(`products: ${id} specification: ${specification}`);
      })
      .add('', () => {
        // general controller
        console.log('welcome in catch all controller');
      });
  };

  public goToPage(page: string): void {
    const { main, router } = this;
    const { routeLinks } = this.headerNav;
    main.innerHTML = '';
    Object.keys(routeLinks).forEach((link: string) => routeLinks[link].classList.remove('nav__link_active'));
    switch (page) {
      case Pages.about:
        router.navigate(/about/);
        main.append(this.about.element);
        routeLinks.aboutLink.classList.add('nav__link_active');
        break;
      case Pages.settings:
        router.navigate(/settings/);
        main.append(this.settings.element);
        routeLinks.settingsLink.classList.add('nav__link_active');
        break;
      case Pages.score:
        router.navigate(/score/);
        main.append(this.score.element);
        routeLinks.scoreLink.classList.add('nav__link_active');
        break;
      case Pages.game:
        router.navigate('');
        main.append(this.game.element);
        break;
      default:
        break;
    }
  }
}
