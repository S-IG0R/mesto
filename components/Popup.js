export class Popup {
  constructor (popupSelector) {
    this._popup = popupSelector;
    this._setEvtListeners();
  }

  open () {
    this._popup.classList.add('popup_opened');
  }

  close () {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      if (popupOpened) {
        this.close();
      }
    }
  }

  _handleBtnAndOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-btn')) {
      this.close();
    }
  }

  _setEvtListeners () {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleBtnAndOverlayClose);
  }

  // _removeEvtListeners = () => {
  //   document.removeEventListener('keydown', this._handleEscClose);
  //   this._popup.removeEventListener('click', this._handleBtnAndOverlayClose);
  // }
}
