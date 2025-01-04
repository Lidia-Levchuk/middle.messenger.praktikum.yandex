import Block from "../../core/block";

export default class Navigate extends Block {
  constructor(props: Record<string, unknown>) {
    super("nav", {
      ...props,
    });
  }

  render(): string {
    return `
      <ul class="nav__list">
        <li><a href="#" class="nav__link" page="login">Авторизация</a></li>
        <li><a href="#" class="nav__link" page="registration">Регистрация</a></li>
        <li><a href="#" class="nav__link" page="list">Чаты</a></li>
        <li><a href="#" class="nav__link" page="profile">Профиль</a></li>
        <li><a href="#" class="nav__link" page="error">404/500</a></li>
      </ul>
    `;
  }
}
