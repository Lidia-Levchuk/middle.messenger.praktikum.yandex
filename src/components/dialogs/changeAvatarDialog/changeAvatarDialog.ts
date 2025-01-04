import { Input, Dialog } from "../..";
import { validateFileRequired } from "../../../validation";

import Block from "../../../core/block";

interface ChangeAvatarDialogProps {
  onOk?: (e: Event) => void;
}

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

interface DialogBodyChildren {
  AvatarInput: Input;
}

interface DialogBodyInterface {
  avatarFile: FileList;
  avatarError: string;
  checkAvatarFile(): string[];
  children: DialogBodyChildren;
}

class DialogBody extends Block {
  private avatarFile: File | null = null;
  private avatarError = "";

  constructor() {
    super("form", {
      AvatarInput: new Input({
        label: "",
        type: "file",
        onChange: (e: Event) => {
          const target = e.target as HTMLInputElement;
          const { files } = target;

          if (files && files.length > 0) {
            this.avatarFile = files[0];

            const validateAnswer = validateFileRequired(files) as ValidationResult;
            this.avatarError = validateAnswer.errorMessage || "";

            this.updateChildrenProps(this.children.AvatarInput, {
              error: this.avatarError,
            });
          }
        },
      })
    });
  }

  public checkAvatarFile(): string[] {
    return [this.avatarFile ? this.avatarFile.name : '', this.avatarError];
  }

  render(): string {
    return `
      {{{ AvatarInput }}}
    `;
  }
}

export default class ChangeAvatarDialog extends Block {
  constructor(props: ChangeAvatarDialogProps) {
    super("div", {
      ...props,
      Dialog: new Dialog({
        dialogId: "changeAvatarDialog",
        titleText: "Загрузите файл",
        okText: "Сохранить",
        onOk: (e: Event) => {
          e.preventDefault();
          const dialog = this.children.Dialog as Dialog;
          const dialogBody = (dialog.getBody() as unknown) as DialogBodyInterface;
          const avatarFile = dialogBody.avatarFile;

          const avatarValidation = validateFileRequired(avatarFile) as ValidationResult;
          this.updateChildrenProps(dialogBody.children.AvatarInput, {
            error: avatarValidation.errorMessage,
          });

          if (avatarValidation.isValid) {
            const form = {
              avatar: avatarFile
            };
            console.log("Форма валидна", form);
          } else {
            console.log("Ошибки валидации:", {
              avatarError: avatarValidation.errorMessage,
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
