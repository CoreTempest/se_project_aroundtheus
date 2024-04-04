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
const profileEditModal = document.querySelector("#profile-edit-modal");

const profileCloseBtn = document.querySelector("#modal-close-button");
const profileCloseModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListEl = document.querySelector(".cards__list");
/*Functions*/
/*Functions*/

function closePopUp() {
  profileEditModal.classList.remove("modal__opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");

  const cardTitleEl = cardElement.querySelector(".card__title");

  const cardImageAltEl = cardElement.querySelector(".card__title");
  cardImageAltEl.textcontent = cardData.name;
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

/*Event Listeners*/
/*Event Listeners*/

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal__opened");
});

profileCloseBtn.addEventListener("click", () => {
  closePopUp();
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/*Event Handlers*/
/*Event Handlers*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp();
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);

  cardListEl.prepend(cardElement);
});
