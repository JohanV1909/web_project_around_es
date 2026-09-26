export class Popup {
    constructor(popupSelector) {
        this.handleEscClose = (evt) => {
            if (evt.key === "Escape") {
                this.close();
            }
        };
        const popupElement = document.querySelector(popupSelector);
        if (!popupElement) {
            throw new Error(`No se encontró el popup: ${popupSelector}`);
        }
        this.popupElement = popupElement;
    }
    open() {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    setEventListeners() {
        const closeButton = this.popupElement.querySelector(".popup__close");
        closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener("click", () => {
            this.close();
        });
        this.popupElement.addEventListener("mousedown", (evt) => {
            if (evt.target === this.popupElement) {
                this.close();
            }
        });
    }
}
