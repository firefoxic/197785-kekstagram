'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCansel = uploadOverlay.querySelector('.upload-form-cancel');
var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFile = uploadSelectImage.querySelector('#upload-file');
var uploadFilter = document.querySelectorAll('[name="upload-filter"]');
var filterImagePreview = document.querySelector('.filter-image-preview');

uploadFile.addEventListener('change', function () {
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

function removeFilter() {
  for (var j = 0; j < filterImagePreview.classList.length; j++) {
    if (filterImagePreview.classList[j] !== 'filter-image-preview' && filterImagePreview.classList[j].substring(0, 7) === 'filter-') {
      filterImagePreview.classList.remove(filterImagePreview.classList[j]);
    }
  }
}
