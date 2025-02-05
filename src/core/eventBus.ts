type Callback<T extends unknown[] = unknown[]> = (...args: T) => void;

export default class EventBus<E extends string> {
  private listeners: Record<E, Callback<unknown[]>[]>;

  constructor() {
    this.listeners = {} as Record<E, Callback<unknown[]>[]>;
  }

  on<T extends unknown[]>(event: E, callback: Callback<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback as Callback<unknown[]>);
  }

  off<T extends unknown[]>(event: E, callback: Callback<T>): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit<T extends unknown[]>(event: E, ...args: T): void {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args as unknown[]);
    });
  }
}
