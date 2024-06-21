import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imagePreview = this._popupElement.querySelector(".modal__image");
    this._textPreview = this._popupElement.querySelector(".modal__image-title");
  }
  open(data) {
    this._imagePreview.src = data.link;
    this._imagePreview.alt = data.name;
    this._textPreview.textContent = data.name;
    super.open();
  }
}
