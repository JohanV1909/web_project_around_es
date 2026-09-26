import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
private popupImage: HTMLImageElement;
private popupCaption: HTMLElement;

constructor(popupSelector: string) {
  super(popupSelector);

  const popupImage =
  this.popupElement.querySelector<HTMLImageElement>(".popup__image");

  if (!popupImage) {
  throw new Error("No se encontró la imagen del popup");
}

this.popupImage = popupImage;

const popupCaption =
  this.popupElement.querySelector<HTMLElement>(".popup__caption");

  if (!popupCaption) {
  throw new Error("No se encontró la leyenda del popup");
}

this.popupCaption = popupCaption;
}

public open(name?: string, link?: string): void {
if (name && link) {
  this.popupImage.src = link;
  this.popupImage.alt = name;
  this.popupCaption.textContent = name;
}
  super.open();
}

public setEventListeners(): void {
  super.setEventListeners();
}
}