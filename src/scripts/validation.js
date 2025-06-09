// Показать ошибку
export function showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// Скрыть ошибку
export function hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

// Проверить валидность одного поля
export function isValid(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    // берём своё сообщение из config по id поля
    const message = config.patternErrorMessages[inputElement.id];
    showInputError(formElement, inputElement, message, config);
  } else if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Включить/выключить кнопку
export function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
  const hasInvalid = inputList.some(input => !input.validity.valid);
  if (hasInvalid) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Установить обработчики на форму
export function setEventListeners(formElement, config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, button, config);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isValid(formElement, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
}

// Точка входа: включаем валидацию на всех формах
export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(form => {
    form.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(form, config);
  });
}

// Очистка ошибок и блокировка кнопки
export function clearValidation(formElement, config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);
  inputs.forEach(input => hideInputError(formElement, input, config));
  toggleButtonState(inputs, button, config);
}