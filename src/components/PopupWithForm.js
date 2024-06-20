import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelector(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {}

  setEventListeners() {}
}

export default PopupWithForm;

// index.js
const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
