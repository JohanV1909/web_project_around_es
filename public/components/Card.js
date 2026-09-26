export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this.name = data.name;
        this.link = data.link;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        var _a;
        const template = document.querySelector(this.templateSelector);
        if (!template) {
            throw new Error(`No se encontró la plantilla: ${this.templateSelector}`);
        }
        const cardElement = (_a = template.content
            .querySelector(".card")) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
        return cardElement;
    }
    setEventListeners(cardElement) {
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        const cardImage = cardElement.querySelector(".card__image");
        if (likeButton) {
            likeButton.addEventListener("click", () => {
                likeButton.classList.toggle("card__like-button_is-active");
            });
        }
        if (deleteButton) {
            deleteButton.addEventListener("click", () => {
                cardElement.remove();
            });
        }
        if (cardImage) {
            cardImage.addEventListener("click", () => {
                this.handleCardClick(this.name, this.link);
            });
        }
    }
    generateCard() {
        const cardElement = this.getTemplate();
        const cardImage = cardElement.querySelector(".card__image");
        const cardTitle = cardElement.querySelector(".card__title");
        if (cardImage) {
            cardImage.src = this.link;
            cardImage.alt = this.name;
        }
        if (cardTitle) {
            cardTitle.textContent = this.name;
        }
        this.setEventListeners(cardElement);
        return cardElement;
    }
}
