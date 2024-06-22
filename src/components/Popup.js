export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._openModal = document.querySelector(".modal_opened");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    // opens popup
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    // closes popup
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(this._openModal);
      //listens for esc button
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        this.close(this._openModal);
      }
      if (evt.target.classList.contains("modal__close")) {
        this.close(this._openModal);
      }
    });
  }
}
