import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

import avatar from "./assets/images/example_avatar.jpg";

import { render } from "./core/renderDom";
import Block from "./core/block";

interface PageContext {
  [key: string]: unknown;
}

interface PageEntry {
  source: new (props: Record<string, unknown>) => Block;
  context: PageContext;
}

type PagesMap = {
  [key: string]: PageEntry;
};

const pages: PagesMap = {
  login: { source: Pages.LoginPage, context: {} },
  registration: { source: Pages.RegistrationPage, context: {} },
  error: {
    source: Pages.ErrorPage,
    context: {
      title: "500",
      text: "Сервер не отвечает. Мы уже работаем над этим.<br>Попробуйте зайти на страницу позднее или вернуться обратно."
    },
  },
  list: {
    source: Pages.ListPage,
    context: {},
  },
  profile: {
    source: Pages.ProfilePage,
    context: {
      user: {
        avatar,
        email: "pochta@yandex.ru",
        login: "ivanivanov",
        firstName: "Иван",
        secondName: "Иванов",
        displayName: "Иван",
        phone: "+79099673030",
      },
    },
  },
  nav: { source: Pages.NavigatePage, context: {} },
};

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  const pageEntry = pages[page];
  if (!pageEntry) {
    console.error(`Page "${page}" not found.`);
    return;
  }

  const { source, context } = pageEntry;

  const componentInstance = new source(context);
  render("#app", componentInstance);
}

document.addEventListener("DOMContentLoaded", () => navigate("nav"));

document.addEventListener("click", (e) => {
  const page = (e.target as HTMLElement).getAttribute("page");
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
