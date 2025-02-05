import { Button, Avatar, Title, Input } from "../../components";
import { ChangeAvatarDialog } from "../../components/dialogs/changeAvatarDialog";
import { validateEmail, validateLogin, validateName, validatePhone, validatePassword, validatePasswordConfirmation } from "../../validation";

import Block from "../../core/block";

interface UserData {
  avatar: string;
  email: string;
  login: string;
  firstName: string;
  secondName?: string;
  displayName: string;
  phone: string;
}

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export default class Profile extends Block {
  constructor(props: Record<string, unknown>) {
    const { avatar, email, login, firstName, secondName, displayName, phone } = props.user as UserData;

    super("div", {
      ...props,
      attrs: {
        class: "container",
      },
      BackButton: new Button({
        style: "arrow",
        side: "left",
        page: "list",
      }),
      UserAvatar: new Avatar({
        image: avatar,
        change: true,
        size: "large",
        onClick: (e: Event) => {
          e.preventDefault();
          this.setProps({
            showDialog: true,
          });
        },
      }),
      NameTitle: new Title({
        text: firstName,
        size: "normal",
      }),
      EmailInput: new Input({
        label: "Email",
        labelColor: "black",
        name: "email",
        type: "email",
        value: email,
        className: "profile__style",
        wrapperClass: "input--no-events",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;
          
          const validateAnswer = validateEmail(value) as ValidationResult;

          this.updateChildrenProps(this.children.EmailInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      LoginInput: new Input({
        label: "Логин",
        labelColor: "black",
        name: "login",
        type: "text",
        value: login,
        className: "profile__style",
        wrapperClass: "input--no-events",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validateLogin(value) as ValidationResult;

          this.updateChildrenProps(this.children.LoginInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      NameInput: new Input({
        label: "Имя",
        labelColor: "black",
        name: "first_name",
        type: "text",
        value: firstName,
        className: "profile__style",
        wrapperClass: "input--no-events",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validateName(value) as ValidationResult;

          this.updateChildrenProps(this.children.NameInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      SurnameInput: new Input({
        label: "Фамилия",
        labelColor: "black",
        name: "second_name",
        type: "text",
        value: secondName,
        className: "profile__style",
        wrapperClass: "input--no-events",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validateName(value) as ValidationResult;

          this.updateChildrenProps(this.children.SurnameInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      DisplayNameInput: new Input({
        label: "Имя в чате",
        labelColor: "black",
        name: "display_name",
        type: "text",
        value: displayName,
        className: "profile__style",
        wrapperClass: "input--no-events",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validateName(value) as ValidationResult;

          this.updateChildrenProps(this.children.DisplayNameInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      PhoneInput: new Input({
        label: "Телефон",
        labelColor: "black",
        name: "phone",
        type: "tel",
        value: phone,
        className: "profile__style",
        wrapperClass: "input--no-events",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validatePhone(value) as ValidationResult;

          this.updateChildrenProps(this.children.PhoneInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      OldPasswordInput: new Input({
        label: "Старый пароль",
        labelColor: "black",
        name: "oldPassword",
        type: "password",
        className: "profile__style",
        wrapperClass: "input--no-events",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validatePassword(value) as ValidationResult;

          this.updateChildrenProps(this.children.OldPasswordInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      NewPasswordInput: new Input({
        label: "Новый пароль",
        labelColor: "black",
        name: "newPassword",
        type: "password",
        className: "profile__style",
        wrapperClass: "input--no-events",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const validateAnswer = validatePassword(value) as ValidationResult;

          this.updateChildrenProps(this.children.NewPasswordInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      ConfirmationPasswordInput: new Input({
        label: "Повторите пароль",
        labelColor: "black",
        name: "password",
        type: "password",
        className: "profile__style",
        wrapperClass: "input--no-events",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { value } = target;

          const passwordValue = (this.children.NewPasswordInput as Input).value();

          const validateAnswer = validatePasswordConfirmation(passwordValue, value) as ValidationResult;

          this.updateChildrenProps(this.children.ConfirmationPasswordInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
      SaveButton: new Button({
        style: "primary",
        label: "Сохранить",
        className: "fix-size",
        onClick: (e: Event) => {
          e.preventDefault();

          if (this.props.changeUserData) {
            const emailValue = (this.children.EmailInput as Input).value();
            const loginValue = (this.children.LoginInput as Input).value();
            const nameValue = (this.children.NameInput as Input).value();
            const surnameValue = (this.children.SurnameInput as Input).value();
            const displayNameValue = (this.children.DisplayNameInput as Input).value();
            const phoneValue = (this.children.PhoneInput as Input).value();

            const emailValidation = validateEmail(emailValue) as ValidationResult;
            const loginValidation = validateLogin(loginValue) as ValidationResult;
            const nameValidation = validateName(nameValue) as ValidationResult;
            const surnameValidation = validateName(surnameValue) as ValidationResult;
            const displayNameValidation = validateName(displayNameValue) as ValidationResult;
            const phoneValidation = validatePhone(phoneValue) as ValidationResult;

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
            this.updateChildrenProps(this.children.DisplayNameInput, {
              error: displayNameValidation.errorMessage,
            });
            this.updateChildrenProps(this.children.PhoneInput, {
              error: phoneValidation.errorMessage,
            });

            const formValid =
              emailValidation.isValid &&
              loginValidation.isValid &&
              nameValidation.isValid &&
              surnameValidation.isValid &&
              displayNameValidation.isValid &&
              phoneValidation.isValid;

            if (formValid) {
              const form = {
                email: emailValue,
                login: loginValue,
                first_name: nameValue,
                second_name: surnameValue,
                display_name: displayNameValue,
                phone: phoneValue,
              };
              console.log("Форма валидна", form);
            } else {
              console.log("Ошибки валидации:", {
                emailError: emailValidation.errorMessage,
                loginError: loginValidation.errorMessage,
                nameError: nameValidation.errorMessage,
                surnameError: surnameValidation.errorMessage,
                displayNameError: displayNameValidation.errorMessage,
                phoneError: phoneValidation.errorMessage,
              });
            }
          }

          if (this.props.changePassword) {
            const oldPasswordValue = (this.children.OldPasswordInput as Input).value();
            const newPasswordValue = (this.children.NewPasswordInput as Input).value();
            const confirmationPasswordValue = (this.children.ConfirmationPasswordInput as Input).value();

            const oldPasswordValidation = validatePassword(oldPasswordValue) as ValidationResult;
            const newPasswordValidation = validatePassword(newPasswordValue) as ValidationResult;
            const confirmationPasswordValidation = validatePasswordConfirmation(newPasswordValue, confirmationPasswordValue) as ValidationResult;

            this.updateChildrenProps(this.children.OldPasswordInput, {
              error: oldPasswordValidation.errorMessage,
            });
            this.updateChildrenProps(this.children.NewPasswordInput, {
              error: newPasswordValidation.errorMessage,
            });
            this.updateChildrenProps(this.children.ConfirmationPasswordInput, {
              error: confirmationPasswordValidation.errorMessage,
            });

            const formValid =
              oldPasswordValidation.isValid &&
              newPasswordValidation.isValid &&
              confirmationPasswordValidation.isValid;

            if (formValid) {
              const form = {
                oldPassword: oldPasswordValue,
                newPassword: newPasswordValue,
                confirmationPassword: confirmationPasswordValue,
              };
              console.log("Форма валидна", form);
            } else {
              console.log("Ошибки валидации:", {
                oldPasswordError: oldPasswordValidation.errorMessage,
                newPasswordError: newPasswordValidation.errorMessage,
                confirmationPasswordError: confirmationPasswordValidation.errorMessage,
              });
            }
          }
        },
      }),
      ChangeDataButton: new Button({
        style: "secondary",
        label: "Изменить данные",
        className: "profile",
        onClick: (e: Event) => {
          e.preventDefault();

          this.updateChildrenProps(this.children.EmailInput, {
            wrapperClass: "",
          });
          this.updateChildrenProps(this.children.LoginInput, {
            wrapperClass: "",
          });
          this.updateChildrenProps(this.children.NameInput, {
            wrapperClass: "",
          });
          this.updateChildrenProps(this.children.SurnameInput, {
            wrapperClass: "",
          });
          this.updateChildrenProps(this.children.DisplayNameInput, {
            wrapperClass: "",
          });
          this.updateChildrenProps(this.children.PhoneInput, {
            wrapperClass: "",
          });

          this.setProps({
            changeUserData: !this.props.changeUserData,
          });
        },
      }),
      ChangePasswordButton: new Button({
        style: "secondary",
        label: "Изменить пароль",
        className: "profile",
        onClick: (e: Event) => {
          e.preventDefault();

          this.setProps({
            changePassword: !this.props.changePassword,
          });
        },
      }),
      ExitButton: new Button({
        style: "secondary",
        label: "Выйти",
        page: "login",
        className: "profile red last",
      }),
      ChangeAvatarDialog: new ChangeAvatarDialog({
        onOk: (e: Event) => {
          e.preventDefault();
          this.setProps({
            showDialog: false,
          });
        },
      }),
    });
  }

  render(): string {
    return `
      <div class="profile__wrapper">
        <div class="profile__back">
          {{{ BackButton }}}
        </div>

        <div class="profile__face">
          {{{ UserAvatar }}}
          {{{ NameTitle }}}
        </div>

        <form class="profile__data">
          {{#if ${!this.props.changePassword}}}
            {{{ EmailInput }}}
            {{{ LoginInput }}}
            {{{ NameInput }}}
            {{{ SurnameInput }}}
            {{{ DisplayNameInput }}}
            {{{ PhoneInput }}}
          {{/if}}
          {{#if ${this.props.changePassword}}}
            {{{ OldPasswordInput }}}
            {{{ NewPasswordInput }}}
            {{{ ConfirmationPasswordInput }}}
          {{/if}}
          {{#if ${(this.props.changePassword || this.props.changeUserData)}}}
            <div class="button__wrapper">
              {{{ SaveButton }}}
            </div>
          {{/if}}
        </form>
        {{#if ${!(this.props.changePassword || this.props.changeUserData)}}}
          <div class="profile__options">
            {{{ ChangeDataButton }}}
            {{{ ChangePasswordButton }}}
            {{{ ExitButton }}}
          </div>
        {{/if}}
      </div>

      {{#if showDialog}}
        {{{ ChangeAvatarDialog }}}
      {{/if}}
    `;
  }
}
