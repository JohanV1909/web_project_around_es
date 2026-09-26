import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        const popupImage = this.popupElement.querySelector(".popup__image");
        if (!popupImage) {
            throw new Error("No se encontró la imagen del popup");
        }
        this.popupImage = popupImage;
        const popupCaption = this.popupElement.querySelector(".popup__caption");
        if (!popupCaption) {
            throw new Error("No se encontró la leyenda del popup");
        }
        this.popupCaption = popupCaption;
    }
    open(name, link) {
        if (name && link) {
            this.popupImage.src = link;
            this.popupImage.alt = name;
            this.popupCaption.textContent = name;
        }
        super.open();
    }
    setEventListeners() {
        super.setEventListeners();
    }
}
