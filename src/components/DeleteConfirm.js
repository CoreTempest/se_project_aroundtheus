import Popup from "./Popup.js";

export default class DeleteConfirm extends Popup {
  constructor(popupSelector, deleteCardForm, handleCardDelete) {
    super({ popupSelector });
    this._handleCardDelete = handleCardDelete;
    this._deleteCardForm = deleteCardForm;
  }

  confirmDelete(apiConfirm) {
    this._handleCardDelete = apiConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteCardForm.addEventListeners("submit", (evt) => {
      evt.preventDefault();
      this._handleCardDelete();
    });
  }
}
