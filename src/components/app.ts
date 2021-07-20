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

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game(this.goToPage);
    this.currentPerson = new CurrentPerson();

    this.database = new Database();
    this.subject = new ConcreteSubject();
    this.entry = new Entry(
      this.database.addPerson,
      this.database.getPerson,
      this.subject.changeEntryState,
      this.currentPerson.setCurrentPerson,
    );
    this.footer = new Footer();
    this.headerControl = new HeaderControl(
      this.entry.buttonElements,
      this.currentPerson.getPhoto,
      this.game.gameButton,
      this.currentPerson.reset,
    );
    this.headerNav = new HeaderNav();
    this.header = new Header(this.headerControl.element, this.headerNav.element);
    this.main = createElement('main', ['main']);
    this.about = new About(
      this.entry.regForm.getExample,
      this.entry.logInForm.getExample,
    );
    this.settings = new Settings();
    this.score = new Score();
    this.router = new Router(Pages.about, this.goToPage);
  }

  init(): void {
    this.subject.attach(this.headerControl);
    this.initLayout();
    this.initRouter();
  }

  initLayout = (): void => {
    this.headerNav.init();
    this.header.initLayout();
    this.footer.initLayout();
    this.rootElement.append(
      this.header.element,
      this.main,
      this.footer.element,
      this.entry.regForm.modal.element,
      this.entry.logInForm.modal.element,
    );
  };

  initRouter = (): void => {
    this.router.init();

    this.router
      .add(/about/, (match: string) => {
        console.log(`Welcome in ${match} page (ᵔᴥᵔ)`);
        this.goToPage(Pages.about);
      })
      .add(/settings/, (match: string) => {
        console.log(`Welcome in ${match} page ◉_◉`);
        this.goToPage(Pages.settings);
      })
      .add(/score/, (match: string) => {
        console.log(`Welcome in ${match} page (¬‿¬)`);
        this.goToPage(Pages.score);
      })
      .add('', () => {
        console.log('welcome in catch all controller');
        // this.goToPage(Pages.about);
      });
  };

  goToPage = (page: string): void => {
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
  };
}
