import Route from "./route";
import Block from "./block";
import { StoreEvents } from "./store";
import * as Constants from "../constants";

export interface RouteInterface {
  render: () => void;
  match: (path: string) => boolean;
  leave: () => void;
  getPathname: () => string;
}

class Router {
  public routes: RouteInterface[] = [];
  private static __instance: Router | null = null;
  private history: History = window.history;
  private _currentRoute: RouteInterface | null = null;
  private _rootQuery: string = "";

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;

    Router.__instance = this;

    window.store.on(StoreEvents.Updated, (prevState: Record<string, unknown>, nextState: Record<string, unknown>) => {
      if (prevState.isLoggedIn !== nextState.isLoggedIn && nextState.isLoggedIn) {
        this._handleAuthRedirect(nextState.isLoggedIn as boolean);
      }
    });
  }

  use(pathname: string, block: new (...args: any[]) => Block): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = ((event: PopStateEvent) => {
      const pathname = event.currentTarget ? (event.currentTarget as Window).location.pathname : "";
      this._onRoute(pathname);
    }).bind(this);
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      this.handleErrorPage(404);
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  private handleErrorPage(errorCode: number): void {
    window.store.set("errorPageContext", {
      title: errorCode === 404 ? Constants.ERROR_PAGE_TITLE_404 : Constants.ERROR_PAGE_TITLE_500,
      text: errorCode === 404 ? Constants.ERROR_PAGE_TEXT_404 : Constants.ERROR_PAGE_TEXT_500
    });

    const errorRoute = Constants.ALL_ROUTES.find(route => route.component === "ErrorPage");

    if (errorRoute) {
      this.go(errorRoute.path);
    } else {
      console.error("ErrorPage route not found");
    }
  }

  go(pathname: string): void {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  private getRoute(pathname: string): RouteInterface | undefined {
    const isLoggedIn = window.store.get("isLoggedIn");
    
    const availableRoutes: RouteInterface[] = this.routes.filter(route => {
      const routePathname = route.getPathname();
      
      const isLoginRequired = Constants.AUTH_ROUTES.some(r => r.path === routePathname);

      if (isLoggedIn) {
        // Если пользователь вошел, разрешаем доступ к AUTH_ROUTES и ALL_ROUTES
        return isLoginRequired || Constants.ALL_ROUTES.some(r => r.path === routePathname);
      } else {
        // Если пользователь не вошел, разрешаем доступ к UNAUTH_ROUTES и ALL_ROUTES
        return Constants.UNAUTH_ROUTES.some(r => r.path === routePathname) ||
                Constants.ALL_ROUTES.some(r => r.path === routePathname);
      }
    });

    const foundRoute = availableRoutes.find(route => route.match(pathname));

    if (!foundRoute) {
      const errorRoute = this.routes.find(route => route.match("*"));
      return errorRoute;
    }

    return foundRoute;
  }

  private _handleAuthRedirect(isLoggedIn: boolean): void {
    const currentPathname = window.location.pathname;
    if (isLoggedIn) {
      const authRoute = Constants.AUTH_ROUTES.find(route => route.component === Constants.MAIN_ROUTS.auth);
        if (authRoute && currentPathname !== authRoute.path) {
          this.go(authRoute.path);
        }
    } else {
      const unauthRoute = Constants.UNAUTH_ROUTES.find(route => route.component === Constants.MAIN_ROUTS.unauth);
        if (unauthRoute && currentPathname !== unauthRoute.path) {
          this.go(unauthRoute.path);
        }
    }
  }
}

export default Router;
