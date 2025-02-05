import { Title, Button } from "../../components";

import Block from "../../core/block";

export default class Error extends Block {
  constructor(props: Record<string, unknown>) {

    const { title }: { title?: string } = props;
    const { text }: { text?: string } = props;

    super("div", {
      ...props,
      attrs: {
        class: "container",
      },
      ErrorTitle: new Title({
        text: title || "Упс!",
        size: "large",
      }),
      ErrorSubtitle: new Title({
        text: text || "Произошла ошибка",
        size: "normal",
      }),
      BackButton: new Button({
        style: "secondary",
        label: "Назад к чатам",
        page: "list",
      }),
    });
  }

  render(): string {
    return `
      <div class="error__wrapper">
        {{{ ErrorTitle }}}
        {{{ ErrorSubtitle }}}
        {{{ BackButton }}}
      </div>
    `;
  }
}
