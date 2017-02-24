'use strict';

window.pictures = (function () {

  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var picturesContainer = document.querySelector('.pictures');

  return function () {

    var createPost = function (picture) {
      var templateElement = document.querySelector('#picture-template');
      var elementToClone = templateElement.content.querySelector('.picture');
      var newElement = elementToClone.cloneNode(true);

      newElement.querySelector('img').src = picture.url;
      newElement.querySelector('.picture-likes').textContent = picture.likes;
      newElement.querySelector('.picture-comments').textContent = picture.comments.length;
      picturesContainer.appendChild(newElement);
    };

    var onLoadData = function (data) {
      picturesContainer.innerHTML = '';
      var pictures = data.target.response;
      for (var i = 0; i < pictures.length; i++) {
        createPost(pictures[i]);
      }
    };

    window.load(DATA_URL, onLoadData);

  };

})();
