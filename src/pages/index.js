import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/components.js";

// Wrappers
// Wrappers

const cardListElement = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileDescription = document.querySelector("#profile-description-input");
const profileTitle = document.querySelector("#profile-title-input");

const addCardFormElement = document.querySelector("#add-card-form");

// Buttons & DOM
// Buttons & DOM

const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

// Form Data
// Form Data

const cardTitleInput = document.querySelector(".modal__input_type_title");
const cardUrlInput = document.querySelector(".modal__input_type_url");
const nameInput = document.querySelector(".modal__input_type_name");
const jobInput = document.querySelector(".modal__input_type_description");
const profileNameElement = document.querySelector("#profile-title-input");
const jobElement = document.querySelector("#profile-description-input");

//Section.js
//Section.js

const renderCard = (cardData) => {
  const card = createCard(cardData);
  section.addItem(card);
};

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

// function createCard(item) {
// here you create a card
//return cardElement.getView();
//}

const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);
section.renderItems();

// PopupWithForm
// PopupWithForm

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
newCardPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => newCardPopup.open());

// PopupWithImage
// PopupWithImage

const newImagePopup = new PopupWithImage("#image-preview-modal");
newImagePopup.setEventListeners();

// UserInfo
// UserInfo

const userInfo = new UserInfo(profileNameElement, jobElement);

// Validation
// Validation

const editFormValidator = new FormValidator(settings, profileEditModal);
const addFormValidator = new FormValidator(settings, addCardModal);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

//Functions
//Functions

function handleImageClick(cardData) {
  newImagePopup.open(cardData);
}

function prefillProfileData() {
  editFormValidator.resetValidation();
  editProfilePopup.open();
}

//Event Listeners
//Event Listeners

profileEditBtn.addEventListener("click", prefillProfileData);

addNewCardButton.addEventListener("click", () => newCardPopup.open());

//Event Handlers
//Event Handlers

function handleProfileEditSubmit(userData) {
  userInfo.setUserInfo(userData);
  editProfilePopup.close();
}
function handleAddCardFormSubmit(e) {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListElement);
  addCardFormElement.reset();
  newCardPopup.close();
  addFormValidator.disableButton();
}
