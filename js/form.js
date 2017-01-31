'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCansel = uploadOverlay.querySelector('.upload-form-cancel');
var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFile = uploadSelectImage.querySelector('#upload-file');
var uploadFilter = document.querySelectorAll('[name="upload-filter"]');
var filterImagePreview = document.querySelector('.filter-image-preview');
var controlsValue = document.querySelector('.upload-resize-controls-value');
var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
var buttonInc = document.querySelector('.upload-resize-controls-button-inc');
var scaleMin = 0.25;
var scaleMax = 1;
var scaleStep = 0.25;
var scaleDefault = 1;
var scaleCurrent = scaleDefault;

uploadFile.addEventListener('change', function () {
  removeFilter();
  resizeImage();
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
});

uploadFormCansel.addEventListener('click', function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
});

for (var i = 0; i < uploadFilter.length; i++) {
  uploadFilter[i].addEventListener('change', function (event) {
    removeFilter();
    var filterName = 'filter-' + event.currentTarget.value;
    filterImagePreview.classList.add(filterName);
  });
}

buttonDec.addEventListener('click', function () {
  var dec = +(scaleCurrent - scaleStep).toFixed(3);
  if (scaleCurrent > scaleMin) {
    scaleCurrent = (dec > scaleMin) ? dec : scaleMin;
    resizeImage();
  }
});

buttonInc.addEventListener('click', function () {
  var inc = +(scaleCurrent + scaleStep).toFixed(3);
  if (scaleCurrent < scaleMax) {
    scaleCurrent = (inc < scaleMax) ? inc : scaleMax;
    resizeImage();
  }
});

function removeFilter() {
  for (var j = 0; j < filterImagePreview.classList.length; j++) {
    if (filterImagePreview.classList[j] !== 'filter-image-preview' && filterImagePreview.classList[j].substring(0, 7) === 'filter-') {
      filterImagePreview.classList.remove(filterImagePreview.classList[j]);
    }
  }
}

function resizeImage() {
  controlsValue.value = +(scaleCurrent * 100).toFixed(5) + '%';
  filterImagePreview.style.transform = 'scale(' + scaleCurrent + ')';
}
