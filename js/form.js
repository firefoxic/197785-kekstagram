'use strict';

(function () {

  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadCansel = uploadOverlay.querySelector('#upload-cancel');
  var uploadFile = uploadSelectImage.querySelector('#upload-file');
  var uploadFormDescription = uploadOverlay.querySelector('.upload-form-description');
  var controls = uploadOverlay.querySelector('.upload-resize-controls');
  var controlsDec = controls.querySelector('.upload-resize-controls-button-dec');
  var controlsInc = controls.querySelector('.upload-resize-controls-button-inc');
  var controlsField = controls.querySelector('.upload-resize-controls-value');
  var imagePreview = document.querySelector('.filter-image-preview');
  var filterControls = document.querySelector('.upload-filter-controls');

  var resizeImage = function (scale) {
    controlsField.value = +(scale * 100).toFixed(5) + '%';
    imagePreview.style.transform = 'scale(' + scale + ')';
  };

  var toggleForms = function () {
    window.utils.toggleVisibility(uploadOverlay);
    window.utils.toggleVisibility(uploadSelectImage);
  };

  var setEscapeHandler = function (event) {
    if ((event.target !== uploadFormDescription) && window.utils.isEscapeKeypress(event)) {
      event.preventDefault();
      toggleForms();
      document.removeEventListener('keypress', setEscapeHandler);
    }
  };

  var openForm = function () {
    toggleForms();
    document.addEventListener('keypress', setEscapeHandler);
  };

  var closeForm = function (event) {
    if (window.utils.isActivateEvent(event)) {
      event.preventDefault();
      toggleForms();
      document.removeEventListener('keypress', setEscapeHandler);
    }
  };

  var changeFilter = function (oldFilter, newFilter) {
    imagePreview.classList.remove('filter-' + oldFilter);
    imagePreview.classList.add('filter-' + newFilter);
  };

  window.pictures();

  uploadFile.addEventListener('change', openForm);
  uploadCansel.addEventListener('click', closeForm);
  uploadCansel.addEventListener('keypress', closeForm);

  window.initializeScale(resizeImage, controls, controlsDec, controlsInc, 1, 0.25, 0.25, 1);
  window.initializeFilters(filterControls, changeFilter, 'none');

})();
