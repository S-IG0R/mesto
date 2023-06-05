import {Popup} from './Popup.js'

export class PopupWithConfirmation extends Popup {
  constructor ({popup}) {
      super(popup);
      this._form = popup.querySelector('.popup__form_type_confirm-delete')
    }

  setEvtListeners() {
    super.setEvtListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit();
      this.close();
    });
  }

  handleSubmit (submit) {
    this._submit = submit;
  }
}



