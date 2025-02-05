import Block from "../../core/block";

interface AvatarProps {
  size?: string,
  image?: string,
  change: boolean,
  onClick?: (e: Event) => void
}

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super("div", {
      ...props,
      attrs: {
        class: "avatar",
      },
      events: {
        click: props.onClick,
      },
    });
  }

  render(): string {
    return `
      <div class="image__container {{#if size}}image__{{size}}{{/if}}">
        <img src="{{image}}" alt="Аватар" class="image">
        {{#if change}}
          <div class="image__change">
            Поменять<br>аватар
          </div>
        {{/if}}
      </div>
    `;
  }
}
