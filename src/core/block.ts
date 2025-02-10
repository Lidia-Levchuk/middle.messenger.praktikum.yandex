import { nanoid } from "nanoid";
import Handlebars from "handlebars";
import EventBus from "./eventBus";
import isEqual from '../utils/isEqual';
interface Props {
  className?: string;
  attrs?: Record<string, string>;
  events?: Record<string, (event: Event) => void>;
  [key: string]: unknown;
}

interface Meta {
  tagName: string;
  props: Props;
}

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CDUN: "flow:component-did-unmount",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement | null = null;

  private _meta: Meta | null = null;

  private _id: string = nanoid(6);

  protected props: Props;

  protected children: Record<string, Block | Block[]>;

  private eventBus: () => EventBus<string>;

  constructor(tagName = "div", propsWithChildren: Record<string, unknown> = {}) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus<string>): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    //eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDUN, this._componentDidUnmount.bind(this));
  }

  private _createResources(): void {
    const meta = this._meta;
    if (!meta) return;

    const { tagName, props } = meta;
    this._element = this._createHTMLElement(tagName);

    if (typeof props.className === "string") {
      const classes = props.className.split(" ");
      this._element.classList.add(...classes);
    }

    if (typeof props.attrs === "object") {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        if (this._element) {
          this._element.setAttribute(attrName, attrValue);
        }
      });
    }
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _getChildrenAndProps(propsAndChildren: Record<string, unknown>): { children: Record<string, Block | Block[]>; props: Props } {
    const children: Record<string, Block | Block[]> = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            const childBlocks: Block[] = value.filter(obj => obj instanceof Block);

            if (childBlocks.length > 0) {
                children[key] = childBlocks;
            }
            const nonBlockElements = value.filter(obj => !(obj instanceof Block));
            if (nonBlockElements.length > 0) {
                props[key] = nonBlockElements.length === 1 ? nonBlockElements[0] : nonBlockElements;
            }
        } else if (value instanceof Block) {
            children[key] = value;
        } else {
            props[key] = value;
        }
    });

    return { children, props };
  }

  //private _componentDidMount(): void {
    //this.componentDidMount();
  //}

  //componentDidMount(oldProps?: Props): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const needUpdate = !isEqual(oldProps, newProps);
    //console.log('componentDidUpdate', needUpdate)
    return needUpdate;
  }

  protected updateChildrenProps(children: Block | Block[], props: Props) {
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (child instanceof Block) {
          child.setProps(props);
        }
      });
    } else if (children instanceof Block) {
      children.setProps(props);
    }
  }
  
  setProps = (nextProps: Props | undefined): void => {
    if (!nextProps) {
      return;
    }
  
    Object.entries(nextProps).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        this.updateChildrenProps(value, {});
      } else if (value instanceof Block) {
        this.updateChildrenProps(value, {});
      } else {
        this.props[key] = value;
      }
    });
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props;

      Object.keys(events).forEach((eventName) => {
        if (this._element) {
          this._element.removeEventListener(eventName, events[eventName]);
        }
      });
  }

  private _compile() {
    const propsAndStubs = { ...this.props };
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((component) => `<div data-id="${component._id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createTemplateElement();
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
          if (stub) {
            const content = component.getContent();
            if (content) {
              stub.replaceWith(content);
            }
          }
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        if (stub) {
          const content = child.getContent();
          if (content) {
            stub.replaceWith(content);
          }
        }
      }
    });

    return fragment.content;
  }

  private _render(): void {
    this._removeEvents();
    const block = this._compile();
    if (this._element && this._element.children.length === 0) {
      this._element.appendChild(block);
    } else if (this._element) {
      this._element.replaceChildren(block);
    }
    this._addEvents();
  }

  render(): string {
    return "";
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: Props): Props {
    const eventBus = this.eventBus();
    const emitBind = eventBus.emit.bind(eventBus);
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createTemplateElement(): HTMLTemplateElement {
    return document.createElement("template");
  }

  private _createHTMLElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute("data-id", this._id);
    return element;
  }

  private _componentDidUnmount(): void {
    this._removeEvents();
  }

  public componentDidUnmount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDUN);
    if (this._element && this._element.parentNode) {
      this._element.parentNode.removeChild(this._element);
    }
  }

  show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
