import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
  constructor ({popupSelector, formSubmit}) {
    super(popupSelector);
    this._form = popupSelector.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitForm = formSubmit;
    this._setEventListeners();
  }

  _getInputValues () {
    this._inputsValues = {}
    this._inputList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }

  _setEventListeners () {
    super._setEvtListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    })
  }

  close () {
    super.close();
    this._form.reset();
    console.log('reset')
  }
}


