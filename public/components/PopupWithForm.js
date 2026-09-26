import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        const formElement = this.popupElement.querySelector(".popup__form");
        if (!formElement) {
            throw new Error("No se encontró el formulario del popup");
        }
        this.formElement = formElement;
    }
    getInputValues() {
        const inputValues = {};
        const inputs = this.formElement.querySelectorAll(".popup__input");
        inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const inputValues = this.getInputValues();
            this.handleFormSubmit(inputValues);
            this.close();
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
