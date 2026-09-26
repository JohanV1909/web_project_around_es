import { Popup } from "./Popup.js";

type SubmitHandler = (inputValues: Record<string, string>) => void;

export class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private handleFormSubmit: SubmitHandler;
constructor(
  popupSelector: string,
  handleFormSubmit: SubmitHandler
) {
    super(popupSelector);

    this.handleFormSubmit = handleFormSubmit;

    const formElement =
      this.popupElement.querySelector<HTMLFormElement>(".popup__form");

    if (!formElement) {
      throw new Error("No se encontró el formulario del popup");
    }

    this.formElement = formElement;
  }

  private getInputValues(): Record<string, string> {
  const inputValues: Record<string, string> = {};

  const inputs =
    this.formElement.querySelectorAll<HTMLInputElement>(".popup__input");

  inputs.forEach((input) => {
    inputValues[input.name] = input.value;
  });

  return inputValues;
}

public setEventListeners(): void {
 super.setEventListeners();

  this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
    evt.preventDefault();

    const inputValues = this.getInputValues();
    this.handleFormSubmit(inputValues);
    this.close();
  });
}

public close(): void {
  super.close();
  this.formElement.reset();
}
}