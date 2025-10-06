// Initial Card Data
const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// DOM Elements — Profile
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector("#edit-profile-modal");
const profileCloseButton = profileModal.querySelector(".modal__close-button");

const profileAddButton = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#new-post-modal");
const profileAddCloseButton = profileAddModal.querySelector(
  ".modal__close-button"
);

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = profileModal.querySelector("#profile-name-input");
const profileDescriptionInput = profileModal.querySelector(
  "#profile-description-input"
);

const profileForm = profileModal.querySelector(".modal__form");
const newPostForm = profileAddModal.querySelector(".modal__form");

const postImageLink = profileAddModal.querySelector("#card-image-input");
const postCaption = profileAddModal.querySelector("#card-caption-input");

// DOM Elements — Preview Modal

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button"
);
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

// DOM Elements — Cards
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardList = document.querySelector(".cards__list");

// Modal Helpers
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// Profile Modal Listeners
profileEditButton.addEventListener("click", () => {
  fillInputFields();
  openModal(profileModal);
});

profileCloseButton.addEventListener("click", () => {
  closeModal(profileModal);
});

// Add Post Modal Listeners
profileAddButton.addEventListener("click", () => {
  openModal(profileAddModal);
});

profileAddCloseButton.addEventListener("click", () => {
  closeModal(profileAddModal);
});

// Form Handlers
function fillInputFields() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileModal);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: postCaption.value,
    link: postImageLink.value,
  };

  const cardElement = getCardElement(inputValues);
  cardList.prepend(cardElement);
  closeModal(profileAddModal);
  evt.target.reset();
}

// Attach Form Listeners
profileForm.addEventListener("submit", handleProfileEditSubmit);
newPostForm.addEventListener("submit", handleNewPostSubmit);

// Generate Initial Cards
initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardList.append(cardElement);
});

// Card Creation Function
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  // Set image and title
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  // Like button
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  // Delete button
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Preview image click
  cardImageEl.addEventListener("click", () => {
    previewCaptionEl.textContent = data.name;
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Preview Modal Close Button
previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});
