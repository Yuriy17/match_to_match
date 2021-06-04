type Route = {
  path: string,
  cb: (id:string, specification:string)=>void,
}
export default class Router {
  routes: Array<Route> = [];

  root:string = '/';

  current:string = '';

  timerId: number = 0;

  constructor() {
    this.listen();
  }

  add = (path: string, cb: ):Router => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = (path: string):Router => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = ():Router => {
    this.routes = [];
    return this;
  };

  clearSlashes = (path:string) => path
    .toString()
    .replace(/\/$/, '')
    .replace(/^\//, '');

  getFragment = ():string => {
    let fragment = '';

    fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
    fragment = fragment.replace(/\?(.*)$/, '');
    fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;

    return this.clearSlashes(fragment);
  };

  navigate = (path = ''):Router => {
    window.history.pushState(null, '', this.root + this.clearSlashes(path));
    return this;
  };

  listen = ():void => {
    window.clearInterval(this.timerId );
    this.timerId  = window.setInterval(this.interval, 50);
  };

  interval = ():void => {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some((route) => {
      const match = this.current.match(route.path);
      if (match) {
        match.shift();
        route.cb.apply({}, match);
        return match;
      }
      return false;
    });
  };
}
