export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getProfileInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  editProfileInfo(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  avatarImageUpdate({ link }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  newCardAdd(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  cardDelete(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this_headers,
    });
  }

  dislikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
