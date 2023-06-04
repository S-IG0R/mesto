export class Card {
    //передаем массив с данными в конструктор
  constructor(
    {name, link, likes, owner, _id},
    templateSelector, handleClickToImg, userInfo,
    handleDeleteBtn) {
    this._name = name;
    this._link = link;
    this._likes = likes.length;
    this._cardId = _id;
    this._ownerCardId = owner._id;
    this._templateContent = document.querySelector(templateSelector).content;
    this._handleClickToImg = handleClickToImg;
    this._userId = userInfo.id;
    this._handleDeleteBtn = handleDeleteBtn;
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

    this._likeCounter.textContent = this._likes;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEvtListeners();
    this._disableDeleteBtn();

    return this._cardElement;
  }

  _setEvtListeners = () => {
    this._btnLike.addEventListener('click', () => {
      this._btnLike.classList.toggle('cards__like-button_active');
    });

    this._btnDelete.addEventListener('click', () => {
      this._handleDeleteBtn(this._cardId, this._cardElement.remove())

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

}
