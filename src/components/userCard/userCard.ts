import { Avatar } from "..";

import Block from "../../core/block";

export default class UserCard extends Block {
  constructor(props: Record<string, unknown>) {
    super("div", {
      ...props,
      events: {
        click: props.onClick,
      },
      Avatar: new Avatar({
        image: props.avatar as string,
        change: false,
      })
    });
  }
  render(): string {
    return `
      <li class="card ${this.props.active ? 'card_active' : ''}">
        {{{ Avatar }}}
        <div class="card__name-datetime_wrapper">
          <div class="card__name">
            ${this.props.name}
          </div>
          <div class="card__datetime">
            ${this.props.dateTime}
          </div>
        </div>
        <div class="card__message-count_wrapper">
          <div class="card__message">
            ${this.props.lastMessageOwner === "you" ? "<span>Вы:</span>" : ""}
            ${this.props.lastMessage}
          </div>
          ${this.props.newMessagesCount !== "0" ? `
            <div class="card__count">
              ${this.props.newMessagesCount}
            </div>
          ` : ""}
        </div>
      </li>
    `;
  }
}
