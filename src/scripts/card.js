const cardTemplate = document.querySelector("#card-template").content;

export const createCard = (card, deleteCard, likeCard, openImagePreview) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);


  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");


  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeCard(likeButton));

  cardImage.addEventListener("click", () => openImagePreview(card.name, card.link));

  return cardElement;
}

export const deleteCard = (cardElement) => {
  cardElement.remove();
}

export const likeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
}

