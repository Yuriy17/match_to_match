type Route = {
  path: RegExp | string;
  cb: (match: string) => void;
};
export default class Router {
  routes: Array<Route> = [];

  root = '/';

  timerId = 0;

  public spaLinksArr: Element[];

  constructor(public current: string = '', public goToPage:(page:string)=>void) {}

  init(): void {
    this.goToPage(this.current);
    this.listen();
    this.spaLinksInitialize();
  }

  spaLinksInitialize(): void {
    const spaLinks = document.querySelectorAll('a.spa-link');

    if (spaLinks) {
      this.spaLinksArr = [...spaLinks];
      if (this.spaLinksArr.length) {
        this.spaLinksArr.forEach((element: Element) => {
          if (element instanceof HTMLElement) {
            element.onclick = (e): boolean => {
              const link = e.currentTarget as HTMLLinkElement;
              const href = link?.getAttribute('href');
              if (href !== null) {
                this.navigate(href);
              }
              return false;
            };
          }
        });
      }
    }
  }

  add = (path: RegExp | string, cb: (match: string) => void): Router => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = (path: RegExp | string): Router => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = (): Router => {
    this.routes = [];
    return this;
  };

  clearSlashes = (path: RegExp | string): string => path.toString().replace(/\/$/, '').replace(/^\//, '');

  getFragment = (): string => {
    let fragment = '';

    fragment = this.clearSlashes(
      decodeURI(window.location.pathname + window.location.search),
    );
    fragment = fragment.replace(/\?(.*)$/, '');
    fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;

    return this.clearSlashes(fragment);
  };

  navigate = (path: RegExp | string): Router => {
    window.history.pushState(null, '', this.root + this.clearSlashes(path));

    return this;
  };

  listen = (): void => {
    window.clearInterval(this.timerId);
    this.timerId = window.setInterval(this.interval, 50);
  };

  interval = (): void => {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some((route) => {
      const match = this.current.match(route.path);

      if (match) {
        route.cb(match[0]);
        return match[0];
      }
      return false;
    });
  };
}
