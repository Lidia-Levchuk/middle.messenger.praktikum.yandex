import { StoreEvents } from "../core/store";
import isEqual from './isEqual';
import Block from '../core/block'

interface StoreState {
  [key: string]: unknown;
}

type MapStateToProps<S extends StoreState> = (state: S) => Partial<S>;

export function connect<S extends StoreState>(mapStateToProps: MapStateToProps<S>) {
  return function(Component: new (...args: any[]) => Block) {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props: Omit<S, 'router'> & { router?: unknown }) {
        const store = window.store;

        let state: Partial<S> = mapStateToProps(store.getState() as S);

        super({...props, ...state});

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState() as S);

          if (!isEqual(state, newState)) {
            this.setProps({...newState});
          }
          //console.log('state', state);
          //console.log('newState', newState);
          state = newState;
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentDidUnmount() {
        super.componentDidUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
