import { Title, Button } from "../../../components";

import Block from "../../../core/block";

interface DialogProps {
  dialogId: string;
  titleText?: string;
  titleSize?: "large" | "normal" | "medium" | "small";
  okText?: string;
  cancelText?: string;
  Body: Block | string;
  onOk?: (e:Event) => void;
  onCancel?: (e:Event) => void;
}

export default class Dialog extends Block {
  constructor(props: DialogProps) {
    super("div", {
      ...props,
      attrs: {
        class: "dialog-container",
      },
      Title: new Title({
        text: props.titleText || "",
        size: props.titleSize || "normal"
      }),
      OkButton: new Button({
        style: "primary",
        label: props.okText || "",
        onClick: props.onOk,
      }),
      CancelButton: new Button({
        style: "secondary",
        label: props.cancelText || "",
        onClick: props.onCancel,
      })
    });
  }

  public getBody(): Block {
    return this.children.Body as Block;
  }

  render(): string {
    const dialogClass = this.props.Body !== "" ? "dialog__body" : "dialog__body dialog--no-content";

    const bodyContent = this.props.Body !== "" ? `{{{ Body }}}` : "";
    return `
      <div class="dialog" id=${this.props.dialogId}>
        {{{ Title }}}
        <div class="${dialogClass}">
          ${bodyContent}
        </div>
        <div class="dialog__footer">
          {{{ OkButton }}}
          {{#if ${this.props.cancelText !== "" && this.props.cancelText !== undefined}}}
            {{{ CancelButton }}}
          {{/if}}
        </div>
      </div>
    `;
  }
}
