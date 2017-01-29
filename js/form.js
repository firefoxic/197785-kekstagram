'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFile = uploadSelectImage.querySelector('#upload-file');

uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
});
