export class Section<T> {
  private container: HTMLElement;
  private items: T[];
  private renderer: (item: T) => void;

  constructor(
  { items, renderer }: { items: T[]; renderer: (item: T) => void },
  containerSelector: string
) {
    const container = document.querySelector<HTMLElement>(containerSelector);

    if (!container) {
      throw new Error(`No se encontró el contenedor: ${containerSelector}`);
    }

    this.items = items;
    this.renderer = renderer;
    this.container = container;
  }

public renderItems(): void {
  this.items.forEach((item) => {
    this.renderer(item);
  });
}

public addItem(element: HTMLElement): void {
  this.container.append(element);
}

}