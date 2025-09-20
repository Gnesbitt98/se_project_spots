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

profileEditButton.addEventListener("click", function () {
  fillInputFields();
  profileModal.classList.add("modal_is-opened");
});

profileCloseButton.addEventListener("click", function () {
  profileModal.classList.remove("modal_is-opened");
});

profileAddButton.addEventListener("click", function () {
  profileAddModal.classList.add("modal_is-opened");
});

profileAddCloseButton.addEventListener("click", function () {
  profileAddModal.classList.remove("modal_is-opened");
});

function fillInputFields() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileModal.classList.remove("modal_is-opened");
}

profileForm.addEventListener("submit", handleProfileEditSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  console.log(postImageLink.value);
  console.log(postCaption.value);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);
