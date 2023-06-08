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
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js'
import {Api} from '../components/Api.js'


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
  popupProfile,
  avatarEditBtn,
  popupWithAvatar,
  avatarForm,
  profileAvatar,
  popupConfirmDeleteCard,
} from '../scripts/constants.js'


//инициализация класса работы с сервером
const api = new Api(
  {
    url: 'https://mesto.nomoreparties.co./v1/cohort-68',
    headers: {
      authorization: 'ca1ad0da-7d1b-4b57-af90-a949f65fb3b0',
      'Content-Type': 'application/json'
   }
  }
)

//добавление кнопки сабмита '...' на время передачи на сервер данных
const showLoadProcess = (state, selector) => {
  const btnElement = document.querySelector(selector);
  if (state) {
    btnElement.classList.add('popup__submit-btn_type_loading');
  } else {
    btnElement.classList.remove('popup__submit-btn_type_loading');
  }
}


//загрузка аватарки с сервера
const setAvatar = (avatar) => {
  profileAvatar.src = avatar;
}


// обработка запросов на сервер: начальные карточки и данные пользователя
// используется самовызывающаяся ф-я IIFE
(() => {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    //загружаем данные пользователя
    userInfo.setUserInfo(userData);
    setAvatar(userInfo.getUserInfo().avatar);
    //рендерим массив карточек с сервера
    cardList.renderCards(cardsData.reverse());
  })
  .catch((err) => console.log(err));
})()



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

const handleSubmitDelete = (cardId, card) => {
  popupWithConfirmation.open();
  popupWithConfirmation.handleSubmit(() => {
  showLoadProcess(true, '.popup__submit-btn_type_confirm-delete');
    api.deleteCard(cardId).then(() => {
      showLoadProcess(false, '.popup__submit-btn_type_confirm-delete');
      card.remove()
      popupWithConfirmation.close();
    })
    .catch(err => console.log(err))
  })
}


const handleLikeCard = (cardId, likeState, updLike) => {
  if (!likeState) {
    api.putLike(cardId).then((data) => {
      updLike(data);
    })
    .catch(err => console.log(err))
  } else {
    api.deleteLike(cardId).then((data) => {
      updLike(data);
    })
    .catch(err => console.log(err))
  }
}

// функция создания новой карточки
const createCard = (cardElement) => {

  const card = new Card (
    cardElement,
    '#card-template',
    handleClickToImg,
    userInfo.getUserInfo(),
    handleSubmitDelete,
    handleLikeCard
  );

  return card.generateCard();
}


// размещение начальны карточек в DOM
const cardList = new Section ((cardElement) => {
  const card = createCard(cardElement)
  cardList.addItem(card);
},
'.cards'
)


// попап редактирования профиля пользователя
const popupWithUserProfile = new PopupWithForm ({
  popup: popupProfile,
  formSubmit: (inputsData) => {
    showLoadProcess(true,'.popup__submit-btn_type_edit-bio');
    const {name, job: about} = inputsData;
    api.setProfileData({name, about}).then(() => {
      userInfo.setUserInfo({name, about});
      showLoadProcess(false,'.popup__submit-btn_type_edit-bio');
      popupWithUserProfile.close();
    })
    .catch(err => console.log(err))
  }
});


// попап добавления нового фото
const popupAddNewPicture = new PopupWithForm ({
  popup: popupAddPhoto,
  formSubmit:(inputValues) => {
    showLoadProcess(true,'.popup__submit-btn_type_new-photo');
    api.addNewCard(inputValues).then((data) => {
      addNewCard.renderCards([data]);
      showLoadProcess(false,'.popup__submit-btn_type_new-photo');
      popupAddNewPicture.close();
    })
    .catch(err => console.log(err))
  }
});

// попап редактирования аватара
const popupEditAvatar = new PopupWithForm ({
  popup: popupWithAvatar,
  formSubmit: (inputValue) => {
    showLoadProcess(true,'.popup__submit-btn_type_avatar-change');
    api.setUserAvatar(inputValue).then(() => {
      setAvatar(inputValue.avatar);
      showLoadProcess(false,'.popup__submit-btn_type_avatar-change');
      popupEditAvatar.close();
    })
    .catch(err => console.log(err))
  }
});


const popupWithConfirmation = new PopupWithConfirmation({
  popup: popupConfirmDeleteCard
});

popupWithConfirmation.setEvtListeners()


// размещение нового фото
const addNewCard = new Section ((cardElement) => {
    const card = createCard(cardElement)
    addNewCard.addItem(card);
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

