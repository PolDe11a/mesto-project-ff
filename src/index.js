import { createCard, deleteCard, likeCard } from "./scripts/card.js";

import { initialCards } from "./scripts/cards.js";
import {
  openModal,
  closeModal,
  addModalListener,
  addOverlayListener,
} from "./scripts/modal.js";
import "./pages/index.css";


const openImagePreview = (name, link) => {
  const previewPopup = document.querySelector(".popup_type_image");
  const popupImage = previewPopup.querySelector(".popup__image");
  const popupImageTitle = previewPopup.querySelector(".popup__caption");
  popupImage.src = link;
  popupImageTitle.textContent = name;
  openModal(previewPopup);
};

const cardList = document.querySelector(".places__list");

const renderCard = (card) => {
  const cardElement = createCard(card, deleteCard, likeCard, openImagePreview);
  cardList.append(cardElement);
};

initialCards.forEach(renderCard);



const modals = document.querySelectorAll(".popup");
const editProfileButton = document.querySelector(".profile__edit-button"); //Кнопка Редактировать профиль
const editProfilePopup = document.querySelector(".popup_type_edit"); //Попап редактирования профиля

const addCardButton = document.querySelector(".profile__add-button"); //Кнопка добавления карточки
const createCardPopup = document.querySelector(".popup_type_new-card"); //Попап создания карточки
addCardButton.addEventListener("click", () => openModal(createCardPopup));

modals.forEach((modal) => {
  addModalListener(modal);
  addOverlayListener(modal);
});

const EditProfileForm = document.querySelector(
  '.popup__form[name="edit-profile"]'
); // Форма редактирования профиля
const nameInput = EditProfileForm.querySelector(".popup__input_type_name"); // Поле Имя
const jobInput = EditProfileForm.querySelector(
  ".popup__input_type_description"
); // Поле Занятие
const profileName = document.querySelector(".profile__title"); // Пол Имя на странице
const profileJob = document.querySelector(".profile__description"); // Поле Занятие на странице

// Обработчик отправки формы
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); // Отменяем стандартную отправку формы
  const newName = nameInput.value; // Значение поля Имя
  const newJob = jobInput.value; // Значение поля Занятие
  profileName.textContent = newName; // Новое значение Имя
  profileJob.textContent = newJob; // Новое значение Занятия
  closeModal(editProfilePopup);
};

EditProfileForm.addEventListener("submit", handleProfileFormSubmit);

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfilePopup);
});

const newCardForm = document.querySelector('.popup__form[name="new-place"]'); // Форма создания места
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name"); // Поле Название места в форме
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url"); // Поле ссылка в форме

// Обработчик отправки формы
const handleNewCardSubmit = (evt) => {
  evt.preventDefault(); // Отменяем стандартную отправку формы
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = createCard(
    cardData,
    deleteCard,
    likeCard,
    openImagePreview
  );
  cardList.prepend(cardElement);
  closeModal(createCardPopup);
  newCardForm.reset();
};

newCardForm.addEventListener("submit", handleNewCardSubmit);
