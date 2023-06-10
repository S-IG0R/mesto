export class UserInfo {
  constructor ({userNameSelector, userJobSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  //возвращает объект с данными пользователя
  getUserInfo () {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent,
      id: this._userId,
      avatar: this._userAvatar.src
    }
  }

  //принимает новые данные
  setUserInfo ({name, about, _id, avatar}) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this._userId = _id;
    this._userAvatar.src = avatar;
  }
}
