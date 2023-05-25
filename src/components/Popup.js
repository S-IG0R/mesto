export class Popup {
  constructor (popup) {
    this._popup = popup;
  }

  open () {
    this._popup.classList.add('popup_opened');
    this._setEvtListenerEsc();
  }

  close () {
    this._popup.classList.remove('popup_opened');
    this._removeEvtListenerEsc();
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
        this.close();
      }
    }
  

  _handleBtnAndOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-btn')) {
      this.close();
    }
  }

  _setEvtListenerEsc () {
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeEvtListenerEsc = () => {
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEvtListeners () {
    this._popup.addEventListener('click', this._handleBtnAndOverlayClose);
  }
}
