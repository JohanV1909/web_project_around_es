import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.submitAction = null;
    }
    setSubmitAction(action) {
        this.submitAction = action;
    }
    setEventListeners() {
        super.setEventListeners();
        const form = this.popupElement.querySelector("#delete-form");
        form === null || form === void 0 ? void 0 : form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            if (this.submitAction) {
                this.submitAction();
            }
        });
    }
}
