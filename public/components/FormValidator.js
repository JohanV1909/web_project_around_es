export class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
    }
    showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.config.inputErrorClass);
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add(this.config.errorClass);
        }
    }
    hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.config.inputErrorClass);
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.classList.remove(this.config.errorClass);
        }
    }
    checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this.hideInputError(inputElement);
        }
    }
    hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    toggleButtonState(inputList, buttonElement) {
        if (this.hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
            buttonElement.classList.add(this.config.inactiveButtonClass);
        }
        else {
            buttonElement.disabled = false;
            buttonElement.classList.remove(this.config.inactiveButtonClass);
        }
    }
    setEventListeners() {
        const inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        const buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
        if (!buttonElement) {
            return;
        }
        this.toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (event) => {
                const target = event.target;
                this.checkInputValidity(target);
                this.toggleButtonState(inputList, buttonElement);
            });
        });
    }
    enableValidation() {
        this.setEventListeners();
    }
    resetValidation() {
        const inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        const buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
        inputList.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
        if (buttonElement) {
            this.toggleButtonState(inputList, buttonElement);
        }
    }
}
