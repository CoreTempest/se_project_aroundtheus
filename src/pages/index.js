import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { settings } from "../utils/components.js";
import Api from "../components/Api.js";
import DeleteConfirm from "../components/DeleteConfirm.js";

// Buttons & DOM
// Buttons & DOM

const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__avatar-button");
const confirmDeleteBtn = document.querySelector(".modal__submit-button");

// Form Data
// Form Data

const addCardForm = document.forms["add-card-form"];
const profileFormElement = document.forms["edit-profile-form"];
const editAvatarForm = document.forms["profile-avatar-form"];
const deleteCardForm = document.forms["delete-card-form"];
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescInput = document.querySelector("#profile-description-input");

// Cards & API
// Cards & API

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "08f4dfe1-21ea-4bc5-b16b-fd0c38e22f31",
    "Content-Type": "application/json",
  },
});

let section;

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        cards,
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

// UserInfo
// UserInfo

const userInfo = new UserInfo("#name", "#about", "#avatar");

api
  .getProfileInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

// PopupWithForm
// PopupWithForm

const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});

const avatarPopup = new PopupWithForm({
  popupSelector: "#profile-avatar-modal",
  handleFormSubmit: handleAvatarFormSubmit,
});

// PopupWithImage
// PopupWithImage

const newImagePopup = new PopupWithImage("#image-preview-modal");

// DeletePopup
// DeletePopup

const cardDeletePopup = new DeleteConfirm("#delete-card", deleteCardForm);

// Event Listeners
// Event Listeners

profileFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
});
newImagePopup.setEventListeners();
cardDeletePopup.setEventListeners();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();
avatarPopup.setEventListeners();

// Form Validation
// Form Validation

const editFormValidator = new FormValidator(settings, profileFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, addCardForm);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(settings, editAvatarForm);
avatarFormValidator.enableValidation();

// Modals
// Modals

function handleImageClick(name, link) {
  newImagePopup.open({ name, link });
}

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

editAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
});

profileEditBtn.addEventListener("click", (e) => {
  editProfilePopup.open();
  e.preventDefault();
  const newUserInfo = userInfo.getUserInfo();
  newUserInfo.setInputValues();
  //profileNameInput.value = newUserInfo.name;
  //profileDescInput.value = newUserInfo.description;
});

// Functions
// Functions

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteModal,
    handleLikeCard
  );
  const cardElement = card.getView();
  return cardElement;
}

function handleDeleteModal(card) {
  cardDeletePopup.setSubmitHandler(() => handleDeleteCard(card));
  cardDeletePopup.open();
}

function handleDeleteCard(card) {
  const cardId = card.gatherCardId();
  api
    .cardDelete(cardId)
    .then(() => {
      card.handleDelete();
      cardDeletePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeCard(card) {
  if (card.isLiked) {
    api
      .dislikeCard(card.gatherCardId())
      .then(() => {
        card.handleLike(false);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(card.gatherCardId())
      .then(() => {
        card.handleLike(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// Form Submission
// Form Submission

function handleAddCardFormSubmit(data) {
  newCardPopup.renderloading(true);
  api
    .newCardAdd({ name: data.title, link: data.url })
    .then((data) => {
      const addCardElement = createCard(data);
      section.addItem(addCardElement);
      newCardPopup.resetForm();
      newCardPopup.close();
      addFormValidator.disableButton();
    })
    .catch(console.error)

    .finally(() => {
      newCardPopup.renderloading(false);
    });
}

function handleProfileEditSubmit(userData) {
  editProfilePopup.renderloading(true);
  api
    .editProfileInfo(userData.name, userData.description)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      editFormValidator.disableButton();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.renderloading(false);
    });
}

function handleAvatarFormSubmit(userData) {
  avatarPopup.renderloading(true);
  api
    .avatarImageUpdate(userData)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderloading(false);
    });
}
