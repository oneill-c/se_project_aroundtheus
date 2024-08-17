import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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
    name: "Lago",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Modals
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profileNameInput = document.querySelector("#profile-name-input");
const imageUrlInput = document.querySelector("#image-url-input");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#profile-modal-form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#image-url-input");
// const previewImageModal = document.querySelector("#preview-image-modal");
const modalDivs = document.querySelectorAll(".modal");

// Buttons

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-edit-close-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardCloseButton = addCardModal.querySelector("#add-card-close-button");
const previewImageCloseButton = document.querySelector(
  "#preview-image-close-button"
);

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    profileName.textContent = formData["profile-name-input"];
    profileTitle.textContent = formData["profile-title-input"];
    profileEditPopup.close();
  },
});

// const profileEditPopup = new PopupWithForm({
//   popupSelector: "#profile-edit-modal",
//   handleFormSubmit: (formData) => {
//     userInfo.setUserInfo({
//       name: formData["name"],
//       job: formData["title"],
//     });
//   },
// });

addNewCardButton.addEventListener("click", () => newCardPopup.open());
document.querySelector("#profile-edit-button").addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileTitleInput.value = profileTitle.textContent;
  profileEditPopup.open();
});

const validationSettings = {
  // formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  profileEditForm,
  validationSettings
);
const addFormValidator = new FormValidator(addCardForm, validationSettings);
// addCardModal.addEventListener("submit", handleAddCardFormSubmit);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

const handleFormSubmit = (formData) => {
  const { "card-title-input": name, "image-url-input": link } = formData;
  const cardElement = new Card(
    { name, link },
    "#card-template",
    handleImageClick
  );
  cardListEl.prepend(cardElement.getView());
};

const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit,
});
newCardPopup.setEventListeners();

profileEditPopup.setEventListeners();
newCardPopup.setEventListeners();

// Set up buttons to open popups
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileTitleInput.value = profileTitle.textContent;
  profileEditPopup.open();
});

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscClose);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscClose);
// }

// function handleEscClose(evt) {
//   if (evt.key === "Escape") {
//     const openModals = document.querySelectorAll(".modal_opened");
//     openModals.forEach((modal) => closeModal(modal));
//   }
// }

modalDivs.forEach((modalDiv) => {
  modalDiv.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modalDiv);
    }
  });
});

modalDivs.forEach((modalDiv) => {
  modalDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal__close-button")) {
      const modal = event.target.closest(".modal");
      if (modal) {
        closeModal(modal);
      }
    }
  });
});

const previewImageModal = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
previewImageModal.setEventListeners();

function handleImageClick(name, link) {
  previewImageModal.open({ name, link });
}

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  jobElementSelector: ".profile__title",
});

// function handleImageClick(name, link) {
//   const modalImage = previewImageModal.querySelector("#modal-image");
//   const modalTitle = previewImageModal.querySelector(
//     "#modal-preview-image-title"
//   );
//   modalImage.src = link;
//   modalImage.alt = name;
//   modalTitle.textContent = name;
//   openModal(previewImageModal);
// }

// addNewCardButton.addEventListener("click", () => openModal(addCardModal));
// addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
// addNewCardButton.addEventListener("click", () => newCardPopup.open());

function renderCard(cardData, cardListEl) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  // new stuff
  return cardElement.getView();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileTitle.textContent = profileTitleInput.value;
  closeModal(profileEditModal);
}

// function handleAddCardFormSubmit(evt) {
//   evt.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   renderCard({ name, link }, cardListEl);
// closeModal(addCardModal);
// cardTitleInput.value = "";
// cardUrlInput.value = "";
// }

// function getCardElement(cardData) {
//   // clone the template element with all its content and store it in a cardElement variable
//   const cardElement = cardTemplate.cloneNode(true);
//   // access the card title and image and store them in variables
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   //set the like button
//   const likeButton = cardElement.querySelector(".card__like-button");
//   // find delete button
//   const deleteButton = cardElement.querySelector(".card__delete-button");

//   // add click listener to the cardImageEl element
//   // once clicked, use openModal with previewImageModal (search for it around line 43...type code in to search, dont literally search)

//   cardImageEl.addEventListener("click", () => {
//   const modalImage = previewImageModal.querySelector("#modal-image");
//   const modalTitle = previewImageModal.querySelector(
//     "#modal-preview-image-title"
//   );
//   modalImage.src = cardData.link;
//   modalImage.alt = cardData.name;
//   modalTitle.textContent = cardData.name;
//   openModal(previewImageModal);
// });

//   // previewImageCloseButton.addEventListener("click", () =>
//   //   closeModal(previewImageModal)
//   // );

//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   deleteButton.addEventListener("click", () => {
//     cardElement.remove("card__delete-button_active");
//   });

//   // set the path to the image to the link field of the object
//   cardImageEl.src = cardData.link;
//   // set the image alt text to the name field of the object
//   cardImageEl.alt = cardData.name;
//   // set the card title to the name field of the object, too
//   cardTitleEl.textContent = cardData.name;
//   // return the ready HTML element with the filled-in data
//   return cardElement;
// }

// profileEditCloseButton.addEventListener("click", () =>
//   closeModal(profileEditModal)
// );

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
// addCardModal.addEventListener("submit", handleAddCardFormSubmit);

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

initialCards.forEach((cardData) => {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  cardListEl.prepend(cardElement.getView());
});
