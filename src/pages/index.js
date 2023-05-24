// импорт для сборщика
import '../pages/index.css';

//настройки валидатора
import {config} from '../scripts/validation.js'

// классы
import {FormValidator} from '../components/FormValidator.js'
import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {UserInfo} from '../components/UserInfo.js'


// константы
import {
  initialCardsData,
  profileEditBtn,
  inputName,
  inputJob,
  btnNewPhoto,
  popupAddPhoto,
  photoForm,
  popupShowBigPhoto,
  profileForm,
  popupProfile
} from '../scripts/constants.js'


// обработчик нажатия на кнопку добавить новое фото
const openCardPopup = () => {
  formValidationAddNewPhoto.resetValidation();
  popupAddNewPicture.open();
}

btnNewPhoto.addEventListener('click', openCardPopup);



// занесение данных профиля в поля ввода формы
const setInputsProfileData = () => {
  const {name, job} = userInfo.getUserInfo();
  inputName.value = name;
  inputJob.value = job;
}



// обработчик нажатия кнопку Ред. профиля
const editProfileBtnHandler = () => {
  setInputsProfileData();
  formValidationEditProfile.resetValidation();
  popupWithUserProfile.open();
}

profileEditBtn.addEventListener('click', editProfileBtnHandler);



// Валидация форм
const formValidationAddNewPhoto = new FormValidator (config, photoForm);
formValidationAddNewPhoto.enableValidation();

const formValidationEditProfile = new FormValidator (config, profileForm);
formValidationEditProfile.enableValidation();




// Обработчик клика по фото в карточке, открывает большое фото
const handleClickToImg = (name, link) => {
  popupWithImage.open(name, link);
}



// функция создания новой карточки
const createCard = (cardElement) => {
  const card = new Card (cardElement, '#card-template', handleClickToImg);
  return card.generateCard();
}


// размещение начальны карточек
const cardList = new Section ((cardElement) => {
  cardList.addItem(createCard(cardElement));
},
'.cards'
)

cardList.renderCards(initialCardsData);



// попап редактирования профиля пользователя
const popupWithUserProfile = new PopupWithForm ({
  popupSelector: popupProfile,
  formSubmit: (inputsData) => {
    userInfo.setUserInfo(inputsData);
  }
});



// попап добавления нового фото
const popupAddNewPicture = new PopupWithForm ({
  popupSelector: popupAddPhoto,
  formSubmit: (inputValues) => {
      addNewCard.renderCards([inputValues]);
    }
  });



//класс добавления нового фото через форму
const addNewCard = new Section (
  (cardElement) => {
    addNewCard.addItem(createCard(cardElement));
  },
  '.cards')



// класс обработки данных
const userInfo = new UserInfo (
  {
    userNameSelector: '.profile__hero-name',
    userJobSelector: '.profile__hero-job'
  }
)



// попап с увеличенной картинкой
const popupWithImage = new PopupWithImage(popupShowBigPhoto);
popupWithImage.setEvtListeners();


