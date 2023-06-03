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
import Api from '../components/Api.js'


// константы
import {
  // initialCardsData,
  profileEditBtn,
  inputName,
  inputJob,
  btnNewPhoto,
  popupAddPhoto,
  photoForm,
  popupShowBigPhoto,
  profileForm,
  popupProfile,
  avatarEditBtn,
  popupWithAvatar,
  avatarForm,
  profileAvatar
} from '../scripts/constants.js'


//работа с сервером
const api = new Api(
  {
    url: 'https://mesto.nomoreparties.co./v1/cohort-68',
    headers: {
      authorization: 'ca1ad0da-7d1b-4b57-af90-a949f65fb3b0',
      'Content-Type': 'application/json'
   }
  }
)


//загрузка аватарки с сервера
const loadAvatar = (avatarUrl) => {
  profileAvatar.src = avatarUrl;
}


const loadUserInfo = () => {
  api.getUserInfo().then((userData) => {
    userInfo.setUserInfo(userData);
    loadAvatar(userData.avatar);
  }).catch(err => console.log(err))
}

loadUserInfo();


// обработчик клика на аватарку
const handleAvatarClick = () => {
  formValidationAvatarEdit.resetValidation();
  popupEditAvatar.open();
}

avatarEditBtn.addEventListener('click', handleAvatarClick)



// обработчик нажатия на кнопку добавить новое фото
const openCardPopup = () => {
  formValidationAddNewPhoto.resetValidation();
  popupAddNewPicture.open();
}

btnNewPhoto.addEventListener('click', openCardPopup);



// занесение данных профиля в поля ввода формы
const setInputsProfileData = () => {
  const {name, about} = userInfo.getUserInfo();
  inputName.value = name;
  inputJob.value = about;
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

const formValidationAvatarEdit = new FormValidator (config, avatarForm);
formValidationAvatarEdit.enableValidation();



// Обработчик клика по фото в карточке, открывает большое фото
const handleClickToImg = (name, link) => {
  popupWithImage.open(name, link);
}


// функция создания новой карточки
const createCard = (cardElement) => {
  const card = new Card (cardElement, '#card-template', handleClickToImg);
  return card.generateCard();
}


// размещение начальны карточек в DOM
const cardList = new Section ((cardElement) => {
  const card = createCard(cardElement)
  cardList.addItem(card);
},
'.cards'
)

//загружаем карточки с сервера
api.getInitialCards().then((cardsData) => {
  cardList.renderCards(cardsData);
})
.catch(err => console.log(err))

// cardList.renderCards(initialCardsData);



// попап редактирования профиля пользователя
const popupWithUserProfile = new PopupWithForm ({
  popupSelector: popupProfile,
  formSubmit: (inputsData) => {
    const {name, job: about} = inputsData;
    api.setProfileData({name, about}).then(() => {
      userInfo.setUserInfo({name, about});
    })
    .catch(err => console.log(err))
  }
});



// попап добавления нового фото
const popupAddNewPicture = new PopupWithForm ({
  popupSelector: popupAddPhoto,
  formSubmit: (inputValues) => {
      addNewCard.renderCards([inputValues]);
  }
});

// попап редактирования аватара
const popupEditAvatar = new PopupWithForm ({
  popupSelector: popupWithAvatar,
  formSubmit: (inputValue) => {
    api.setUserAvatar(inputValue).then(() => {
      loadAvatar(inputValue.avatar);
    })
    .catch(err => console.log(err))
  }
})

// размещение нового фото через форму
const addNewCard = new Section (
  (cardElement) => {
    const card = createCard(cardElement)
    addNewCard.addItem(createCard(card));
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






