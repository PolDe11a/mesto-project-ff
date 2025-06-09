import { createCard } from "./scripts/card.js";

import {
  openModal,
  closeModal,
  addModalListener,
  addOverlayListener,
} from "./scripts/modal.js";
import {
  getUserInfo,
  getInitialCards,
  changeUserInfo,
  addCard,
  setCardLike,
  removeCardLike,
  deleteCurrentCard,
  changeUserAvatar,
} from "./scripts/api.js";
import { enableValidation, clearValidation } from './scripts/validation.js';
import "./pages/index.css";

const modals = document.querySelectorAll(".popup");
const editProfileButton = document.querySelector(".profile__edit-button"); //Кнопка Редактировать профиль
const editProfilePopup = document.querySelector(".popup_type_edit"); //Попап редактирования профиля
const addCardButton = document.querySelector(".profile__add-button"); //Кнопка добавления карточки
const createCardPopup = document.querySelector(".popup_type_new-card"); //Попап создания карточки
const cardList = document.querySelector(".places__list"); //контейнер для карточек
const profileName = document.querySelector(".profile__title"); // Полe Имя на странице
const profileJob = document.querySelector(".profile__description"); // Поле Занятие на странице
const avatar = document.querySelector(".profile__image"); //Аватар пользователя
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]'); // Форма редактирования профиля
const nameInput = editProfileForm.querySelector(".popup__input_type_name"); // Поле Имя
const jobInput = editProfileForm.querySelector(".popup__input_type_description"); // Поле Занятие
const editProfileSubmitButton = editProfileForm.querySelector('button[type="submit"]'); // Кнопка Сохранить в форме редактирования профиля
const newCardForm = document.querySelector('.popup__form[name="new-place"]'); // Форма добавления карточек
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name"); //Поле с именем
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url"); // Поле со ссылкой
const addCardSubmitButton = newCardForm.querySelector('button[type="submit"]'); // Кнопка Сохранить при добавлении карточки
const changeAvatarPopup = document.querySelector(".popup_type_change-avatar"); // Попап загрузки аватарки
const editAvatarForm = document.querySelector('.popup__form[name="new-avatar"]'); // Форма загрузки аватара
const avatarInput = editAvatarForm.querySelector(".popup__input_type_url"); // Поле добавления ссылки на аватар
const changeAvatarSubmitButton = editAvatarForm.querySelector('button[type="submit"]'); // Кнопка Сохранить в форме смены автара

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  patternErrorMessages: {
    'name-input': 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
    'description-input': 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
    'place-name-input': 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'
  }
};

enableValidation(validationConfig);


let userID;
//Загрузить пользователя и первые карточки на страницу
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardData]) => {
    // Заполняем шапку профиля
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    avatar.style.backgroundImage = `url(${userData.avatar})`;
    userID = userData._id;
    // Рендерим карточки
    const cardList = document.querySelector(".places__list");
    const renderCard = (card) => {
      const cardElement = createCard(
        card,
        deleteCard,
        likeCard,
        openImagePreview,
        userID
      );
      cardList.append(cardElement);
    };
    cardData.forEach(renderCard);
  })
  .catch((err) => console.error("Ошибка загрузки данных:", err));

// Изменить аватар
avatar.addEventListener("click", () => { 
  editAvatarForm.reset();
  openModal(changeAvatarPopup);
});
const addNewAvatar = (evt) => {
  evt.preventDefault(); // Отменяем стандартную отправку формы
  changeAvatarSubmitButton.textContent = "Сохранение…";
  changeAvatarSubmitButton.disabled = true;

  changeUserAvatar(avatarInput.value)
    .then((updatedUser) => {
      avatar.style.backgroundImage = `url(${updatedUser.avatar})`;
      closeModal(changeAvatarPopup);
      changeAvatarSubmitButton.textContent = "Сохранить";
      changeAvatarSubmitButton.disabled = false;
    })
    .catch((err) => console.error("Не удалось обновить фото профиля:", err));
};
editAvatarForm.addEventListener("submit", addNewAvatar);

//Открыть иллюстрацию карточки на весь экран
const openImagePreview = (name, link) => {
  const previewPopup = document.querySelector(".popup_type_image");
  const popupImage = previewPopup.querySelector(".popup__image");
  const popupImageTitle = previewPopup.querySelector(".popup__caption");
  popupImage.src = link;
  popupImageTitle.textContent = name;
  openModal(previewPopup);
};

//Удалить карточку
const deleteCard = (cardId, cardElement) => {
  deleteCurrentCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => console.error("Ошибка при удалении карточки:", err));
};

addCardButton.addEventListener("click", () => {
  newCardForm.reset();
clearValidation(newCardForm, validationConfig);
 openModal(createCardPopup);
 });

modals.forEach((modal) => {
  addModalListener(modal);
  addOverlayListener(modal);
});

//Редактировать данные пользователя
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); // Отменяем стандартную отправку формы

  editProfileSubmitButton.textContent = "Сохранение…";
  editProfileSubmitButton.disabled = true;

  changeUserInfo(nameInput.value, jobInput.value)
    .then((updatedUser) => {
      profileName.textContent = updatedUser.name;
      profileJob.textContent = updatedUser.about;

      closeModal(editProfilePopup);
      editProfileSubmitButton.textContent = "Сохранить";
      editProfileSubmitButton.disabled = false;
    })
    .catch((err) => console.error("Не удалось обновить профиль:", err));
};
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

editProfileButton.addEventListener("click", () => {
  clearValidation(editProfileForm, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfilePopup);
});

// Создать новую карточку
const handleNewCardSubmit = (evt) => {
  evt.preventDefault(); // Отменяем стандартную отправку формы
  addCardSubmitButton.textContent = "Сохранение…";
  addCardSubmitButton.disabled = true;
  addCard(cardNameInput.value, cardLinkInput.value)
    .then((newCardData) => {
      const cardElement = createCard(
        newCardData,
        deleteCard,
        likeCard,
        openImagePreview,
        userID
      );
      cardList.prepend(cardElement);

      closeModal(createCardPopup);
      addCardSubmitButton.textContent = "Сохранить";
      addCardSubmitButton.disabled = false;
      newCardForm.reset();
    })
    .catch((err) => console.error("Не удалось добавить карточку:", err));
};
newCardForm.addEventListener("submit", handleNewCardSubmit);

const likeCard = (cardID, likeButton, likeCount) => {
  const isActive = likeButton.classList.contains("card__like-button_is-active"); //активная кнопка лайка
  let request;

  if (isActive) {
    request = removeCardLike(cardID);
  } else {
    request = setCardLike(cardID);
  }
  request
    .then((updatedCard) => {
      if (isActive) {
        likeButton.classList.remove("card__like-button_is-active");
      } else {
        likeButton.classList.add("card__like-button_is-active");
      }
      likeCount.textContent = updatedCard.likes.length;
    })
    .catch((err) => console.error("Ошибка лайка:", err));
};
