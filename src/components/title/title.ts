import Block from "../../core/block";

interface TitleProps {
  text: string;
  size: "large" | "normal" | "medium" | "small";
}

export default class Title extends Block {
  constructor(props: TitleProps) {
    super("h2", {
      ...props,
      attrs: {
        class: `title ${props.size ? `title__${props.size}` : ""}`.trim(),
      }
    });
  }

  render(): string {
    return `
      {{{text}}}
    `;
  }
}
