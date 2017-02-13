'use strict';
var initializeFilters = function () {
  var uploadFilterControls = document.querySelector('.upload-filter-controls');

  var generateChange = function (event) {
    if (window.isActivateEvent(event)) {
      event.preventDefault();
      var filterId = event.target.getAttribute('for');
      var filterSelectedButton = uploadFilterControls.querySelector('#' + filterId);
      filterSelectedButton.checked = true;
      window.generateEvent('change', filterSelectedButton);
    }
  };

  var changeFilter = function (event) {
    var filterName = event.target.value;
    var filter = 'filter-' + filterName;
    var filterId = event.target.getAttribute('id');
    var filterLabel = uploadFilterControls.querySelector('[for="' + filterId + '"]');
    var filterLabels = event.target.parentNode.querySelectorAll('label');
    filterLabel.setAttribute('aria-checked', true);
    filterLabels.forEach(function (item) {
      if (item !== filterLabel) {
        item.setAttribute('aria-checked', false);
      }
    });
    window.filterImagePreview.className = window.filterImagePreview.classList[0];
    window.filterImagePreview.classList.add(filter);
  };

  uploadFilterControls.addEventListener('keypress', generateChange);
  uploadFilterControls.addEventListener('change', changeFilter);
};

initializeFilters();
