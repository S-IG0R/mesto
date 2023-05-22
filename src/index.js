import './index.css'; // импорт для сборщика

import {initialCardsData} from './scripts/constants.js'
import {config} from './scripts/validation.js'


// классы
import {FormValidator} from './components/FormValidator.js'
import {Card} from './components/Card.js'
import {Section} from './components/Section.js'
import {Popup} from './components/Popup.js'
import {PopupWithForm} from './components/PopupWithForm.js'
import {PopupWithImage} from './components/PopupWithImage.js'
import {UserInfo} from './components/UserInfo.js'


// константы
import {
  profileEditBtn,
  inputName,
  inputJob,
  btnNewPhoto,
  popupAddPhoto,
  photoForm,
  popupShowBigPhoto,
  profileForm,
  popupProfile
} from './scripts/constants.js'


// обработчик нажатия на кнопку добавить новое фото
const openCardPopup = () => {
  formValidationAddNewPhoto.resetValidation();
  popupAddNewPhoto.open();
}

btnNewPhoto.addEventListener('click', openCardPopup);



// занесение данных профиля в поля ввода формы
const setInputsProfileData = () => {
  const {userName, userJob} = userInfo.getUserInfo();
  inputName.value = userName;
  inputJob.value = userJob;
}



// обработчик нажатия кнопку Ред. профиля
const editProfileBtnHandler = () => {
  setInputsProfileData();
  formValidationEditProfile.resetValidation();
  popupWithUserProfile.open();
}

profileEditBtn.addEventListener('click', editProfileBtnHandler);



// Обработчик клика по фото в карточке, открывает большое фото
const handleClickToImg = (name, link) => {
  const popupWithImage = new PopupWithImage(name, link, popupShowBigPhoto);
  popupWithImage.open();
}



// Валидация форм
const formValidationAddNewPhoto = new FormValidator (config, photoForm);
formValidationAddNewPhoto.enableValidation();

const formValidationEditProfile = new FormValidator (config, profileForm);
formValidationEditProfile.enableValidation();



// размещение начальны карточек
const cardList = new Section (
{
  items: initialCardsData,
  renderer: (cardElement) =>
  {
    const card = new Card (cardElement, '#card-template', handleClickToImg);
    const createCard = card.generateCard();
    cardList.addItem(createCard);
  }
},
'.cards'
)

cardList.renderCards();



// попапы редактировать профиль новое фото
const popupAddNewPhoto = new Popup(popupAddPhoto);
const popupEditProfile = new Popup(popupProfile);



// попап редактирования профиля пользователя
const popupWithUserProfile = new PopupWithForm ({
  popupSelector: popupProfile,
  formSubmit: (inputsData) => {
    const userInfo = new UserInfo (
      {
        userNameSelector: '.profile__hero-name',
        userJobSelector: '.profile__hero-job'
      }
    )
    userInfo.setUserInfo(inputsData);
  }
});



// попап добавления нового фото
const popupAddNewPicture = new PopupWithForm ({
  popupSelector: popupAddPhoto,
  formSubmit: (inputValues) => {
    const addNewCard = new Section (
      {
        items: [inputValues],
        renderer: (cardElement) =>
        {
          const card = new Card (cardElement, '#card-template', handleClickToImg);
          const createCard = card.generateCard();
          addNewCard.addItem(createCard);
        }
      },
      '.cards'
      )
      addNewCard.renderCards();
  }
  });



// класс обработки данных
const userInfo = new UserInfo (
  {
    userNameSelector: '.profile__hero-name',
    userJobSelector: '.profile__hero-job'
  }
)
