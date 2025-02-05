import Block from "../../core/block";

interface DialogueMenuItemProps {
  image: string;
  text: string;
  onClick?: (e: Event) => void
}

export default class DialogueMenuItem extends Block {
  constructor(props: DialogueMenuItemProps) {
    super("div", {
      ...props,
      attrs: {
        class: "item_wrapper"
      },
      events: {
        click: props.onClick,
      },
    });
  }

  render(): string {
    return `
      <img src=${this.props.image} alt="icon">
      <p>${this.props.text}</p>
    `;
  }
}
