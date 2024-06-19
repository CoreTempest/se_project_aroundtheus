import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupElement.querySelector(".modal__form");
    this.this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

// index.js
const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
