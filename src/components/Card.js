export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteModal,
    handleLike
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteModal = handleDeleteModal;
    this._handleLike = handleLike;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike(this);
    });

    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteModal(this);
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
        src: this._name,
      });
    });
  }

  handleLike(isLiked) {
    this._isLiked = isLiked;
    this.renderCardLike();
  }

  renderCardLike() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  isLiked() {
    return this.isLiked;
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
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }

  gatherCardId() {
    return this._id;
  }
}
