import {initialCardsData} from './constants.js'

const profileName = document.querySelector('.profile__hero-name'); //Профиль, Имя
const profileJob = document.querySelector('.profile__hero-job'); //Профиль, Род деятельности
const profileEditBtn = document.querySelector('.profile__edit-button'); //Профиль, кнопка Ред.

const btnNewPhoto = document.querySelector('.profile__add-button'); //Кнопка добавить фото
const popupAddNewPhoto = document.querySelector('.popup_type_add-photo'); //Поп-ап добавления фото

const popups = document.querySelectorAll('.popup'); // выбираем все поп-апы
const popupsArray = Array.from(popups); // массив поп-апов

const popupProfile = document.querySelector('.popup_type_edit-profile'); //Поп-ап редактирования профиля
const inputName = popupProfile.querySelector('.popup__input_el_name'); //поле ввода Имени
const inputJob = popupProfile.querySelector('.popup__input_el_job'); //поле ввода Работы
const profileForm = popupProfile.querySelector('.popup__form_type_edit-profile'); //Форма ред. профиля

const photoForm = document.querySelector('.popup__form_type_add-pic'); //Форма добавления фото
const inputPhotoName = photoForm.querySelector('.popup__input_el_pic-name'); //поле ввода имени фото
const inputPhotoUrl = photoForm.querySelector('.popup__input_el_pic-url'); //поле ввода ссылки

const popupShowBigPhoto = document.querySelector('.popup_type_view-photo'); // поп-ап отобр. увеличенного фото
const photoBig = popupShowBigPhoto.querySelector('.popup__image'); // увеличенное фото поп-апа
const popupCaption =  document.querySelector('.popup__picture-caption'); // Описание для попапа с фото в увелич. размере

const templateContent = document.querySelector('#card-template').content; // Забираем контент шаблона

const cardsSection = document.querySelector('.cards'); //Секция Cards

//Ищем все кнопки Х и вешаем слушатель для обработки закрытия
const closePopupBtn = (collectionOfPopups) => {
  collectionOfPopups.forEach((arrayElement) => {
    const btnClosePopup = arrayElement.querySelector('.popup__close-btn');
    const handleBtnClosePopup = () => {
      closePopup(arrayElement);
    }
    btnClosePopup.addEventListener('click', handleBtnClosePopup);
  });
}

closePopupBtn(popups);

//открываем поп-ап редактирования профиля
function openPopup (popup) {
  popup.classList.add('popup_opened');
  closePopupClickOverlay(popupsArray);
  closePopupPressEsc();
}

//закрываем поп-ап ред. профиля
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

//Нажали на кнопку добавить фото
const addNewPhotoHandler = () => {
  openPopup(popupAddNewPhoto);
}
btnNewPhoto.addEventListener('click', addNewPhotoHandler);

//Функция обработки слушателя на форме добавления фото
const addNewPhotoFormHandler = (evt) => {
  evt.preventDefault();
  const inputNewPhotoData = {};
  inputNewPhotoData.name = inputPhotoName.value;
  inputNewPhotoData.link = inputPhotoUrl.value;
  placeCardInDom(createCard(inputNewPhotoData), cardsSection);
  closePopup(popupAddNewPhoto);
  photoForm.reset();
}

photoForm.addEventListener('submit', addNewPhotoFormHandler);

//Функция обработки слушателя кнопку Ред. профиля
const editProfileBtnHandler = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupProfile);
}

profileEditBtn.addEventListener('click', editProfileBtnHandler);

//Функция обработки слушателя события submit в форме ред. профиля
const editProfileFormHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
}

profileForm.addEventListener('submit', editProfileFormHandler);


//  создаем карточку и заполняем данными
const createCard = (cardData) => {

  const contentCopied = templateContent.querySelector('.cards__item').cloneNode(true);
  const btnLike = contentCopied.querySelector('.cards__like-button');
  const trashBinBtn = contentCopied.querySelector('.cards__trash-button');
  const cardImage =  contentCopied.querySelector('.cards__image');
  const cardTitle = contentCopied.querySelector('.cards__title');

  //заполняем скопированный шаблон
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  //функция обработки кнопки лайк
  const handleLikeBtn = () => {
    btnLike.classList.toggle('cards__like-button_active');
  }

  //функция обработки кнопки мусорка
  const handleTrashBinBtn = () => {
    contentCopied.remove();
  }

  //функция обработки клика по фото в карточке
  const handleClickPhotoInCard = () => {
    openPopup(popupShowBigPhoto);
    popupCaption.textContent = cardData.name;
    photoBig.alt = cardData.name;
    photoBig.src = cardData.link;
  }
  //слушатели событий
  btnLike.addEventListener('click', handleLikeBtn);
  trashBinBtn.addEventListener('click', handleTrashBinBtn);
  cardImage.addEventListener('click', handleClickPhotoInCard);

  //возвращаем собранную и заполненную карточку
  return contentCopied;
}

//размещаем собранную карточку в DOM
const placeCardInDom = (createdCard, place) => {
  place.prepend(createdCard);
}

//читаем данные из массива -> передаем их в создания карточки, возвращаем -> передаем их в рендеринг карточки в DOM
initialCardsData.forEach((itemDataArray) => {
  placeCardInDom(createCard(itemDataArray), cardsSection);
});


const closePopupClickOverlay = (popupsArray) => {
  popupsArray.forEach((popup) => {
    popup.addEventListener('click', clickOverlayHandler);
  })

}

const clickOverlayHandler = (evt) => {
  closePopup(evt.target);
}

const closePopupPressEsc = () => {
  document.addEventListener('keydown', pressEscHandler);
}

const pressEscHandler = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popupOpened){
    closePopup(popupOpened);
  }
}


