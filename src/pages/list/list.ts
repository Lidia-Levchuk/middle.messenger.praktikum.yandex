import { Button, Input, ListUser, Dialogue, ConfirmationDialog, AddUserDialog, DeleteUserDialog } from "../../components";

import usersList from "./usersList"
import dialogueInfo from "./dialogueInfo"

import Block from "../../core/block";

export default class List extends Block {
  constructor(props: Record<string, unknown>) {
    super("div", {
      ...props,
      attrs: {
        class: "list"
      },
      BackButton: new Button({
        style: "list-arrow",
        label: "Профиль",
        side: "left",
        page: "profile",
      }),
      SearchInput: new Input({
        label: "",
        placeholder: "Поиск",
        name: "search",
        type: "text",
        wrapperClass: "input--search",
      }),
      ListUser: new ListUser({
        users: usersList,
        onUserClick: () => {
          this.setProps({
            isDialogueOpen: true,
          });
        },
      }),
      ConfirmationDialog: new ConfirmationDialog({
        onOk: (e: Event) => {
          e.preventDefault();

          this.setProps({
            showConfirmationDialog: false
          })
        },
        onCancel: (e: Event) => {
          e.preventDefault();

          this.setProps({
            showConfirmationDialog: false
          })
        }
      }),
      AddUserDialog: new AddUserDialog({
        onOk: () => {
          this.setProps({
            showAddUserDialog: false
          })
        }
      }),
      DeleteUserDialog: new DeleteUserDialog({
        onOk: (e: Event) => {
          e.preventDefault();

          this.setProps({
            showDeleteUserDialog: false
          })
        }
      }),
      showAddUserDialog: false,
      showDeleteUserDialog: false,
      showConfirmationDialog: false,
      isDialogueOpen: false,

      Dialogue: new Dialogue({
        info: dialogueInfo,
        onAddUserClick: () => {
          this.setProps({
            showAddUserDialog: true,
          });
        },
        onShowDeleteUserDialog: () => {
          this.setProps({
            showDeleteUserDialog: true
          });
        },
        onShowConfirmationDialog: () => {
          this.setProps({
            showConfirmationDialog: true
          });
        },
      }),
    });
  }

  render(): string {
    return `
      <div class="list__wrapper">
        <div class="list__left-side">
          {{{ BackButton }}}
          <form class="list__form">
            {{{ SearchInput }}}
          </form>
          {{{ ListUser }}}
        </div>
        <div class="list__right-side">
          {{#if isDialogueOpen}}
            {{{ Dialogue }}}
          {{else}}
            <div class="list__stub">
              Выберите чат, чтобы отправить сообщение
            </div>
          {{/if}}
        </div>
      </div>
      
      {{#if showAddUserDialog}}
        {{{ AddUserDialog }}}
      {{/if}}
      {{#if showDeleteUserDialog}}
        {{{ DeleteUserDialog }}}
      {{/if}}
      {{#if showConfirmationDialog}}
        {{{ ConfirmationDialog }}}
      {{/if}}
    `;
  }
}
