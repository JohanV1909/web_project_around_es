var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Card {
    constructor(data, currentUserId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this.cardElement = null;
        this.id = data._id;
        this.isLiked = data.isLiked;
        this.owner = data.owner;
        this.currentUserId = currentUserId;
        this.name = data.name;
        this.link = data.link;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.handleDeleteClick = handleDeleteClick;
        this.handleLikeClick = handleLikeClick;
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
        if (deleteButton && this.owner !== this.currentUserId) {
            deleteButton.remove();
        }
        const cardImage = cardElement.querySelector(".card__image");
        if (likeButton) {
            likeButton.classList.toggle("card__like-button_is-active", this.isLiked);
            likeButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const updatedCard = yield this.handleLikeClick(this.id, this.isLiked);
                    this.isLiked = updatedCard.isLiked;
                    likeButton.classList.toggle("card__like-button_is-active", this.isLiked);
                }
                catch (err) {
                    console.error("Error al actualizar el like:", err);
                }
            }));
        }
        if (deleteButton) {
            deleteButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.handleDeleteClick(this.id);
                }
                catch (err) {
                    console.error("Error al eliminar la tarjeta:", err);
                }
            }));
        }
        if (cardImage) {
            cardImage.addEventListener("click", () => {
                this.handleCardClick(this.name, this.link);
            });
        }
    }
    removeCard() {
        var _a;
        (_a = this.cardElement) === null || _a === void 0 ? void 0 : _a.remove();
    }
    generateCard() {
        const cardElement = this.getTemplate();
        this.cardElement = cardElement;
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
