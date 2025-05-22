import { createCard, deleteCard, likeCard, renderCard, openImagePreview, initialCards } from "./scripts/cards.js";
import {
  openModal,
  closeModal,
  addListener,
  addOverlayListener,
} from "./scripts/modal.js";
import "./pages/index.css";

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

initialCards.forEach(renderCard);


const modals = document.querySelectorAll(".popup");
const editProfileButton = document.querySelector(".profile__edit-button"); //Кнопка Редактировать профиль
const EditProfilePopup = document.querySelector(".popup_type_edit"); //Попап редактирования профиля

const addCardButton = document.querySelector(".profile__add-button"); //Кнопка добавления карточки
const CreateCardPopup = document.querySelector(".popup_type_new-card"); //Попап создания карточки
addCardButton.addEventListener("click", () => openModal(CreateCardPopup));

modals.forEach((modal) => {
  addListener(modal);
  addOverlayListener(modal);
});

const formElement = document.querySelector('.popup__form[name="edit-profile"]'); // Форма редактирования профиля
const nameInput = formElement.querySelector(".popup__input_type_name"); // Поле Имя
const jobInput = formElement.querySelector(".popup__input_type_description"); // Поле Занятие
const profileName = document.querySelector(".profile__title"); // Пол Имя на странице
const profileJob = document.querySelector(".profile__description"); // Поле Занятие на странице

// Обработчик отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы
  const newName = nameInput.value; // Значение поля Имя
  const newJob = jobInput.value; // Значение поля Занятие
  profileName.textContent = newName; // Новое значение Имя
  profileJob.textContent = newJob; // Новое значение Занятия
  closeModal(EditProfilePopup);
}

formElement.addEventListener("submit", handleFormSubmit);

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(EditProfilePopup);
});

const newCardForm = document.querySelector('.popup__form[name="new-place"]'); // Форма создания места
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name"); // Поле Название места в форме
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url"); // Поле ссылка в форме

const createCardPopup = document.querySelector(".popup_type_new-card"); // ? попап с добавлением карточки

// Обработчик отправки формы
function handleNewCardSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = createCard(cardData, deleteCard, likeCard, openImagePreview);
  cardList.prepend(cardElement);
  closeModal(createCardPopup);
  newCardForm.reset();
}

newCardForm.addEventListener("submit", handleNewCardSubmit);
