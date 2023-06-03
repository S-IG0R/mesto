export default class Api {
  constructor ({url, headers}) {
    this._url = url
    this._headers = headers;
  }

  getUserInfo () {
    return fetch(`${this._url}/users/me`,
    {
      headers: this._headers
    }
    )
    .then(this._result)

  }

  getInitialCards () {
    return fetch(`${this._url}/cards`,
    {
      headers: this._headers
    }
    )
    .then(this._result)
  }


  setUserAvatar (avatar) {
    return fetch(`${this._url}/users/me/avatar`,
    {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    }
    )
    .then(this._result)
  }

  setProfileData (userData) {
    return fetch(`${this._url}/users/me/`,
    {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData)
    }
    )
    .then(this._result)
  }

  addNewCard (cardData) {
    return fetch(`${this._url}/cards`,
    {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardData)
    }
    )
    .then(this._result)
  }

  _result(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Произошла ошибка: ${res.status}, ${res.statusText}`);
    }
  }

}


