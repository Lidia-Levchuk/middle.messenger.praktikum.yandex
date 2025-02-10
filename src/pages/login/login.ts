import { Title, Input, Button } from "../../components";

import { validateLogin, validatePassword } from "../../validation";

import Block from "../../core/block";
import Router from "../../core/router";
import { UNAUTH_ROUTES } from "../../constants"
import { withRouter } from "../../utils/withRouter"
import { connect } from "../../utils/connect"
import * as authServices from "../../services/auth"

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

interface LoginProps {
  router: Router;
  isLoading: boolean;
  loginError?: string;
}

class Login extends Block {
  constructor(props: LoginProps) {
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

            authServices.signin(form);
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
        type: "button",
        label: "Регистрация",
        onClick: (e: Event) => {
          e.preventDefault();
          const route = UNAUTH_ROUTES.find(route => route.component === "RegistrationPage");
          console.log('5 go');
          props.router.go(route ? route.path : "")
        }
      }),
    });
  }

  render(): string {
    return `
      <form class="login-form">
        {{{ LoginTitle }}}
        {{#if loginError}}
          <p class="login__error">{{ loginError }}</p>
        {{/if}}
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

export default withRouter(connect(({isLoading, loginError}) => ({
  isLoading,
  loginError
}))(Login));
