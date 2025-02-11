import Handlebars from "handlebars";
import * as Components from "./components";

import * as Pages from "./pages";
import * as Constants from "./constants";
import Router from "./core/router";
import { Store } from "./core/store";
import * as authServices from "./services/auth"

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template !== "function") {
    Handlebars.registerPartial(name, template);
  }
});

window.store = new Store({
  isLoading: false,
  
  errorPageContext: {
    title: Constants.ERROR_PAGE_TITLE_404,
    text: Constants.ERROR_PAGE_TEXT_404
  },

  isLoggedIn: false,
  loginError: "",
  registrationError: ""
});

authServices.user();

const router = new Router(Constants.ROOT_ELEMENT);
window.router = router;

const ROUTS = [
  ...Constants.UNAUTH_ROUTES,
  ...Constants.AUTH_ROUTES,
  ...Constants.ALL_ROUTES
];

ROUTS.forEach(({ path, component }) => { 
  const PageComponent = Pages[component as keyof typeof Pages];
  
  if (PageComponent) {
    router.use(path, PageComponent);
  }
});

router.start();

//Ошибка 500, пример
/*const handleServerError = () => {
  window.store.set("errorPageContext", {
    title: Constants.ERROR_PAGE_TITLE_500,
    text: Constants.ERROR_PAGE_TEXT_500
  });

  const errorRoute = Constants.ALL_ROUTES.find(route => route.component === "ErrorPage");

  if (errorRoute) {
    router.go(errorRoute.path);
  } else {
    console.error("ErrorPage route not found");
  }
};

window.addEventListener("error", handleServerError);*/
