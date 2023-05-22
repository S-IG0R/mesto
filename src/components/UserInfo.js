export class UserInfo {
  constructor ({userNameSelector, userJobSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  getUserInfo () {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    }
  }

  setUserInfo ({name, job}) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    }
  }
}
