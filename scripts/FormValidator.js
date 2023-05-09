export class FormValidator {

  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }

  enableValidation = () => {
    this._setEventListeners();
  }

  _setEventListeners = () => {
    const listInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    const btnSubmit = this._form.querySelector(this._submitButtonSelector);
    this.toggleBtnSubmitState(listInputs, btnSubmit);
    listInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this.isInputsValid(input);
        this.toggleBtnSubmitState(listInputs, btnSubmit);
      })
    })
  }

  isInputsValid = (input) => {
    if (input.validity.valid) {
      this.hideInputError(input);
    } else {
      this._showInputError(input, input.validationMessage);
    }
  }

  hideInputError = (input) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _showInputError = (input, errorMsg) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMsg;
  }

  toggleBtnSubmitState = (listInputs, btnSubmit) => {
    if (this._checkInvalidInputs(listInputs)) {
      btnSubmit.classList.add(this._inactiveButtonClass);
      btnSubmit.setAttribute('disabled', true);
    } else {
      btnSubmit.classList.remove(this._inactiveButtonClass);
      btnSubmit.removeAttribute('disabled');
    }
  }

  _checkInvalidInputs = (listInputs) => {
     return listInputs.some((input) => {
        return !input.validity.valid;
    });
  }
}

