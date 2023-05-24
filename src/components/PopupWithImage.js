import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
  constructor (popup) {
    super(popup);
    this._photoBig = popup.querySelector('.popup__image');
    this._caption = popup.querySelector('.popup__picture-caption');
  }

  open = (name, link) => {
    super.open();
    this._photoBig.alt = name;
    this._caption = name;
    this._photoBig.src = link;
  }
}
