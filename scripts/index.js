const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function createCard(card, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function renderCard(card) {
  const cardElement = createCard(card, deleteCard);
  cardList.append(cardElement);
}

initialCards.forEach(renderCard);