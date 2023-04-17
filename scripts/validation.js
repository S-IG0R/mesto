//показываем ошибку если поле невалидно
const showInputError = (form, input, errorMsg, config) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMsg;
}
//прячем ошибку если поле валидно
export const hideInputError = (form, input, config) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

//проверяем валидность текущего поля
export const isInputsValid = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
}

//проверка всех полей на валидност
const checkInvalidInputs = (inputList) => {
  return inputList.some((inputCurrent) => {
    return !inputCurrent.validity.valid;
  });
}

//переключение состояния кнопки сабмита
export const toggleBtnSubmitState = (inputList, buttonSubmit, config) => {
  if (checkInvalidInputs(inputList)) {
    buttonSubmit.classList.add(config.inactiveButtonClass);
    buttonSubmit.setAttribute('disabled', true);
  } else {
    buttonSubmit.classList.remove(config.inactiveButtonClass);
    buttonSubmit.removeAttribute('disabled');
  }
}

//установим всем полям ввода формы слушатель по изменению поля
const setEventListeners = (form, config) => {

  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonSubmit = form.querySelector(config.submitButtonSelector);

  toggleBtnSubmitState(inputList, buttonSubmit, config);

  inputList.forEach((currentInput) => {
    currentInput.addEventListener('input', () => {
      isInputsValid(form, currentInput, config);
      toggleBtnSubmitState(inputList, buttonSubmit, config);
    })
  });
}

//выбираем все формы и предаем их функцию уст. слушателей
export const enableValidationForms = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formCurrent) => {
    setEventListeners(formCurrent, config);
  });
}

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

enableValidationForms(config);

