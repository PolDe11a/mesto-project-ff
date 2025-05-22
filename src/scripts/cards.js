import {openModal} from "./modal"

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

export function createCard(card, deleteCard, likeCard, openImagePreview) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeCard(likeButton));

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => openImagePreview(card.name, card.link));

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export function renderCard(card) {
  const cardElement = createCard(card, deleteCard, likeCard, openImagePreview);
  cardList.append(cardElement);
}

export function openImagePreview(name, link) {
  const previewPopup = document.querySelector(".popup_type_image");
  const popupImage = previewPopup.querySelector(".popup__image");
  const popupImageTitle = previewPopup.querySelector(".popup__caption");
  popupImage.src = link;
  popupImageTitle.textContent = name;
  openModal(previewPopup);
}



import altayImage from '../images/Altay.png';
import kaliningradImage from '../images/Kaliningrad.png';
import karelijaImage from '../images/Karelia.png';
import svijazskImage from '../images/Svijazsk.png';
import velikyNovgorodImage from '../images/Novgorod.png';
import sanktPetersburgImage from '../images/SanktPetersburg.png';

export const initialCards = [
    {
      name: "Алтай",
      link: altayImage
    },
    {
      name: "Калининград",
      link: kaliningradImage
    },
    {
      name: "Карелия",
      link: karelijaImage
    },
    {
      name: "Остров Свияжск",
      link: svijazskImage
    },
    {
      name: "Великий Новгород",
      link: velikyNovgorodImage
    },
    {
      name: "Санкт-Петербург",
      link: sanktPetersburgImage
    }
];

