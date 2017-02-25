'use strict';

window.showGallery = (function () {

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  var handleEscapeEvent = function (event) {
    if (window.utils.isEscapeKeypress(event)) {
      window.utils.toggleVisibility(galleryOverlay);
    }
  };

  var hideGalleryOverlay = function (event) {
    if (window.utils.isActivateEvent(event)) {
      window.utils.toggleVisibility(galleryOverlay);
      window.utils.toggleAttribute('aria-pressed', galleryOverlayClose);
      document.removeEventListener('keypress', handleEscapeEvent);
    }
  };

  return function (picture) {

    galleryOverlay.classList.remove('invisible');
    document.addEventListener('keypress', handleEscapeEvent);
    window.utils.toggleAttribute('aria-pressed', galleryOverlayClose);
    galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', picture.url);
    galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
    galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;

    galleryOverlayClose.addEventListener('click', hideGalleryOverlay);
    galleryOverlayClose.addEventListener('keypress', hideGalleryOverlay);

  };

})();
