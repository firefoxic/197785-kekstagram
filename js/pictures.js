'use strict';

window.pictures = (function () {

  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');

  var addElement = function (result, element) {
    result.append(element);
    return result;
  };

  var returnTrue = function () {
    return true;
  };

  return function () {

    var createPost = function (picture) {

      var templateElement = document.querySelector('#picture-template');
      var elementToClone = templateElement.content.querySelector('.picture');
      var newElement = elementToClone.cloneNode(true);

      var handleActivatePicture = function (event) {
        if (window.utils.isActivateEvent(event)) {
          event.preventDefault();
          window.showGallery(picture);
        }
      };

      newElement.tabIndex = '0';
      newElement.querySelector('img').src = picture.url;
      newElement.querySelector('.picture-likes').textContent = picture.likes;
      newElement.querySelector('.picture-comments').textContent = picture.comments.length;

      newElement.addEventListener('click', handleActivatePicture);
      newElement.addEventListener('keypress', handleActivatePicture);

      picturesContainer.appendChild(newElement);

      return newElement;

    };

    var onLoadData = function (data) {

      var pictures = data.target.response;

      var handleChooseFilter = function (newFilter) {

        picturesContainer.innerHTML = '';

        switch (newFilter) {
          case 'popular':
            picturesContainer.append(pictures.filter(returnTrue).map(createPost).reduce(addElement, document.createDocumentFragment()));
            break;
          case 'new':
            picturesContainer.append(pictures.filter(returnTrue).sort(function () {
              return Math.random() - 0.5;
            }).slice(0, 10).map(createPost).reduce(addElement, document.createDocumentFragment()));
            break;
          case 'discussed':
            picturesContainer.append(pictures.filter(returnTrue).sort(function (a, b) {
              return b.comments.length - a.comments.length;
            }).map(createPost).reduce(addElement, document.createDocumentFragment()));
            break;
        }

      };

      for (var i = 0; i < pictures.length; i++) {
        createPost(pictures[i]);
      }

      filters.classList.remove('hidden');
      window.initializeFilters(filters, handleChooseFilter, 'popular');

    };

    window.load(DATA_URL, onLoadData);

  };

})();
