'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadCansel = uploadOverlay.querySelector('#upload-cancel');
var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFile = uploadSelectImage.querySelector('#upload-file');
var uploadFormDescription = document.querySelector('.upload-form-description');

var toggleForms = function () {
  uploadOverlay.classList.toggle('invisible');
  uploadSelectImage.classList.toggle('invisible');
  window.utils.toggleAttribute('aria-hidden', uploadOverlay);
  window.utils.toggleAttribute('aria-hidden', uploadSelectImage);
};

var setEscapeHandler = function (event) {
  var ESCAPE_KEY_CODE = 27;
  if ((event.target !== uploadFormDescription) && (event.keyCode === ESCAPE_KEY_CODE)) {
    event.preventDefault();
    toggleForms();
  }
};

var openForm = function () {
  window.initializeScale();
  window.initializeFilters();
  toggleForms();
  document.addEventListener('keypress', setEscapeHandler);
};

var closeForm = function (event) {
  if (window.utils.isActivateEvent(event)) {
    event.preventDefault();
    document.removeEventListener('keypress', setEscapeHandler);
    toggleForms();
  }
};

uploadFile.addEventListener('change', openForm);
uploadCansel.addEventListener('click', closeForm);
uploadCansel.addEventListener('keypress', closeForm);
