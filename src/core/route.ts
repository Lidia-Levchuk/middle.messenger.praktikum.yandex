import { RouteInterface } from "./router";
import Block from "./block";

class Route implements RouteInterface {

  private _pathname: string;
  private _blockClass: new (...args: any[]) => Block;
  private _block: Block | null = null;
  private _props: { rootQuery: string };

  constructor(pathname: string, view: new (...args: any[]) => Block, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  getPathname(): string {
    return this._pathname;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.componentDidUnmount();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  _renderDom(query: string, block: Block) {
    const root = document.querySelector<HTMLElement>(query);
    if (root) {
      const content = block.getContent();
      if (content) {
        root.append(content);
      } else {
        console.error("Блока нет. Ничего не добавлено.");
      }
    } else {
      console.error(`Элемент "${query}" не найден.`);
    }
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
    }

    this._renderDom(this._props.rootQuery, this._block);
    this._block.dispatchComponentDidMount();
  }
}

export default Route;
