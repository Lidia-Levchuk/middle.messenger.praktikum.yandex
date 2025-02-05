import Block from "../../core/block";

interface ButtonProps {
  style: "primary" | "secondary" | "arrow" | "list-arrow" | "dialogue-menu";
  side?: "left" | "right";
  label?: string;
  page?: string;
  type?: string;
  className?: string;
  onClick?: (e: Event) => void
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super("button", {
      ...props,
      attrs: {
        class: Button._getClassNames(props),
        ...(props.page ? { page: props.page } : {}),
        ...(props.type ? { type: props.type } : {}),
      },
      events: {
        click: props.onClick,
      },
    });
  }

  private static _getClassNames(props: ButtonProps): string {
    const { style, side, className } = props;
    const classNames = [
      "button",
      style ? `button--${style}` : "",
      side ? `button--arrow-${side}` : "",
      className ? className.split(' ').map(cls => `button--${cls}`).join(' ') : "",
    ].filter(Boolean).join(" ");

    return classNames;
  }

  render(): string {
    return `
      {{ label }}
    `;
  }
}
