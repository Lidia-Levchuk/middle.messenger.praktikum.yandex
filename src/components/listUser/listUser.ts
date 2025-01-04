import { UserCard } from "../../components";

import Block from "../../core/block";

interface User {
  avatar: string;
  name: string;
  lastMessage: string;
  lastMessageOwner: string;
  dateTime: string;
  newMessagesCount: string;
  active?: boolean;
}

interface ListProps {
  users: User[];
  onUserClick?: (e: Event) => void
}

export default class ListUser extends Block {
  constructor(props: ListProps) {
    super("div", {
      ...props,
      activeUserIndex: -1,
      users: props.users.map(
        (userProps, index) =>
          new UserCard({
            ...userProps,
            onClick: (e: Event) => {
              this.setProps({ activeUserIndex: index });
              if (props.onUserClick) {
                props.onUserClick(e)
              }
            },
          }),
      ),
    });
  }

  render(): string {

    const { activeUserIndex } = this.props;
    const { users } = this.children;

    if (Array.isArray(users)) {
      users.forEach((user, index: number) => {
        user.setProps({ active: index === activeUserIndex });
      });
    }

    return `
      <ul class="list-user__list">
        {{#each users}}
          {{{ this }}}
        {{/each}}
      </ul>
    `;
  }
}
