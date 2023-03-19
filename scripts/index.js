const profileName = document.querySelector('.profile__hero-name'); //Профиль, Имя
const profileJob = document.querySelector('.profile__hero-job'); //Профиль, Род деятельности
const popupOpenButton = document.querySelector('.profile__edit-button'); //Профиль, кнопка Ред.

const popup = document.querySelector('.popup'); //Поп-ап
const inputName = popup.querySelector('.popup__input-name'); //Поп-ап поле ввода Имени
const inputJob = popup.querySelector('.popup__input-job'); //Поп-ап поле ввода Работы
const popupForm = popup.querySelector('.popup__form'); //Поп-ап форма
const popupCloseButton = popup.querySelector('.popup__close-btn'); //Кнопка крестик

//Функция открытия закрытия попап
function openAndClosePopup () {
  popup.classList.toggle('popup_opened');
}

//Нажали на кнопку Ред. профиля
popupOpenButton.addEventListener('click', function(){
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openAndClosePopup();
});

//Нажали на кнопку 'Х' в форме
popupCloseButton.addEventListener('click', function(){
  openAndClosePopup();
});

//Нажали на кнопку "сохранить" в форме
popupForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  openAndClosePopup();
});
