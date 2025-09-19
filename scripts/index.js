const profileEditButton = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector("#edit-profile-modal");
const profileCloseButton = profileModal.querySelector(".modal__close-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#new-post-modal");
const profileAddCloseButton = profileAddModal.querySelector(
  ".modal__close-button"
);

profileEditButton.addEventListener("click", function () {
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
