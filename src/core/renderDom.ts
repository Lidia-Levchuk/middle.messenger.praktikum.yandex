import Block from "./block";

export function render(query: string, block: Block): HTMLElement | null {
  const root = document.querySelector(query);

  if (root instanceof HTMLElement) {
    root.innerHTML = "";
    root.appendChild(block.getContent() as Node);

    block.dispatchComponentDidMount();
  } else {
    console.warn(`Element with selector "${query}" not found.`);
    return null;
  }

  return root;
}
