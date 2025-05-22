//Закрытие по Esc
const handleEscKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

//Открытие попапа
export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKeyUp);
};

//Закрытие попапа
export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
};

//Вешаем слушатели
export const addListener = (modal) => {
  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(modal));
};

//Закрытие по оверлею
export function addOverlayListener(modal) {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
}
