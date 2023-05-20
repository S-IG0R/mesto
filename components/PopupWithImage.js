import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
  constructor (name, link, popupSelector) {
    super(popupSelector);
    this._photoBig = popupSelector.querySelector('.popup__image');
    this._caption = popupSelector.querySelector('.popup__picture-caption');
    this._name = name;
    this._link = link;
  }

  open = () => {
    super.open();
    this._photoBig.alt = this._name;
    this._caption = this._name;
    this._photoBig.src = this._link;
  }
}
