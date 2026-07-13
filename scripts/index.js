const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector("#edit-popup");
const editProfileForm = document.querySelector("#edit-profile-form");
const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
const descriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description",
);

const newCardPopup = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const cardNameInput = newCardPopup.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const cardsList = document.querySelector(".cards__list");

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openPopup(editProfilePopup);
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(editProfilePopup);
});

addCardButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});

function createCard(name, link) {
  const cardElement = document.createElement("li");
  cardElement.classList.add("card");

  cardElement.innerHTML = `
    <img
      class="card__image"
      src="${link}"
      alt="${name}"
    />

    <button
      aria-label="Eliminar tarjeta"
      class="card__delete-button"
      type="button"
    ></button>

    <div class="card__description">
      <h2 class="card__title"></h2>

      <button
        aria-label="Botón Me gusta"
        class="card__like-button"
        type="button"
      ></button>
    </div>
  `;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;

  addCardListeners(cardElement);

  return cardElement;
}

function addCardListeners(cardElement) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;

    openPopup(imagePopup);
  });
}

newCardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  const newCard = createCard(cardName, cardLink);

  cardsList.prepend(newCard);
  newCardForm.reset();
  closePopup(newCardPopup);
});

const initialCards = document.querySelectorAll(".card");

initialCards.forEach((cardElement) => {
  addCardListeners(cardElement);
});

const popupCloseButtons = document.querySelectorAll(".popup__close");

popupCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const popup = closeButton.closest(".popup");
    closePopup(popup);
  });
});

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});
