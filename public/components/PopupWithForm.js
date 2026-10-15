var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        var _a;
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        const formElement = this.popupElement.querySelector(".popup__form");
        if (!formElement) {
            throw new Error("No se encontró el formulario del popup");
        }
        this.formElement = formElement;
        const submitButton = this.formElement.querySelector('button[type="submit"]');
        if (!submitButton) {
            throw new Error("No se encontró el botón de envío del formulario");
        }
        this.submitButton = submitButton;
        this.originalButtonText = (_a = submitButton.textContent) !== null && _a !== void 0 ? _a : "";
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
        const _super = Object.create(null, {
            setEventListeners: { get: () => super.setEventListeners }
        });
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const inputValues = this.getInputValues();
            this.submitButton.textContent = "Guardando...";
            try {
                yield this.handleFormSubmit(inputValues);
                this.close();
            }
            catch (err) {
                console.error("Error al enviar el formulario:", err);
            }
            finally {
                this.submitButton.textContent = this.originalButtonText;
            }
        }));
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
