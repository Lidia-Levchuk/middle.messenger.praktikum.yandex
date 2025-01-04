import { Title, Input, Button } from "../../components";

import { validateEmail, validateLogin, validateName, validatePhone, validatePassword, validatePasswordConfirmation } from "../../validation";

import Block from "../../core/block";

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export default class Registration extends Block {
  constructor(props: Record<string, unknown>) {
    super("div", {
      ...props,
      attrs: {
        class: "container",
      },
      RegistrationTitle: new Title({
        text: "Регистрация",
        size: "normal"
      }),
      EmailInput: new Input({
        label: "Email",
        name: "email",
        type: "email",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validateEmail(value) as ValidationResult

          this.updateChildrenProps(this.children.EmailInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      LoginInput: new Input({
        label: "Логин",
        name: "login",
        type: "text",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validateLogin(value) as ValidationResult

          this.updateChildrenProps(this.children.LoginInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      NameInput: new Input({
        label: "Имя",
        name: "first_name",
        type: "text",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validateName(value) as ValidationResult

          this.updateChildrenProps(this.children.NameInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      SurnameInput: new Input({
        label: "Фамилия",
        name: "second_name",
        type: "text",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validateName(value) as ValidationResult

          this.updateChildrenProps(this.children.SurnameInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      PhoneInput: new Input({
        label: "Телефон",
        name: "phone",
        type: "tel",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validatePhone(value) as ValidationResult

          this.updateChildrenProps(this.children.PhoneInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      PasswordInput: new Input({
        label: "Пароль",
        name: "password",
        type: "password",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validatePassword(value) as ValidationResult

          this.updateChildrenProps(this.children.PasswordInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      ConfirmationPasswordInput: new Input({
        label: "Повторите пароль",
        name: "password",
        type: "password",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const passwordValue = (this.children.PasswordInput as Input).value();

          const validateAnswer = validatePasswordConfirmation(passwordValue, value) as ValidationResult

          this.updateChildrenProps(this.children.ConfirmationPasswordInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      SignUpButton: new Button({
        style: "primary",
        label: "Зарегистрироваться",
        type: "submit",
        onClick: (e: Event) => {
          e.preventDefault();
          
          const emailValue = (this.children.EmailInput as Input).value();
          const loginValue = (this.children.LoginInput as Input).value();
          const nameValue = (this.children.NameInput as Input).value();
          const surnameValue = (this.children.SurnameInput as Input).value();
          const phoneValue = (this.children.PhoneInput as Input).value();
          const passwordValue = (this.children.PasswordInput as Input).value();
          const confirmationPasswordValue = (this.children.ConfirmationPasswordInput as Input).value();

          const emailValidation = validateEmail(emailValue) as ValidationResult;
          const loginValidation = validateLogin(loginValue) as ValidationResult;
          const nameValidation = validateName(nameValue) as ValidationResult;
          const surnameValidation = validateName(surnameValue) as ValidationResult;
          const phoneValidation = validatePhone(phoneValue) as ValidationResult;
          const passwordValidation = validatePassword(passwordValue) as ValidationResult;
          const confirmationPasswordValidation = validatePasswordConfirmation(passwordValue, confirmationPasswordValue) as ValidationResult;
          
          this.updateChildrenProps(this.children.EmailInput, {
            error: emailValidation.errorMessage,
          });
          this.updateChildrenProps(this.children.LoginInput, {
            error: loginValidation.errorMessage,
          });
          this.updateChildrenProps(this.children.NameInput, {
            error: nameValidation.errorMessage,
          });
          this.updateChildrenProps(this.children.SurnameInput, {
            error: surnameValidation.errorMessage,
          });
          this.updateChildrenProps(this.children.PhoneInput, {
            error: phoneValidation.errorMessage,
          });
          this.updateChildrenProps(this.children.PasswordInput, {
            error: passwordValidation.errorMessage,
          });
          this.updateChildrenProps(this.children.ConfirmationPasswordInput, {
            error: confirmationPasswordValidation.errorMessage,
          });
          const formValid = 
            emailValidation.isValid && 
            loginValidation.isValid && 
            nameValidation.isValid &&
            surnameValidation.isValid &&
            phoneValidation.isValid &&
            passwordValidation.isValid &&
            confirmationPasswordValidation.isValid;
          if (formValid) {
            const form = {
              email: emailValue,
              login: loginValue,
              first_name: nameValue,
              second_name: surnameValue,
              phone: phoneValue,
              password: passwordValue,
            };
            console.log("Форма валидна", form);
          } else {
            console.log("Ошибки валидации:", {
              emailError: emailValidation.errorMessage,
              loginError: loginValidation.errorMessage,
              nameError: nameValidation.errorMessage,
              surnameError: surnameValidation.errorMessage,
              phoneError: phoneValidation.errorMessage,
              passwordError: passwordValidation.errorMessage,
              confirmationPasswordError: confirmationPasswordValidation.errorMessage,
            });
          }
        },
      }),
      SignInButton: new Button({
        style: "secondary",
        label: "Войти",
        page: "login",
      }),
    });
  }

  render(): string {
    return `
      <form class="login-form">
        {{{ RegistrationTitle }}}
        <div class="input__wrapper">
          {{{ EmailInput }}}
          {{{ LoginInput }}}
          {{{ NameInput }}}
          {{{ SurnameInput }}}
          {{{ PhoneInput }}}
          {{{ PasswordInput }}}
          {{{ ConfirmationPasswordInput }}}
        </div>
        <div class="button__wrapper">
          {{{ SignUpButton }}}
          {{{ SignInButton }}}
        </div>
      </form>
    `;
  }
}
