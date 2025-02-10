import EventBus from './eventBus';

export enum StoreEvents {
  Updated = 'Updated'
}

interface StoreState {
  [key: string]: unknown;
}

export class Store extends EventBus<StoreEvents> {
  private state: StoreState = {};
  private static __instance: Store | null = null;

  constructor(defaultState: StoreState) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState: StoreState) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };
    //console.log("prevState", prevState);
    //console.log("nextState", nextState);
    this.emit(StoreEvents.Updated, prevState, nextState);
  }

  public get(key: string) {
    const result: unknown = this.state[key] as unknown;
    return result
  }
}

