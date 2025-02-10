import Block from '../core/block'
import Router from '../core/router';

interface WithRouterProps {
  router: Router;
}

export function withRouter<T extends Omit<WithRouterProps, 'router'>>(WrappedBlock: new (props: T) => Block) {
  return class extends WrappedBlock {
    constructor(props: T) {
      super({ ...props, router: window.router });
    }
  };
}
