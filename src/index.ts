import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Card } from "./components/Card.js";
import type { CardData } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { UserInfo } from "./components/UserInfo.js";
import { Api } from "./components/Api.js";
import { apiToken } from "./config.local.js";

const apiBaseUrl = "https://around-api.es.tripleten-services.com/v1";

let currentUserId: string = "";

const api = new Api({
  baseUrl: apiBaseUrl,
  headers: {
    authorization: apiToken,
    "Content-Type": "application/json",
  },
});


const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const avatarButton = document.querySelector<HTMLButtonElement>(
  ".profile__avatar-button"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  async (inputValues): Promise<void> => {
    const userData = await api.updateUserInfo({
      name: inputValues.name,
      about: inputValues.description,
    });

    userInfo.setUserInfo(userData);
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
  async (inputValues): Promise<void> => {
    const cardData = await api.addCard({
      name: inputValues["place-name"],
      link: inputValues.link,
    });

    renderCard(cardData);
  }
);

newCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  "#avatar-popup",
  async (inputValues): Promise<void> => {
    const userData = await api.updateAvatar(inputValues.avatar);

    const avatarImage =
      document.querySelector<HTMLImageElement>(".profile__image");

    if (avatarImage) {
      avatarImage.src = userData.avatar;
    }
  }
);

avatarPopup.setEventListeners();

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

const confirmationPopup = new PopupWithConfirmation("#delete-popup");
confirmationPopup.setEventListeners();

const cardSection = new Section<CardData>(
  {
    items: [],
    renderer: (item) => {
    renderCard(item);
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

avatarButton?.addEventListener("click", () => {
  avatarPopup.open();
});

function renderCard(data: CardData): void {
  const card = new Card(
    data,
      currentUserId,
    "#card-template",
    (name, link) => {
      imagePopup.open(name, link);
    },
   async (cardId) => {
 confirmationPopup.setSubmitAction(async () => {
  await api.deleteCard(cardId);
  card.removeCard();
  confirmationPopup.close();
});

  confirmationPopup.open();
},
    async (cardId, isLiked) => {
      if (isLiked) {
        return await api.unlikeCard(cardId);
      } else {
        return await api.likeCard(cardId);
      }
    }
  );

  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
}

cardSection.renderItems();


editProfileValidator.enableValidation();
newCardValidator.enableValidation();


async function loadInitialData(): Promise<void> {
  try {
    const [userData, cardsData] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);

    currentUserId = userData._id;

  userInfo.setUserInfo(userData);
cardSection.clear();
cardsData.forEach((card) => {
  renderCard(card);
});
  } catch (err) {
    console.error("Error al cargar los datos iniciales:", err);
  }
}

loadInitialData();