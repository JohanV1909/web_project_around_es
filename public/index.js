var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { UserInfo } from "./components/UserInfo.js";
import { Api } from "./components/Api.js";
import { apiToken } from "./config.local.js";
const apiBaseUrl = "https://around-api.es.tripleten-services.com/v1";
let currentUserId = "";
const api = new Api({
    baseUrl: apiBaseUrl,
    headers: {
        authorization: apiToken,
        "Content-Type": "application/json",
    },
});
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar-button");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__description",
});
const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield api.updateUserInfo({
        name: inputValues.name,
        about: inputValues.description,
    });
    userInfo.setUserInfo(userData);
}));
editProfilePopup.setEventListeners();
const editProfileForm = document.querySelector("#edit-profile-form");
if (!editProfileForm) {
    throw new Error("No se encontró el formulario de editar perfil");
}
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => __awaiter(void 0, void 0, void 0, function* () {
    const cardData = yield api.addCard({
        name: inputValues["place-name"],
        link: inputValues.link,
    });
    renderCard(cardData);
}));
newCardPopup.setEventListeners();
const avatarPopup = new PopupWithForm("#avatar-popup", (inputValues) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield api.updateAvatar(inputValues.avatar);
    const avatarImage = document.querySelector(".profile__image");
    if (avatarImage) {
        avatarImage.src = userData.avatar;
    }
}));
avatarPopup.setEventListeners();
const newCardForm = document.querySelector("#new-card-form");
if (!newCardForm) {
    throw new Error("No se encontró el formulario de nueva tarjeta");
}
const avatarForm = document.querySelector("#avatar-form");
if (!avatarForm) {
    throw new Error("No se encontró el formulario de editar avatar");
}
const editProfileValidator = new FormValidator(defaultFormConfig, editProfileForm);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);
const avatarValidator = new FormValidator(defaultFormConfig, avatarForm);
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const confirmationPopup = new PopupWithConfirmation("#delete-popup");
confirmationPopup.setEventListeners();
const cardSection = new Section({
    items: [],
    renderer: (item) => {
        renderCard(item);
    },
}, ".cards__list");
editProfileButton === null || editProfileButton === void 0 ? void 0 : editProfileButton.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    if (nameInput && descriptionInput) {
        nameInput.value = currentUserInfo.name;
        descriptionInput.value = currentUserInfo.about;
    }
    editProfileValidator.resetValidation();
    editProfilePopup.open();
});
addCardButton === null || addCardButton === void 0 ? void 0 : addCardButton.addEventListener("click", () => {
    newCardValidator.resetValidation();
    newCardPopup.open();
});
avatarButton === null || avatarButton === void 0 ? void 0 : avatarButton.addEventListener("click", () => {
    avatarValidator.resetValidation();
    avatarPopup.open();
});
function renderCard(data) {
    const card = new Card(data, currentUserId, "#card-template", (name, link) => {
        imagePopup.open(name, link);
    }, (cardId) => __awaiter(this, void 0, void 0, function* () {
        confirmationPopup.setSubmitAction(() => __awaiter(this, void 0, void 0, function* () {
            yield api.deleteCard(cardId);
            card.removeCard();
            confirmationPopup.close();
        }));
        confirmationPopup.open();
    }), (cardId, isLiked) => __awaiter(this, void 0, void 0, function* () {
        if (isLiked) {
            return yield api.unlikeCard(cardId);
        }
        else {
            return yield api.likeCard(cardId);
        }
    }));
    const cardElement = card.generateCard();
    cardSection.addItem(cardElement);
}
cardSection.renderItems();
editProfileValidator.enableValidation();
newCardValidator.enableValidation();
avatarValidator.enableValidation();
function loadInitialData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [userData, cardsData] = yield Promise.all([
                api.getUserInfo(),
                api.getInitialCards(),
            ]);
            currentUserId = userData._id;
            userInfo.setUserInfo(userData);
            cardSection.clear();
            cardsData.forEach((card) => {
                renderCard(card);
            });
        }
        catch (err) {
            console.error("Error al cargar los datos iniciales:", err);
        }
    });
}
loadInitialData();
