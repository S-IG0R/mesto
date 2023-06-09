export class Card {
  constructor(
    {name, link, likes, owner, _id},
    templateSelector, handleClickToImg, userInfo, handleSubmitDelete, handleLikeCard) {
    this._name = name;
    this._link = link;
    this._likesArr = likes;
    this._likesAmount = likes.length;
    this._ownerCardId = owner._id;
    this._cardId = _id;
    this._templateContent = document.querySelector(templateSelector).content;
    this._handleClickToImg = handleClickToImg;
    this._userId = userInfo.id;
    this._handleSubmitDelete = handleSubmitDelete;
    this._handleLikeCard = handleLikeCard;
  }

    //находим шаблон, копируем, возвращаем
  _cloneTemplate() {
    return this._contentCloned = this._templateContent.querySelector('.cards__item').cloneNode(true);
  }

    //заполняем данные в скопированный шаблон, возвращаем заполненный
  generateCard() {
    this._cardElement = this._cloneTemplate();
    this._cardImg = this._cardElement.querySelector('.cards__image');
    this._cardTitle = this._cardElement.querySelector('.cards__title');
    this._btnLike = this._cardElement.querySelector('.cards__like-button');
    this._btnDelete = this._cardElement.querySelector('.cards__trash-button');
    this._likeCounter = this._cardElement.querySelector('.card__like-counter');

    console.log('cardId: '+ this._ownerCardId, 'UserId: ' + this._userId)

    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setLikeToCounter(this._likesAmount);
    this._likeState = this._checkLikeState(this._likesArr);
    this._switchLike(this._likeState);
    this._setEvtListeners();
    this._disableDeleteBtn();

    return this._cardElement;
  }

  _setEvtListeners = () => {
    this._btnLike.addEventListener('click', () => {
      this._handleLikeCard(this._cardId, this._likeState, this.updLike)
    });

    this._btnDelete.addEventListener('click', () => {
      this._handleSubmitDelete (this._cardId, this._cardElement);
    });

    this._cardImg.addEventListener('click', () => {
      this._handleClickToImg(this._name, this._link);
    })
  }

  _disableDeleteBtn() {
    if(this._ownerCardId !== this._userId) {
      this._btnDelete.classList.add('cards__trash-button_disabled');
    }
  }

  _checkLikeState(likesArr) {
    return likesArr.some((likeItem) => {
    return likeItem._id === this._userId;
    })
  }

  _switchLike(likeState) {
    likeState === true
      ? this._btnLike.classList.add('cards__like-button_active')
      : this._btnLike.classList.remove('cards__like-button_active')
  }

  _setLikeToCounter(data) {
    this._likeCounter.textContent = data;
  }

  updLike = (data) => {
    this._likeState = this._checkLikeState(data.likes);
    this._switchLike(this._likeState);
    this._setLikeToCounter(data.likes.length);
  }
}
