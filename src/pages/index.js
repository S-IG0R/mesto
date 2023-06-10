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

//отображение процесса загрузки '...'
const showLoadProcess = (state, selector) => {
  const btnElement = document.querySelector(selector);
  if (state) {
    btnElement.textContent = 'Сохранение...';
  }
  else if (selector === '.popup__submit-btn_type_new-photo') {
    btnElement.textContent = 'Создать';
  } else {
    btnElement.textContent = 'Сохранить';
  }
}



// обработка запросов на сервер: начальные карточки и данные пользователя
// используется самовызывающаяся ф-я IIFE
(() => {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
      //загружаем данные пользователя в класс
    userInfo.setUserInfo(userData);
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
    api.deleteCard(cardId).then(() => {
      card.remove()
      popupWithConfirmation.close();
    })
    .catch(err => console.log(err))
  })
}

//Обработчик лайка
const handleLikeCard = (cardId, likeState, updateLike) => {
  if (!likeState) {
    api.putLike(cardId).then((response) => {
      updateLike(response);
    })
    .catch(err => console.log(err))
  } else {
    api.deleteLike(cardId).then((response) => {
      updateLike(response);
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
    api.setProfileData({name, about}).then((userData) => {
      userInfo.setUserInfo(userData);
      popupWithUserProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      showLoadProcess(false,'.popup__submit-btn_type_edit-bio');
    })
  }
});


// попап добавления нового фото
const popupAddNewPicture = new PopupWithForm ({
  popup: popupAddPhoto,
  formSubmit:(inputValues) => {
    showLoadProcess(true,'.popup__submit-btn_type_new-photo');
    api.addNewCard(inputValues).then((data) => {
      addNewCard.renderCards([data]);

      popupAddNewPicture.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      showLoadProcess(false,'.popup__submit-btn_type_new-photo');
    })
  }
});

// попап редактирования аватара
const popupEditAvatar = new PopupWithForm ({
  popup: popupWithAvatar,
  formSubmit: (inputValue) => {
    showLoadProcess(true,'.popup__submit-btn_type_avatar-change');
    api.setUserAvatar(inputValue).then((userData) => {
      userInfo.setUserInfo(userData);
      popupEditAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      showLoadProcess(false,'.popup__submit-btn_type_avatar-change');
    })
  }
});


//попап с подтверждением удаления
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
    userJobSelector: '.profile__hero-job',
    userAvatarSelector: '.profile__avatar'
  }
)


// попап с увеличенной картинкой
const popupWithImage = new PopupWithImage(popupShowBigPhoto);

popupWithImage.setEvtListeners();

