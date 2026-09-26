export class Popup {
  protected popupElement: HTMLElement;

  constructor(popupSelector: string) {
    const popupElement =
      document.querySelector<HTMLElement>(popupSelector);

    if (!popupElement) {
      throw new Error(`No se encontró el popup: ${popupSelector}`);
    }

    this.popupElement = popupElement;
  }

  public open(): void {
   this.popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  public close(): void {
 this.popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", this.handleEscClose);
}

private handleEscClose = (evt: KeyboardEvent): void => {
  if (evt.key === "Escape") {
    this.close();
  }
};

public setEventListeners(): void {
  const closeButton =
    this.popupElement.querySelector<HTMLButtonElement>(".popup__close");

  closeButton?.addEventListener("click", () => {
    this.close();
  });
this.popupElement.addEventListener("mousedown", (evt: MouseEvent) => {
  if (evt.target === this.popupElement) {
    this.close();
  }
});

}
}