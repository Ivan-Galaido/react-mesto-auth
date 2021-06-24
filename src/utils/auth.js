class Auth {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _checkServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
  }

  register({ email, password }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email })
    }).then(this._checkServerResponse);
  }

  authorize({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email })
    }).then(this._checkServerResponse);
  }

  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    }).then(this._checkServerResponse);
  }
}

const auth = new Auth("https://auth.nomoreparties.co");

export default auth;
