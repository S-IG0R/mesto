const profileName = document.querySelector('.profile__hero-name'); //Профиль, Имя
const profileJob = document.querySelector('.profile__hero-job'); //Профиль, Род деятельности
const editProfileBtn = document.querySelector('.profile__edit-button'); //Профиль, кнопка Ред.

const addNewPhotoBtn = document.querySelector('.profile__add-button'); //Кнопка добавить фото
const addNewPhotoPopup = document.querySelector('.popup_type_add-photo'); //Поп-ап добавления фото

const editProfilePopup = document.querySelector('.popup_type_edit-profile'); //Поп-ап редактирования профиля
const inputName = editProfilePopup.querySelector('.popup__input_el_name'); //поле ввода Имени
const inputJob = editProfilePopup.querySelector('.popup__input_el_job'); //поле ввода Работы
const editProfileForm = editProfilePopup.querySelector('.popup__form_type_edit-profile'); //Форма ред. профиля

const addNewPhotoForm = document.querySelector('.popup__form_type_add-pic'); //Форма добавления фото
const inputPicName = addNewPhotoForm.querySelector('.popup__input_el_pic-name'); //поле ввода имени фото
const inputPicUrl = addNewPhotoForm.querySelector('.popup__input_el_pic-url'); //поле ввода ссылки

const initialCardsData = [
  {name: 'Мыс Флотский', link: './images/cape-flotsky.jpg'},
  {name: 'Гора Эльбрус', link: './images/elements-elbrus.jpg'},
  {name: 'Горы Татры', link: './images/tatra-mountains.jpg'},
  {name: 'Гиза', link: './images/giza.jpg'},
  {name: 'Домбай', link: './images/elements-dombay.jpg'},
  {name: 'Хавасу', link: './images/havasu-waterfall.jpg'},
]

const allPopups = document.querySelectorAll('.popup');
const popupCloseBtn = (popup) => {
  popup.forEach((arrayElement) => {
    const closeBtn = arrayElement.querySelector('.popup__close-btn');
    closeBtn.addEventListener('click', () => {
      arrayElement.classList.remove('popup_opened');
    })
  });
}

popupCloseBtn(allPopups);

//открываем поп-ап редактирования профиля
function openPopup (className) {
  className.classList.add('popup_opened');
}

//закрываем поп-ап ред. профиля
function closePopup (className) {
  className.classList.remove('popup_opened');
}

//Нажали на кнопку добавить фото
addNewPhotoBtn.addEventListener('click', function(){
  openPopup(addNewPhotoPopup);
})

addNewPhotoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const inputNewPhotoData = {};
  inputNewPhotoData.name = inputPicName.value;
  inputNewPhotoData.link = inputPicUrl.value;
  placeCardInDom(createCard(inputNewPhotoData));
})

//Нажали на кнопку Ред. профиля
editProfileBtn.addEventListener('click', function(){
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(editProfilePopup);
});

//Нажали на кнопку "сохранить" в форме
editProfileForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(editProfilePopup);
});


//  создаем карточку и заполняем данными
const createCard = (cardData) => {
  //копируем шаблон
  const templateContent = document.querySelector('#card-template').content;
  const copiedContent = templateContent.querySelector('.cards__item').cloneNode(true);

  //заполняем скопированный шаблон
  copiedContent.querySelector('.cards__image').src = cardData.link;
  copiedContent.querySelector('.cards__image').alt = cardData.name;
  copiedContent.querySelector('.cards__title').textContent = cardData.name;

  //обработка кнопки лайк
  const likeButton = copiedContent.querySelector('.cards__like-button');
  const handlerLikeBtn = () => {
    likeButton.classList.toggle('cards__like-button_active');
  }
  likeButton.addEventListener('click', handlerLikeBtn);

  //обработка кнопки мусорка
  const trashButton = copiedContent.querySelector('.cards__trash-button');
  const handlerTrashBtn = () => {
    copiedContent.remove();
  }
  trashButton.addEventListener('click', handlerTrashBtn);

  //обработка клика по фото
  const picButton =  copiedContent.querySelector('.cards__image');
  const handlePicButton = () => {
    console.log('pic click');
  }
  picButton.addEventListener('click', handlePicButton);

  //возвращаем собранную и заполненную карточку
  return copiedContent;
}

//  размещаем карточку в DOM
const cardsSection = document.querySelector('.cards');
const placeCardInDom = (createdCard) => {
  cardsSection.prepend(createdCard);
}

//читаем данные из массива -> передаем их в создания карточки, возвращаем -> передаем их в отрисовку карточки в DOM
initialCardsData.forEach((itemDataArray) => {
  placeCardInDom(createCard(itemDataArray));
});


