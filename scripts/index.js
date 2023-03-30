const profileName = document.querySelector('.profile__hero-name'); //Профиль, Имя
const profileJob = document.querySelector('.profile__hero-job'); //Профиль, Род деятельности
const popupOpenButton = document.querySelector('.profile__edit-button'); //Профиль, кнопка Ред.

const popup = document.querySelector('.popup'); //Поп-ап
const inputName = popup.querySelector('.popup__input_el_name'); //Поп-ап поле ввода Имени
const inputJob = popup.querySelector('.popup__input_el_job'); //Поп-ап поле ввода Работы
const popupForm = popup.querySelector('.popup__form'); //Поп-ап форма
const popupCloseButton = popup.querySelector('.popup__close-btn'); //Кнопка крестик

const InitialCardsData = [
  {name: 'Мыс Флотский', link: './images/cape-flotsky.jpg'},
  {name: 'Гора Эльбрус', link: './images/elements-elbrus.jpg'},
  {name: 'Горы Татры', link: './images/tatra-mountains.jpg'},
  {name: 'Гиза', link: './images/giza.jpg'},
  {name: 'Домбай', link: './images/elements-dombay.jpg'},
  {name: 'Хавасу', link: './images/havasu-waterfall.jpg'},
]

//открываем поп-ап
function openPopup () {
  popup.classList.add('popup_opened');
}

//закрываем поп-ап
function closePopup () {
  popup.classList.remove('popup_opened');
}

//Нажали на кнопку Ред. профиля
popupOpenButton.addEventListener('click', function(){
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup();
});

//Нажали на кнопку 'Х' в форме профиля
popupCloseButton.addEventListener('click', closePopup);

//Нажали на кнопку "сохранить" в форме
popupForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
});

//Функция заполнения карточки из массива
function CreateFillPlaceCards (dataArray, place) {

  dataArray.forEach ((item) => {
    //выбираем шаблон, клонируем содержимое
    const templateContent = document.querySelector('#card-template').content;
    const clonedContent = templateContent.querySelector('.cards__item').cloneNode(true);

    //заполняем карточку данными из массива
    clonedContent.querySelector('.cards__image').src = item.link;
    clonedContent.querySelector('.cards__image').alt = item.name;
    clonedContent.querySelector('.cards__title').textContent = item.name;

    //вешаем слушатель на лайк, меняем состояния по клику
    const likeButton = clonedContent.querySelector('.cards__like-button');
    likeButton.addEventListener('click', (evt) => {
      evt.target.classList.toggle('cards__like-button_active');
    })

    //удаляем карточку кнопкой "ведро"
    const trashButton = clonedContent.querySelector('.cards__trash-button');
    trashButton.addEventListener('click', () => {
      const cardsItem = trashButton.closest('.cards__item');
      cardsItem.remove();
    })

    //размещаем созданную и заполненную карточку в DOM
    const cardsSection = document.querySelector('.cards');
    if (place === 'end-node') {
      cardsSection.append(clonedContent);
    } if (place === 'start') {
      cardsSection.prepend(clonedContent);
    }
  });
}
//Заполняем 6 карточками при загрузке
CreateFillPlaceCards(InitialCardsData, 'end-node');
