export class UserInfo {
  constructor ({userNameSelector, userJobSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  //возвращает объект с данными пользователя со стр
  getUserInfo () {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent
    }
  }

  //принимает новые данные из инпутов и добавляет их на страницу
  setUserInfo ({name, about}) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
  }
}
