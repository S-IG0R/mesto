export class Card {
    //передаем массив с данными в конструктор
  constructor(itemArray, templateSelector, handleClickToImg) {
    this._name = itemArray.name;
    this._alt = itemArray.name;
    this._link = itemArray.link;
    this._templateContent = document.querySelector(templateSelector).content;
    this._handleClickToImg = handleClickToImg;
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

    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEvtListeners();

    return this._cardElement;
  }

  _setEvtListeners = () => {
    this._btnLike.addEventListener('click', () => {
      this._btnLike.classList.toggle('cards__like-button_active');
    });

    this._btnDelete.addEventListener('click', () => {
      this._cardElement.remove();
    });

    this._cardImg.addEventListener('click', () => {
      this._handleClickToImg(this._name, this._link);
    })
  }

}
