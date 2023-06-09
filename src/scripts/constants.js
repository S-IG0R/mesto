//попап редактирования аватарки
export const avatarEditBtn = document.querySelector('.profile__avatar-edit-btn');
export const popupWithAvatar = document.querySelector('.popup_type_edit-avatar');
export const avatarForm = popupWithAvatar.querySelector('.popup__form_type_edit-avatar');

// попап реактирвания профиля
export const profileEditBtn = document.querySelector('.profile__edit-button'); //Профиль, кнопка Ред.
export const popupProfile = document.querySelector('.popup_type_edit-profile'); //Поп-ап редактирования профиля
export const profileForm = popupProfile.querySelector('.popup__form_type_edit-profile'); //Форма ред. профиля
export const inputName = popupProfile.querySelector('.popup__input_el_name'); //поле ввода Имени
export const inputJob = popupProfile.querySelector('.popup__input_el_job'); //поле ввода Работы

// Добавление нового фото
export const btnNewPhoto = document.querySelector('.profile__add-button'); //Кнопка добавить фото
export const popupAddPhoto = document.querySelector('.popup_type_add-photo'); //Поп-ап добавления фото
export const photoForm = document.querySelector('.popup__form_type_add-pic'); //Форма добавления фото

// Поп-ап с большим фото
export const popupShowBigPhoto = document.querySelector('.popup_type_view-photo'); // поп-ап отобр. увеличенного фото

//попап с подтверждением удаления карточки
export const popupConfirmDeleteCard = document.querySelector('.popup_type_confirm-delete');
