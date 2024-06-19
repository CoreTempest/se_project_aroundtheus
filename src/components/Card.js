export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });

    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
        src: this._name,
      });
    });
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.setAttribute("src", this._link);
    this._cardImageElement.setAttribute("alt", this._name);
    this._cardTitleElement.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
