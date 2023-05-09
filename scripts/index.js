import {initialCardsData} from './constants.js'
import {config} from './validation.js'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

// Все поп-апы
const popups = document.querySelectorAll('.popup'); // выбираем все поп-апы
const popupsArray = Array.from(popups); // массив поп-апов

// Редактирование профиля
const profileName = document.querySelector('.profile__hero-name'); //Профиль, Имя
const profileJob = document.querySelector('.profile__hero-job'); //Профиль, Род деятельности
const profileEditBtn = document.querySelector('.profile__edit-button'); //Профиль, кнопка Ред.
const popupProfile = document.querySelector('.popup_type_edit-profile'); //Поп-ап редактирования профиля
const profileForm = popupProfile.querySelector('.popup__form_type_edit-profile'); //Форма ред. профиля
const inputName = popupProfile.querySelector('.popup__input_el_name'); //поле ввода Имени
const inputJob = popupProfile.querySelector('.popup__input_el_job'); //поле ввода Работы
const inputsEditProfileForm = Array.from(profileForm.querySelectorAll('.popup__input'));

const btnSubmitEditProfile = profileForm.querySelector('.popup__submit-btn');

// Добавление нового фото
const btnNewPhoto = document.querySelector('.profile__add-button'); //Кнопка добавить фото
const popupAddNewPhoto = document.querySelector('.popup_type_add-photo'); //Поп-ап добавления фото
const photoForm = document.querySelector('.popup__form_type_add-pic'); //Форма добавления фото
const inputsPhotoFormList = Array.from(photoForm.querySelectorAll('.popup__input'));
const inputPhotoName = photoForm.querySelector('.popup__input_el_pic-name'); //поле ввода имени фото
const inputPhotoUrl = photoForm.querySelector('.popup__input_el_pic-url'); //поле ввода ссылки
const btnSubmitNewPhoto = photoForm.querySelector('.popup__submit-btn'); //Форма добавления фото

// Поп-ап с большим фото
const popupShowBigPhoto = document.querySelector('.popup_type_view-photo'); // поп-ап отобр. увеличенного фото
const photoBig = popupShowBigPhoto.querySelector('.popup__image'); // увеличенное фото поп-апа
const popupCaption =  document.querySelector('.popup__picture-caption'); // Описание для попапа с фото в увелич. размере

const cardsSection = document.querySelector('.cards'); //Секция Cards - место куда добавляются карточки


//установка слушателей попапам и отслеживание нажатие либо на крестик либо на оверлей
const setOverlayEvtListeners = (popupsArray) => {
  popupsArray.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-btn')){
        closePopup(popup);
      }
    });
  })
}

setOverlayEvtListeners(popupsArray);

// обработчик нажатия кнопки Esc
const pressEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.key === 'Escape' && popupOpened) {
      closePopup(popupOpened);
    }
  }
}

//сбрасываем поля формы
const clearForm = (popup) => {
  const form = popup.querySelector('.popup__form');
  form.reset();
}

//открываем поп-ап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscHandler);
}

//закрываем поп-ап
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEscHandler);
}

const checkValidationInput = (classFormValidation, formInputs) => {
  formInputs.forEach((input)=> {
    classFormValidation.isInputsValid(input);
  })
}

//Нажали на кнопку добавить фото
const addNewPhotoHandler = () => {
  clearForm(popupAddNewPhoto);
  checkValidationInput(formValidationAddNewPhoto, inputsPhotoFormList);
  openPopup(popupAddNewPhoto);
  formValidationAddNewPhoto.toggleBtnSubmitState(inputsPhotoFormList, btnSubmitNewPhoto);
}

btnNewPhoto.addEventListener('click', addNewPhotoHandler);

//обработчик сабмита добавления фото
const addNewPhotoFormHandler = (evt) => {
  evt.preventDefault();
  const inputNewPhotoData = {};
  inputNewPhotoData.name = inputPhotoName.value;
  inputNewPhotoData.link = inputPhotoUrl.value;
  const card = new Card(inputNewPhotoData,'#card-template', handleClickToImg);
  placeCardInDom(card, cardsSection);
  closePopup(popupAddNewPhoto);-
}

photoForm.addEventListener('submit', addNewPhotoFormHandler);

//Функция обработки слушателя кнопку Ред. профиля
const editProfileBtnHandler = () => {
  openPopup(popupProfile);
  //читаем значения профиля и записываем их в инпуты формы
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  //переключаем состояние кнопки после запись в инпуты значений
  formValidationEditProfile.toggleBtnSubmitState(inputsEditProfileForm, btnSubmitEditProfile);
  //проверяем состояние полей после запись в инпуты значений
  checkValidationInput(formValidationEditProfile, inputsEditProfileForm);
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

  // Обработчик клика по фото в карточке, открывает большое фото
const handleClickToImg = (name, link) => {
  popupCaption.textContent = name;
  photoBig.alt = name;
  photoBig.src = link;
  openPopup(popupShowBigPhoto);
}

  // Размещаем собранную карточку в DOM
const placeCardInDom = (newCard, place) => {
  place.prepend(newCard.generateCard());
}

  // Перебираем массив начальных данных для 6 карточек
initialCardsData.forEach((itemArray) => {
  const card = new Card(itemArray,'#card-template', handleClickToImg);
  placeCardInDom(card, cardsSection)
});

  // Валидация форм
const formValidationAddNewPhoto = new FormValidator (config, photoForm);
formValidationAddNewPhoto.enableValidation();

const formValidationEditProfile = new FormValidator (config, profileForm);
formValidationEditProfile.enableValidation();


