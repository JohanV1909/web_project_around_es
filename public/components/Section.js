export class Section {
    constructor({ items, renderer }, containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            throw new Error(`No se encontró el contenedor: ${containerSelector}`);
        }
        this.items = items;
        this.renderer = renderer;
        this.container = container;
    }
    renderItems() {
        this.items.forEach((item) => {
            this.renderer(item);
        });
    }
    addItem(element) {
        this.container.append(element);
    }
}
