import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
  constructor ({popup, formSubmit}) {
    super(popup);
    this._form = popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitForm = formSubmit;
    this.setEvtListeners();
  }

  _getInputValues () {
    return this._inputList.reduce((formData, input) => {
      formData[input.name] = input.value;
      return formData;
    }, {});
  }

  setEvtListeners () {
    super.setEvtListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    })
  }

  close () {
    super.close();
    this._form.reset();
  }
}


