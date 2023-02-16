function addEventListeners() {
  textarea.oninput = handlInput;
  addText.onclick = handleAddText;
  nav.onclick = handlNav;
  window.onkeydown = handleKeydown;
  document.querySelector(".reset").onclick = handlReset;
  document.querySelector(".lang").onclick = changeLang;
  document.querySelector(".dropdown").onclick = handleDropdown;
  modal.firstElementChild.onclick = closeModal;
}
function init() {
  trainingText = document.querySelector(".text");
  exerciseText = trainingText.innerText = "Default text";
  totalCount = document.querySelector(".total-count").firstElementChild;
  totalCount.innerText = trainingText.innerText.length;
  initPrecisionData(trainingText.innerText);
  precisionContainer = document.querySelector(".precision").firstElementChild;
  errorCount = document.querySelector(".error-count").firstElementChild;
  concreteErrors = document.querySelector(".concrete-errors");
  textarea = document.querySelector(".text-one");
  addText = document.querySelector(".add-text");
  alpha = document.querySelectorAll(".alpha");
  document.querySelector(".repeat").onclick = handleRepeat; /*  ?????????  */
  nav = document.querySelector("nav");
  tabs = document.querySelectorAll(".tab");
  hands = {
    left: document.querySelector(".left-hand"),
    right: document.querySelector(".right-hand"),
  };
  modal = document.querySelector(".modal");

  addEventListeners();
  drawPictures(exerciseText[0]);
  currentLang = "EN";
  wordTypedUser = document.querySelector(".word-typed").firstElementChild;
}

let precisionData;
let precisionContainer;
let trainingText;
let totalCount;
let errorCount;
let concreteErrors;
const errors = {};
const greyKeys = [9, 20, 16, 17, 18, 91, 8, 13, 93, 27, 38, 37, 39, 40];
let exerciseText;
let textarea;
let addText;
let alpha;
let tabs;
let nav;
let hands;
let previousHand;
let currentLang;
let modal;
let wordTypedUser;

init();
