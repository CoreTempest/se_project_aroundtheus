import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago Di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

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

// Validation
// Validation

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: ".modal__input_type_error",
  errorClass: ".modal__error_visible",
};

//const editFormElement = profileEditModal.querySelector(".modal__form");
//const addFormElement = addCardModal.querySelector(".modal__form");
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

function handleImageClick(cardData) {
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  imageModalTitle.textContent = cardData.name;
  openModal(imageModalPreview);
}

//Functions
//Functions

function prefillProfileData() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
  openModal(profileEditModal);
}

function handleEscapeToClose(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeToClose);
  modal.addEventListener("mousedown", closeModalOnClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeToClose);
  modal.removeEventListener("mousedown", closeModalOnClick);
}

function closeModalOnClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

//Event Listeners
//Event Listeners

profileEditBtn.addEventListener("click", prefillProfileData);

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

//Event Handlers
//Event Handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListElement);
  addCardFormElement.reset();
  closeModal(addCardModal);
  addFormValidator.disableButton();
}

initialCards.forEach((cardData) => renderCard(cardData, cardListElement));
