class Auth {
  constructor(config) {
    this._url =  config.baseUrl;
    this._headers = config.headers;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  signUp(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
    .then(res => this.handleResponse(res));
  }

  signIn(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
    .then(res => this.handleResponse(res));
  }

  getUserInfo(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${jwt}`
      }
    })
    .then(res => this.handleResponse(res));
  }
};

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    "Content-Type": "application/json"
  }
});

export default auth;
