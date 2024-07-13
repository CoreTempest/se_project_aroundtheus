import Popup from "./Popup.js";

export default class DeleteConfirm extends Popup {
  constructor(popupSelector, deleteCardForm, handleCardDelete) {
    super({ popupSelector });
    this._handleCardDelete = handleCardDelete;
    this._deleteCardForm = deleteCardForm;
  }

  submitHandler(handler) {
    this._handleCardDelete = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteCardForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleCardDelete();
    });
  }
}
