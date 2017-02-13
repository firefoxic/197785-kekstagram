'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadCansel = uploadOverlay.querySelector('#upload-cancel');
var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFile = uploadSelectImage.querySelector('#upload-file');
// var uploadFilterControls = document.querySelector('.upload-filter-controls');
var filterImagePreview = document.querySelector('.filter-image-preview');
var resizeControls = uploadOverlay.querySelector('.upload-resize-controls');
var resizeControlsValue = resizeControls.querySelector('.upload-resize-controls-value');
var resizeControlsDec = resizeControls.querySelector('.upload-resize-controls-button-dec');
var resizeControlsInc = resizeControls.querySelector('.upload-resize-controls-button-inc');
var scaleMin = 0.25;
var scaleMax = 1;
var scaleStep = 0.25;
var scaleDefault = 1;
var scaleCurrent = scaleDefault;

var ENTER_KEY_CODE = 13;
var SPACE_CHAR_CODE = 32;
var ESCAPE_KEY_CODE = 27;

var isActivateEvent = function (event) {
  var enter = event.keyCode === ENTER_KEY_CODE;
  var space = event.charCode === SPACE_CHAR_CODE;
  return (event.keyCode || event.charCode) && (enter || space);
};

var toggleAttribute = function (attribute, element) {
  var newValue = !(element.getAttribute(attribute) === 'true');
  element.setAttribute(attribute, newValue);
};

var toggleForms = function () {
  uploadOverlay.classList.toggle('invisible');
  uploadSelectImage.classList.toggle('invisible');
  toggleAttribute('aria-hidden', uploadOverlay);
  toggleAttribute('aria-hidden', uploadSelectImage);
};

var uploadFormDescription = document.querySelector('.upload-form-description');
var setEscapeHandler = function (event) {
  if ((event.target !== uploadFormDescription) && (event.keyCode === ESCAPE_KEY_CODE)) {
    event.preventDefault();
    toggleForms();
  }
};

var resizeImage = function () {
  resizeControlsValue.value = +(scaleCurrent * 100).toFixed(5) + '%';
  filterImagePreview.style.transform = 'scale(' + scaleCurrent + ')';
};

// var removeFilterFromPreview = function () {
//   filterImagePreview.className = filterImagePreview.classList[0];
// };

window.generateEvent = function (type, element) {
  var newEvent = document.createEvent('Event');
  newEvent.initEvent(type, true, true);
  element.dispatchEvent(newEvent);
};

uploadFile.addEventListener('change', function () {
  filterImagePreview.className = filterImagePreview.classList[0];
  // removeFilterFromPreview();
  resizeImage();
  toggleForms();
  document.addEventListener('keypress', setEscapeHandler);
});

uploadCansel.addEventListener('click', function () {
  toggleForms();
  document.removeEventListener('keypress', setEscapeHandler);
});

uploadCansel.addEventListener('keypress', function (event) {
  if (isActivateEvent(event)) {
    event.preventDefault();
    document.removeEventListener('keypress', setEscapeHandler);
    toggleForms();
  }
});

// uploadFilterControls.addEventListener('keypress', function (event) {
//   if (isActivateEvent(event)) {
//     event.preventDefault();
//     var filterId = event.target.getAttribute('for');
//     var filterSelectedButton = uploadFilterControls.querySelector('#' + filterId);
//     filterSelectedButton.checked = true;
//     generateEvent('change', filterSelectedButton);
//   }
// });

// uploadFilterControls.addEventListener('change', function (event) {
//   var filterName = event.target.value;
//   var filter = 'filter-' + filterName;
//   var filterId = event.target.getAttribute('id');
//   var filterLabel = document.querySelector('[for="' + filterId + '"]');
//   var filterLabels = event.target.parentNode.querySelectorAll('label');
//   filterLabel.setAttribute('aria-checked', true);
//   filterLabels.forEach(function (item) {
//     if (item !== filterLabel) {
//       item.setAttribute('aria-checked', false);
//     }
//   });
//   removeFilterFromPreview();
//   filterImagePreview.classList.add(filter);
// });

resizeControlsDec.addEventListener('click', function () {
  var dec = +(scaleCurrent - scaleStep).toFixed(3);
  if (scaleCurrent > scaleMin) {
    scaleCurrent = (dec > scaleMin) ? dec : scaleMin;
    resizeImage();
  }
});

resizeControlsInc.addEventListener('click', function () {
  var inc = +(scaleCurrent + scaleStep).toFixed(3);
  if (scaleCurrent < scaleMax) {
    scaleCurrent = (inc < scaleMax) ? inc : scaleMax;
    resizeImage();
  }
});
