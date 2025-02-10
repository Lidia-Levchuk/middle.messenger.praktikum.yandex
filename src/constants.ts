export const ROOT_ELEMENT = "#app"; 

export const UNAUTH_ROUTES = [
  { path: "/", component: "LoginPage" },
  { path: "/sign-up", component: "RegistrationPage" }
] as const;

export const AUTH_ROUTES = [
  { path: "/settings", component: "ProfilePage" },
  { path: "/messenger", component: "ListPage" }
] as const;

export const ALL_ROUTES  = [
  { path: "*", component: "ErrorPage" }
] as const;

export const MAIN_ROUTS = {
  "unauth": "LoginPage",
  "auth": "ListPage"
}
export const ERROR_PAGE_TITLE_404 = "404";
export const ERROR_PAGE_TEXT_404 = "Страница по указанному Вами адресу не существует.<br>Попробуйте вернуться назад.";

export const ERROR_PAGE_TITLE_500 = "500";
export const ERROR_PAGE_TEXT_500 = "Сервер не отвечает. Попробуйте позднее.";

export const BASE_API_URL = "https://ya-praktikum.tech/api/v2"
