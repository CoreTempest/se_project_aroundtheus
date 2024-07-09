import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/components.js";
import Api from "../components/Api.js";
import DeleteConfirm from "../components/DeleteConfirm.js";

// Wrappers
// Wrappers

const cardListElement = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = document.querySelector("#add-card-form");

// Buttons & DOM
// Buttons & DOM

const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__avatar-button");

// Form Data
// Form Data

const cardTitleInput = document.querySelector(".modal__input_type_title");
const cardUrlInput = document.querySelector(".modal__input_type_url");
const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-description-input");
const profileNameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");
const editAvatarForm = document.forms["profile-avatar-form"];
const avatarElement = document.querySelector("#profile__image");
const deleteCardForm = document.forms["delete-card-form"];

// Cards & API
// Cards & API

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "08f4dfe1-21ea-4bc5-b16b-fd0c38e22f31",
    "Content-Type": "application/json",
  },
});

const renderCard = (cardData) => {
  const card = createCard(cardData);
  section.addItem(card);
};

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

Promise.all([api.getInitialCards(), api.getProfileInfo()])
  .then(([cards, userInfo]) => {
    console.log(cards, userInfo);
  })
  .catch((err) => console.error(err));

let section;

api
  .getInitialCards()
  .then((initialCards) => {
    section = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          const cardElement = createCard(data);
          section.addItem(cardElement);
        },
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getProfileInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

//Section.js
//Section.js

/*const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);
section.renderItems(); */

// PopupWithForm
// PopupWithForm

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});

const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});

const avatarPopup = new PopupWithForm({
  popupSelector: "#profile-avatar-modal",
  handleFormSubmit: handleAvatarFormSubmit,
});

// PopupWithImage
// PopupWithImage

const newImagePopup = new PopupWithImage(
  "#image-preview-modal",
  handleImageClick
);

// UserInfo
// UserInfo

const userInfo = new UserInfo(profileNameElement, jobElement, avatarElement);

// DeletePopup
// DeletePopup

const cardDeletePopup = new DeleteConfirm("#delete-card", deleteCardForm);

// Validation
// Validation

const editFormValidator = new FormValidator(settings, profileEditModal);
const addFormValidator = new FormValidator(settings, addCardModal);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(settings, editAvatarForm);
avatarFormValidator.enableValidation();

// Avatar Updates
// Avatar Updates

editAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarFormValidator.disableButton();
});

//Functions
//Functions

function handleAvatarFormSubmit(userData) {
  avatarPopup.renderloading(true);
  api
    .avatarImageUpdate(userData)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderloading(false);
      avatarPopup.close();
    });
}

function handleDeleteCard() {}

function handleLikeCard() {}

function handleDeleteModal() {}

function handleProfileEditSubmit(userData) {
  userInfo.setUserInfo(userData);
  editProfilePopup.close();
}

function prefillProfileData() {
  const { name, description } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = description;
  editFormValidator.resetValidation();
  editProfilePopup.open();
}

function handleImageClick(cardData) {
  newImagePopup.open(cardData);
}

function handleAddCardFormSubmit(userInfo) {
  const name = userInfo.title;
  const link = userInfo.url;
  renderCard({ name, link }, cardListElement);
  addCardFormElement.reset();
  newCardPopup.close();
  addFormValidator.disableButton();
}

//Event Listeners
//Event Listeners

cardDeletePopup.setEventListeners();

editProfilePopup.setEventListeners();

newCardPopup.setEventListeners();

avatarPopup.setEventListeners();

newImagePopup.setEventListeners();

profileEditBtn.addEventListener("click", prefillProfileData);

addNewCardButton.addEventListener("click", () => newCardPopup.open());
