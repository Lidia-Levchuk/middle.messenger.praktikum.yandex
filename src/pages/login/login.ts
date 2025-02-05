import { Title, Input, Button } from "../../components";
import { validateLogin, validatePassword } from "../../validation";
import Block from "../../core/block";

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export default class Login extends Block {
  constructor(props: Record<string, unknown>) {
    super("div", {
      ...props,
      attrs: {
        class: "container",
      },
      LoginTitle: new Title({
        text: "Авторизация",
        size: "normal"
      }),
      LoginInput: new Input({
        label: "Логин",
        name: "login",
        type: "text",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validateLogin(value) as ValidationResult;

          this.updateChildrenProps(this.children.LoginInput, {
            error: validateAnswer.errorMessage,
          });
        }
      }),
      PasswordInput: new Input({
        label: "Пароль",
        name: "password",
        type: "password",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validatePassword(value) as ValidationResult;

          this.updateChildrenProps(this.children.PasswordInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      SignInButton: new Button({
        style: "primary",
        label: "Войти",
        type: "submit",
        onClick: (e: Event) => {
          e.preventDefault();
          console.log(this.children.LoginInput)
          const loginValue = (this.children.LoginInput as Input).value();
          const passwordValue = (this.children.PasswordInput as Input).value();

          const loginValidation = validateLogin(loginValue) as ValidationResult;
          const passwordValidation = validatePassword(passwordValue) as ValidationResult;
          
          this.updateChildrenProps(this.children.LoginInput, {
            error: loginValidation.errorMessage,
          });
          this.updateChildrenProps(this.children.PasswordInput, {
            error: passwordValidation.errorMessage,
          });

          if (loginValidation.isValid && passwordValidation.isValid) {
            const form = {
              login: loginValue,
              password: passwordValue
            };
            console.log("Форма валидна", form);
          } else {
            console.log("Ошибки валидации:", {
              loginError: loginValidation.errorMessage,
              passwordError: passwordValidation.errorMessage,
            });
          }
        },
      }),
      SignUpButton: new Button({
        style: "secondary",
        label: "Регистрация",
        page: "registration",
      }),
    });
  }

  render(): string {
    return `
      <form class="login-form">
        {{{ LoginTitle }}}
        <div class="input__wrapper">
          {{{ LoginInput }}}
          {{{ PasswordInput }}}
        </div>
        <div class="button__wrapper">
          {{{ SignInButton }}}
          {{{ SignUpButton }}}
        </div>
      </form>
    `;
  }
}
