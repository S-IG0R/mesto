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
    const contentCloned = this._templateContent.querySelector('.cards__item').cloneNode(true);
    return contentCloned;
  }

    //заполняем данные в скопированный шаблон, возвращаем заполненный
  generateCard() {
    this._cardElement = this._cloneTemplate();
    this._cardElement.querySelector('.cards__image').src = this._link;
    this._cardElement.querySelector('.cards__image').alt = this._name;
    this._cardElement.querySelector('.cards__title').textContent = this._name;

    this._addEvtListenerToLikeBtn();
    this._addEvtListenerToTrashBtn();
    this._addEvtListenerToCardImage();

    return this._cardElement;
  }

    //устанавливаем слушатель на кнопку лайк
  _addEvtListenerToLikeBtn () {
    const btnLike = this._cardElement.querySelector('.cards__like-button');
    btnLike.addEventListener('click', this._handleLikeBtn)
  }

    //обработчик лайка, переключает состояние
  _handleLikeBtn = () => {
    const btnLike = this._cardElement.querySelector('.cards__like-button');
    btnLike.classList.toggle('cards__like-button_active');
  }

    //устанавливаем слушатель кнопке мусорка
  _addEvtListenerToTrashBtn () {
    const trashBtn = this._cardElement.querySelector('.cards__trash-button');
    trashBtn.addEventListener('click', this._handleTrashBtn)
  }

    //обработчик кнопки-мусорка, удаляет карточку
  _handleTrashBtn = () => {
    this._cardElement.remove();
  }

    //устанавливаем слушатель картинке в карточке
  _addEvtListenerToCardImage () {
    const cardImage = this._cardElement.querySelector('.cards__image');
    cardImage.addEventListener('click', () => {
      this._handleClickToImg(this._name, this._link);
    })
  }
}
