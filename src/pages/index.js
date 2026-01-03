//Imports
import "./index.css";
import { setButtonText } from "../utils/helpers.js";
import {
  settings,
  enableValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

// Api Setup
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "20002996-d71b-48ab-bf29-c716b3c9630f",
    "Content-Type": "application/json",
  },
});

// Profile Elements
const profileName = document.querySelector(".profile__name");
const profileAvatar = document.querySelector(".profile__avatar");
const profileDescription = document.querySelector(".profile__description");

//Edit Profile Modal
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector("#edit-profile-modal");
const profileCloseButton = profileModal.querySelector(".modal__close-button");
const profileForm = profileModal.querySelector(".modal__form");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Add Card Modal
const profileAddButton = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#new-post-modal");
const profileAddCloseButton = profileAddModal.querySelector(
  ".modal__close-button"
);
const newPostForm = profileAddModal.querySelector(".modal__form");
const postImageLink = document.querySelector("#card-image-input");
const postCaption = document.querySelector("#card-caption-input");
const cardSubmitButton = profileAddModal.querySelector(".modal__submit-button");

// Delete Confirmation Modal
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form_type_delete");
const deleteCloseButton = deleteModal.querySelector(
  ".modal_close-button_type_cancel"
);

let selectedCard;
let selectedCardId;

// Edit Avatar Modal
const editAvatarButton = document.querySelector(".profile__avatar-button");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarCloseButton = editAvatarModal.querySelector(
  ".modal__close-button"
);
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const editAvatarInput = document.querySelector("#edit-avatar-input");

// Cards and Preview
const cardList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const previewModal = document.querySelector("#preview-modal");
const previewCloseButton = previewModal.querySelector(".modal__close-button");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

// Modal Helpers
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_is-opened")) {
      closeModal(evt.target);
    }
  });
});

// Utility
function fillProfileInputs() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-button_active");

  api
    .changeLikeStatus(id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-button_active");
    })
    .catch((err) => {
      console.error(err);
    });
}

// Card Creation
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-modal-button");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  if (data.isLiked) {
    likeButton.classList.add("card__like-button_active");
  }

  likeButton.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  deleteButton.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data);
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Delete Handlers
function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const cardSubmitButton = evt.submitter;
  setButtonText(cardSubmitButton, true, "Delete", "Deleting");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      selectedCard = null;
      selectedCardId = null;
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(cardSubmitButton, false, "Delete", "Deleting...");
    });
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

// Form Handlers
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const cardSubmitButton = evt.submitter;
  setButtonText(cardSubmitButton, true);

  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(cardSubmitButton, false);
    });
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const cardSubmitButton = evt.submitter;
  cardSubmitButton.textContent = "Saving...";

  api
    .addNewCard({
      name: postCaption.value,
      link: postImageLink.value,
    })
    .then((data) => {
      cardList.prepend(getCardElement(data));
      evt.target.reset();
      disableButton(cardSubmitButton, settings);
      closeModal(profileAddModal);
    })
    .catch(console.error)
    .finally(() => {
      cardSubmitButton.textContent = "Save";
    });
}

editAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  //Change text content to "Saving..."

  api
    .editUserAvatar({ avatar: editAvatarInput.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      evt.target.reset();
      closeModal(editAvatarModal);
    })
    .catch(console.error);
});

// Event Listeners
profileForm.addEventListener("submit", (evt) => {
  handleEditProfileSubmit(evt);
});

newPostForm.addEventListener("submit", (evt) => {
  handleCardSubmit(evt);
});

profileEditButton.addEventListener("click", () => {
  fillProfileInputs();
  openModal(profileModal);
});

profileCloseButton.addEventListener("click", () => closeModal(profileModal));

profileAddButton.addEventListener("click", () => openModal(profileAddModal));

profileAddCloseButton.addEventListener("click", () =>
  closeModal(profileAddModal)
);

editAvatarButton.addEventListener("click", () => {
  editAvatarForm.reset();
  openModal(editAvatarModal);
});

editAvatarCloseButton.addEventListener("click", () =>
  closeModal(editAvatarModal)
);

previewCloseButton.addEventListener("click", () => closeModal(previewModal));

deleteCloseButton.addEventListener("click", () => closeModal(deleteModal));

// Initial Load
api
  .getAppInfo()
  .then(([cards, profile]) => {
    cards.forEach((card) => {
      cardList.prepend(getCardElement(card));
    });

    profileAvatar.src = profile.avatar;
    profileName.textContent = profile.name;
    profileDescription.textContent = profile.about;
  })
  .catch(console.error);

enableValidation(settings);
