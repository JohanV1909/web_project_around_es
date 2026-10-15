export interface CardFormData {
  name: string;
  link: string;
}

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export class Card {
  private id: string;
  private owner: string;
  private currentUserId: string;
  private cardElement: HTMLElement | null = null;
  private isLiked: boolean;
  private name: string;
  private link: string;
  private templateSelector: string;

  private handleCardClick: (name: string, link: string) => void;
  private handleDeleteClick: (cardId: string) => Promise<void>;
  private handleLikeClick: (
    cardId: string,
    isLiked: boolean
  ) => Promise<CardData>;

  constructor(
    data: CardData,
    currentUserId: string,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void,
    handleDeleteClick: (cardId: string) => Promise<void>,
    handleLikeClick: (
      cardId: string,
      isLiked: boolean
    ) => Promise<CardData>
  ) {
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

  private getTemplate(): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(
      this.templateSelector
    );

    if (!template) {
      throw new Error(`No se encontró la plantilla: ${this.templateSelector}`);
    }

    const cardElement = template.content
      .querySelector<HTMLElement>(".card")
      ?.cloneNode(true) as HTMLElement;

    return cardElement;
  }

  private setEventListeners(cardElement: HTMLElement): void {
    const likeButton =
      cardElement.querySelector<HTMLButtonElement>(".card__like-button");

    const deleteButton =
      cardElement.querySelector<HTMLButtonElement>(".card__delete-button");

      if (deleteButton && this.owner !== this.currentUserId) {
  deleteButton.remove();
}

    const cardImage =
      cardElement.querySelector<HTMLImageElement>(".card__image");

    if (likeButton) {
      likeButton.classList.toggle(
        "card__like-button_is-active",
        this.isLiked
      );

      likeButton.addEventListener("click", async () => {
        try {
          const updatedCard = await this.handleLikeClick(
            this.id,
            this.isLiked
          );

          this.isLiked = updatedCard.isLiked;

          likeButton.classList.toggle(
            "card__like-button_is-active",
            this.isLiked
          );
        } catch (err) {
          console.error("Error al actualizar el like:", err);
        }
      });
    }

   if (deleteButton) {
  deleteButton.addEventListener("click", async () => {
    try {
      await this.handleDeleteClick(this.id);
    } catch (err) {
      console.error("Error al eliminar la tarjeta:", err);
    }
  });
}

    if (cardImage) {
      cardImage.addEventListener("click", () => {
        this.handleCardClick(this.name, this.link);
      });
    }
  }

public removeCard(): void {
  this.cardElement?.remove();
}

  public generateCard(): HTMLElement {
    const cardElement = this.getTemplate();
  this.cardElement = cardElement;

    const cardImage =
      cardElement.querySelector<HTMLImageElement>(".card__image");

    const cardTitle =
      cardElement.querySelector<HTMLElement>(".card__title");

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