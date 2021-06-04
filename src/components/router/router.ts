type Route = {
  path: RegExp | string;
  cb: (id: any, specification: any) => void;
};
export default class Router {
  routes: Array<Route> = [];

  root = '/';

  current = '';

  timerId = 0;

  constructor() {
    // document.querySelectorAll('a').forEach((el) => {
    //   el.onclick = ():boolean => {
    //     alert('sd');
    //     console.log('aaaaaa');

    //     return false;
    //   };
    // });
    this.listen();
  }

  add = (
    path: RegExp | string,
    cb: (id: number, specification: number) => void,
  ): Router => {
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
    // console.log(this.getFragment());
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some((route) => {
      const match = this.current.match(route.path);
      console.log(match);

      if (match) {
        match.shift();
        // route.cb.apply({}, match);
        return match;
      }
      return false;
    });
  };
}
