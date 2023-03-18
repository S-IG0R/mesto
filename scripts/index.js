const profileName = document.querySelector('.profile__hero-name'); //Профиль, Имя
const profileJob = document.querySelector('.profile__hero-job'); //Профиль, Род деятельности
const popupOpenButton = document.querySelector('.profile__edit-button'); //Профиль, кнопка Ред.

const popup = document.querySelector('.popup'); //Поп-ап
const inputName = popup.querySelector('.popup__input-name'); //Поп-ап поле ввода Имени
const inputJob = popup.querySelector('.popup__input-job'); //Поп-ап поле ввода Работы
const popupForm = popup.querySelector('.popup__form'); //Поп-ап форма
const popupCloseButton = popup.querySelector('.popup__close-btn'); //Кнопка крестик

popupOpenButton.addEventListener('click', function(){
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popup.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', function(){
  popup.classList.remove('popup_opened');
});

popupForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popup.classList.remove('popup_opened');
});
