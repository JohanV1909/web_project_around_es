import { FormValidator } from "./components/FormValidator.js";
import {
  defaultFormConfig,
  initialCards,
} from "./utils/constants.js";
import { Card } from "./components/Card.js";
import type { CardData } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";


const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  (inputValues) => {
    userInfo.setUserInfo({
      name: inputValues.name,
      about: inputValues.description,
    });
  }
);

editProfilePopup.setEventListeners();

const editProfileForm =
  document.querySelector<HTMLFormElement>("#edit-profile-form");

if (!editProfileForm) {
  throw new Error("No se encontró el formulario de editar perfil");
}

const nameInput =
  document.querySelector<HTMLInputElement>(".popup__input_type_name");

const descriptionInput =
  document.querySelector<HTMLInputElement>(".popup__input_type_description");

const newCardPopup = new PopupWithForm(
  "#new-card-popup",
  (inputValues) => {
    renderCard(inputValues["place-name"], inputValues.link);
  }
);

newCardPopup.setEventListeners();

const newCardForm =
  document.querySelector<HTMLFormElement>("#new-card-form");

if (!newCardForm) {
  throw new Error("No se encontró el formulario de nueva tarjeta");
}

const editProfileValidator = new FormValidator(
  defaultFormConfig,
  editProfileForm,
);

const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const cardSection = new Section<CardData>(
  {
    items: initialCards,
    renderer: (item) => {
      renderCard(item.name, item.link);
    },
  },
  ".cards__list"
);


editProfileButton?.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  if (nameInput && descriptionInput) {
    nameInput.value = currentUserInfo.name;
    descriptionInput.value = currentUserInfo.about;
  }

  editProfileValidator.resetValidation();
  editProfilePopup.open();
});


addCardButton?.addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});

function renderCard(name: string, link: string): void {
  const card = new Card({ name, link }, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });

  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
}


cardSection.renderItems();


editProfileValidator.enableValidation();
newCardValidator.enableValidation();
