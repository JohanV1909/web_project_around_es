export interface CardData {
  name: string;
  link: string;
}

export class Card {
  private name: string;
  private link: string;
  private templateSelector: string;
  private handleCardClick: (name: string, link: string) => void;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void
  ) {
    this.name = data.name;
    this.link = data.link;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
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

  const cardImage =
    cardElement.querySelector<HTMLImageElement>(".card__image");

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

public generateCard(): HTMLElement {
  const cardElement = this.getTemplate();

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