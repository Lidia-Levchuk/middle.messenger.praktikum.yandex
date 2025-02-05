import { Avatar, Input, Button, DialogueMenuItem } from "../../components";

import plus from "../../assets/images/plus.svg"
import cross from "../../assets/images/cross.svg"
import trash from "../../assets/images/trash.svg"

import Block from "../../core/block";

interface Message {
  id: string;
  senderId: string;
  content: string | null;
  timestamp: string;
  type: string;
  attachment: { url: string } | null;
}

interface Participant {
  id: string;
  name: string;
  avatarUrl: string;
}

interface Conversation {
  id: number;
  participants: Participant[];
  messages: Message[];
}

interface DialogueProps {
  info: {
    name: string;
    conversation: Conversation;
  };
  onAddUserClick: () => void;
  onShowConfirmationDialog: () => void;
  onShowDeleteUserDialog: () => void;
}

export default class Dialogue extends Block {
  constructor(props: DialogueProps) {
    super("div", {
      ...props,
      attrs: {
        class: "dialogue"
      },
      Avatar: new Avatar({
        image: props.info.conversation.participants[0].avatarUrl,
        size: "small",
        change: false,
      }),
      DialogueMenuItemAdd: new DialogueMenuItem({
        image: plus,
        text: "Добавить пользователя",
        onClick: (e: Event) => {
          e.preventDefault();
          props.onAddUserClick();
        }
      }),
      DialogueMenuItemDelete: new DialogueMenuItem({
        image: cross,
        text: "Удалить пользователя", 
        onClick: (e: Event) => {
          e.preventDefault();
          props.onShowDeleteUserDialog();
        }
      }),
      DialogueMenuItemConfirm: new DialogueMenuItem({
        image: trash,
        text: "Удалить чат", 
        onClick: (e: Event) => {
          e.preventDefault();
          props.onShowConfirmationDialog();
        }
      }),
      MessageInput: new Input({
        label: "",
        placeholder: "Сообщение",
        name: "message",
        type: "text",
        className: "send-message__text",
        wrapperClass: "input--message",
      }),
      SendButton: new Button({
        style: "arrow",
        side: "right",
        onClick: (e: Event) => {
          e.preventDefault();
        }
      }),
      MenuButton: new Button({
        style: "dialogue-menu",
        onClick: (e: Event) => {
          e.preventDefault();
          this.setProps({
            isDialogueMenuVisible: !this.props.isDialogueMenuVisible
          });
        }
      }),
      isDialogueMenuVisible: false
    });
  }

  render(): string {
    const { info } = (this.props as unknown) as DialogueProps;
    const conversation = info.conversation;
    const name = info.name;
    return `
      <div class="dialogue__partner">
        {{{ Avatar }}}
        <div class="dialogue__name">
          ${name}
        </div>
        {{{ MenuButton }}}
        {{#if isDialogueMenuVisible}}
          <div class="dialogue__menu_wrapper">
            {{{ DialogueMenuItemAdd }}}
            {{{ DialogueMenuItemDelete }}}
            {{{ DialogueMenuItemConfirm }}}
          </div>
        {{/if}}
      </div>
      <div class="dialogue__messages">
        <div class="message__date"></div>
        ${conversation.messages.map(message => `
          <div class="message ${message.senderId === 'partner' ? 'partner-message' : 'user-message'} ${message.type === 'image' ? 'message__image' : ''}">
            ${message.type === 'text' ? message.content : `<img src="${message.attachment?.url}" alt="Изображение">`}
            <span class="message-datetime">
              ${new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>`).join('')}
      </div>
      <form class="dialogue__send-message">
        {{{ MessageInput }}}
        {{{ SendButton }}}
      </form>
    `;
  }
}
