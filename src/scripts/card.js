export const createCard = (card, deleteCard, likeCard, openImagePreview, userID) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  
  likeCount.textContent = card.likes.length;
  if (card.likes.some(user => user._id === userID))
    {likeButton.classList.add('card__like-button_is-active');
    }

likeButton.addEventListener("click", () => likeCard(card._id, likeButton, likeCount));
      if (card.owner._id !== userID)
    {deleteButton.remove();
    }
  
  deleteButton.addEventListener("click", () => deleteCard(card._id, cardElement));

  cardImage.addEventListener("click", () => openImagePreview(card.name, card.link));
  return cardElement;
}

export const deleteCard = (cardId, cardElement) => {
  deleteCurrentCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => console.error('Ошибка при удалении карточки:', err));
};

