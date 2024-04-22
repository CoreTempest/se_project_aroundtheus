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

/*Elements*/
/*Elements*/

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileCloseBtn = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileModalCloseBtn = profileEditModal.querySelector(".modal__close");
const addCardModalCloseBtn = addCardModal.querySelector(".modal__close");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListEl = document.querySelector(".cards__list");

const addNewCardButton = document.querySelector(".profile__add-button");

/*Functions*/
/*Functions*/

function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.name);
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

/*Event Listeners*/
/*Event Listeners*/

profileEditBtn.addEventListener("click", () => {
  openModal(profileEditModal);
});

profileModalCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseBtn.addEventListener("click", () => closeModal(addCardModal));

/*Event Handlers*/
/*Event Handlers*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal();
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);

  cardListEl.prepend(cardElement);
});
