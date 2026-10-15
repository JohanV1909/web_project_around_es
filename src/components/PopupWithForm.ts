import { Popup } from "./Popup.js";

type SubmitHandler = (
  inputValues: Record<string, string>
) => void | Promise<void>;

export class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private submitButton: HTMLButtonElement;
  private originalButtonText: string;
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
    const submitButton =
  this.formElement.querySelector<HTMLButtonElement>(
    'button[type="submit"]'
  );

if (!submitButton) {
  throw new Error("No se encontró el botón de envío del formulario");
}

this.submitButton = submitButton;
this.originalButtonText = submitButton.textContent ?? "";
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

this.formElement.addEventListener(
  "submit",
  async (evt: SubmitEvent): Promise<void> => {
    evt.preventDefault();

    const inputValues = this.getInputValues();
    
    this.submitButton.textContent = "Guardando...";

   try {
  await this.handleFormSubmit(inputValues);
  this.close();
} catch (err) {
  console.error("Error al enviar el formulario:", err);
} finally {
  this.submitButton.textContent = this.originalButtonText;
}
  }
);
}

public close(): void {
  super.close();
  this.formElement.reset();
}
}