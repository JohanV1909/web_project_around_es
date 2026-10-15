import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
 private submitAction: (() => void) | null = null;   
 constructor(popupSelector: string) {
  super(popupSelector);
}

public setSubmitAction(action: () => void): void {
  this.submitAction = action;
}

public setEventListeners(): void {
  super.setEventListeners();

  const form = this.popupElement.querySelector<HTMLFormElement>("#delete-form");

form?.addEventListener("submit", (evt: SubmitEvent) => {
  evt.preventDefault();

  if (this.submitAction) {
    this.submitAction();
  }
});
}

}