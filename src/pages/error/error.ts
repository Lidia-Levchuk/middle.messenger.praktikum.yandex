import { Title, Button } from "../../components";

import Block from "../../core/block";
import Router from "../../core/router";
import { UNAUTH_ROUTES, AUTH_ROUTES, MAIN_ROUTS } from "../../constants"
import { withRouter } from "../../utils/withRouter"

class Error extends Block {
  constructor(props: Record<string, unknown>) {

    const { title, text } = window.store.getState().errorPageContext;

    super("div", {
      ...props,
      attrs: {
        class: "container",
      },
      ErrorTitle: new Title({
        text: title || "",
        size: "large",
      }),
      ErrorSubtitle: new Title({
        text: text || "",
        size: "normal",
      }),
      BackButton: new Button({
        style: "secondary",
        label: "Назад",
        onClick: (e: Event) => {
          e.preventDefault();
          const isLoggedIn = window.store.get("isLoggedIn");
          const router = props.router as Router;
      
          if (window.history.length > 1) {
            router.back();
            return;
          }
          const unauth_route = UNAUTH_ROUTES.find(unauth_route => unauth_route.component === MAIN_ROUTS.unauth);
          const auth_route = AUTH_ROUTES.find(auth_route => auth_route.component === MAIN_ROUTS.unauth);
          if (auth_route && unauth_route) {
            const redirectPath = isLoggedIn ? auth_route.path : unauth_route.path;
            console.log('4 go');
            router.go(redirectPath);
          }
        }
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

export default withRouter(Error)
