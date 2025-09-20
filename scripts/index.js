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

// Open/close helpers
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// Button listeners
profileEditButton.addEventListener("click", function () {
  fillInputFields();
  openModal(profileModal);
});

profileCloseButton.addEventListener("click", function () {
  closeModal(profileModal);
});

profileAddButton.addEventListener("click", function () {
  openModal(profileAddModal);
});

profileAddCloseButton.addEventListener("click", function () {
  closeModal(profileAddModal);
});

// Fill form inputs with current profile data
function fillInputFields() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Profile form submit
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileModal);
}

profileForm.addEventListener("submit", handleProfileEditSubmit);

// New post form submit
function handleNewPostSubmit(evt) {
  evt.preventDefault();
  console.log(postImageLink.value);
  console.log(postCaption.value);
  closeModal(profileAddModal);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);
