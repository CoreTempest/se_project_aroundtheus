import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/components.js";

//                                    NEED TO FIX LIST
// Profile edit button opens the "add card" modal. Find out where and why that's happening. FIXED
// Header and profile image still broken (?) in html file. FIXED
// Clean up the rest of index.js, aka refactor remaining functions, handlers and event listeners as needed. I hope FIXED (pending review)

// Wrappers
// Wrappers

const cardListElement = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = document.querySelector("#edit-profile-form");
const addCardFormElement = document.querySelector("#add-card-form");
const modalImage = document.querySelector(".modal__image");
const imageModalTitle = document.querySelector(".modal__image-title");

// Buttons & DOM
// Buttons & DOM

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const closeButtons = document.querySelectorAll(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");
const imageModalPreview = document.querySelector("#image-preview-modal");

// Form Data
// Form Data

const cardTitleInput = document.querySelector(".modal__input_type_title");
const cardUrlInput = document.querySelector(".modal__input_type_url");
const nameInput = document.querySelector(".modal__input_type_name");
const jobInput = document.querySelector(".modal__input_type_description");

// Child Consts & Set up
// Child Consts & Set up

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
newCardPopup.setEventListeners();

const newImagePopup = new PopupWithImage("#image-preview-modal");
newImagePopup.setEventListeners();

const userInfo = new UserInfo({
  profileNameElement: "#profile-title-input",
  jobElement: "#profile-description-input",
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);
cardSection.renderItems();

profileEditBtn.addEventListener("click", () => {
  //editProfilePopup.open();
  profileTitleInput.value = userInfo.textContent;
  profileDescriptionInput.value = userInfo.textContent;
  editFormValidator.disableButton();
});
addNewCardButton.addEventListener("click", () => newCardPopup.open());

// Validation
// Validation

const editFormValidator = new FormValidator(settings, profileEditModal);
const addFormValidator = new FormValidator(settings, addCardModal);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Card Preview
// Card Preview

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData, cardListElement) {
  const cardElement = createCard(cardData);
  cardListElement.prepend(cardElement);
}

//Functions
//Functions

function handleImageClick(cardData) {
  newImagePopup.open(cardData);
}

function prefillProfileData() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
  editProfilePopup.open();
}

//Event Listeners
//Event Listeners

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => newCardPopup.close());
});

profileEditBtn.addEventListener("click", prefillProfileData);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => newCardPopup.open());

//Event Handlers
//Event Handlers

function handleProfileEditSubmit(userData) {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
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

initialCards.forEach((cardData) => renderCard(cardData, cardListElement));

// Popup.js
/*function handleEscapeToClose(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}
//Popup.js
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeToClose);
  modal.addEventListener("mousedown", closeModalOnClick);
}
//Popup.js

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeToClose);
  modal.removeEventListener("mousedown", closeModalOnClick);
}
//Popup.js
 function closeModalOnClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}*/
