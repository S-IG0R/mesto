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
    this._inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._btnSubmit = this._form.querySelector(this._submitButtonSelector);

    this._toggleBtnSubmitState();
    this._inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isInputsValid(input);
        this._toggleBtnSubmitState();
      })
    })
  }

  _isInputsValid = (input) => {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _hideInputError = (input) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _showInputError = (input) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
  }

  _toggleBtnSubmitState = () => {
    if (this._checkInvalidInputs(this._inputsList)) {
      this._btnSubmit.classList.add(this._inactiveButtonClass);
      this._btnSubmit.setAttribute('disabled', true);
    } else {
      this._btnSubmit.classList.remove(this._inactiveButtonClass);
      this._btnSubmit.removeAttribute('disabled');
    }
  }

  _checkInvalidInputs = () => {
     return this._inputsList.some((input) => {
        return !input.validity.valid;
    });
  }

  resetValidation = () => {
    this._inputsList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleBtnSubmitState();
  }
}

