export interface FormConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export class FormValidator {
  private config: FormConfig;
  private formElement: HTMLFormElement;

  constructor(config: FormConfig, formElement: HTMLFormElement) {
    this.config = config;
    this.formElement = formElement;
  }

  private showInputError(
    inputElement: HTMLInputElement,
    errorMessage: string,
  ): void {
    const errorElement = this.formElement.querySelector<HTMLElement>(
      `.${inputElement.id}-error`,
    );

    inputElement.classList.add(this.config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this.config.errorClass);
    }
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.formElement.querySelector<HTMLElement>(
      `.${inputElement.id}-error`,
    );

    inputElement.classList.remove(this.config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this.config.errorClass);
    }
  }
  private checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  private hasInvalidInput(inputList: HTMLInputElement[]): boolean {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  private toggleButtonState(
    inputList: HTMLInputElement[],
    buttonElement: HTMLButtonElement,
  ): void {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this.config.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this.config.inactiveButtonClass);
    }
  }

  private setEventListeners(): void {
    const inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(
        this.config.inputSelector,
      ),
    );

    const buttonElement = this.formElement.querySelector<HTMLButtonElement>(
      this.config.submitButtonSelector,
    );

    if (!buttonElement) {
      return;
    }

    this.toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (event: Event) => {
        const target = event.target as HTMLInputElement;

        this.checkInputValidity(target);
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  }

  public enableValidation(): void {
    this.setEventListeners();
  }

  public resetValidation(): void {
    const inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(
        this.config.inputSelector,
      ),
    );

    const buttonElement = this.formElement.querySelector<HTMLButtonElement>(
      this.config.submitButtonSelector,
    );

    inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });

    if (buttonElement) {
      this.toggleButtonState(inputList, buttonElement);
    }
  }
}
