import { Input, Dialog } from "../..";
import { validateLogin } from "../../../validation";

import Block from "../../../core/block";

interface AddUserDialogProps {
  onOk?: (e:Event) => void;
}

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

interface DialogBodyChildren {
  LoginInput: Input;
}

interface DialogBodyInterface {
  loginValue: string;
  loginError: string;
  checkLogin(): string[];
  children: DialogBodyChildren;
}

class DialogBody extends Block {
  private loginValue = "";
  private loginError = "";

  constructor() {
    super("form", {
      LoginInput: new Input({
        label: "Логин",
        name: "login",
        type: "text",
        onBlur: (e: Event) => {
          const target = e.target as HTMLInputElement;
          this.loginValue = target.value;

          const validateAnswer = validateLogin(this.loginValue) as ValidationResult;

          if (validateAnswer.errorMessage !== undefined) {
            this.loginError = validateAnswer.errorMessage;
          }

          this.updateChildrenProps(this.children.LoginInput, {
            error: validateAnswer.errorMessage,
          });
        },
      }),
    });
  }

  public checkLogin(): string[] {
    return [this.loginValue, this.loginError];
  }

  render(): string {
    return `
      {{{ LoginInput }}}
    `;
  }
}

export default class AddUserDialog extends Block {
  constructor(props: AddUserDialogProps) {
    super("div", {
      ...props,
      Dialog: new Dialog({
        dialogId: "addUserDialog",
        titleText: "Добавить пользователя",
        titleSize: "normal",
        okText: "Добавить",
        onOk: (e: Event) => {
          e.preventDefault();
          const dialog = this.children.Dialog as Dialog;
          const dialogBody = (dialog.getBody() as unknown) as DialogBodyInterface;
          const loginValue = dialogBody.loginValue;

          const loginValidation = validateLogin(loginValue) as ValidationResult;
          this.updateChildrenProps(dialogBody.children.LoginInput, {
            error: loginValidation.errorMessage,
          });

          if (loginValidation.isValid) {
            const form = {
              login: loginValue
            };
            console.log("Форма валидна", form);
          } else {
            console.log("Ошибки валидации:", {
              loginError: loginValidation.errorMessage,
            });
          }

          if (props.onOk) {
            props.onOk(e);
          }
        },
        Body: new DialogBody(),
      }),
    });
  }

  render(): string {
    return `{{{ Dialog }}}`;
  }
}
