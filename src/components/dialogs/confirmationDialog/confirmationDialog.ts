import { Dialog } from "../dialog";

import Block from "../../../core/block";

interface ConfirmationDialogProps {
  onOk?: (e:Event) => void;
  onCancel?: (e:Event) => void
}

export default class ConfirmationDialog extends Block {
  constructor(props: ConfirmationDialogProps) {
    super("div", {
      ...props,
      Dialog: new Dialog({
        dialogId: "confirmationDialog",
        titleText: "Вы уверены, что хотите удалить данный чат?",
        titleSize: "normal",
        okText: "Удалить",
        onOk: props.onOk,
        cancelText: "Отменить",
        onCancel: props.onCancel,
        Body: "",
      }),
    });
  }
  render(): string {
    return `{{{ Dialog }}}`;
  }
}
