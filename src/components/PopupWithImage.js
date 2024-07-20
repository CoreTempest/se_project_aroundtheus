import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imagePreview = this._popupElement.querySelector(".modal__image");
    this._textPreview = this._popupElement.querySelector(".modal__image-title");
  }
  open({ name, link }) {
    this._imagePreview.src = link;
    this._imagePreview.alt = name;
    this._textPreview.textContent = name;
    super.open();
  }
}
