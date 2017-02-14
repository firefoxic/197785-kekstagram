'use strict';

window.initializeFilters = function () {

  var filterControls = document.querySelector('.upload-filter-controls');
  var imagePreview = document.querySelector('.filter-image-preview');

  var removeFilters = function () {
    imagePreview.className = imagePreview.classList[0];
  };

  var generateChange = function (event) {
    if (window.utils.isActivateEvent(event)) {
      event.preventDefault();
      var filterId = event.target.getAttribute('for');
      var filterSelectedButton = filterControls.querySelector('#' + filterId);
      filterSelectedButton.checked = true;
      window.utils.generateEvent('change', filterSelectedButton);
    }
  };

  var changeFilter = function (event) {
    var filterName = event.target.value;
    var filter = 'filter-' + filterName;
    var filterId = event.target.getAttribute('id');
    var filterLabel = filterControls.querySelector('[for="' + filterId + '"]');
    var filterLabels = event.target.parentNode.querySelectorAll('label');
    filterLabel.setAttribute('aria-checked', true);
    filterLabels.forEach(function (item) {
      if (item !== filterLabel) {
        item.setAttribute('aria-checked', false);
      }
    });
    removeFilters();
    imagePreview.classList.add(filter);
  };

  removeFilters();
  filterControls.addEventListener('keypress', generateChange);
  filterControls.addEventListener('change', changeFilter);

};
