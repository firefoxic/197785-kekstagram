'use strict';

window.initializeFilters = (function () {

  var generateChange = function (event) {
    if (window.utils.isActivateEvent(event)) {
      event.preventDefault();
      event.target.control.checked = true;
      window.utils.generateEvent('change', event.target.control);
    }
  };

  return function (controls, callback, initial) {

    var currentFilter = initial;
    var currentFilterButton = controls.querySelector('[value="' + currentFilter + '"]');
    var currentFilterLabel = currentFilterButton.nextElementSibling;

    var replaceFilter = function (event) {
      var chosenFilter = event.target.value;
      var chosenFilterLabel = event.target.nextElementSibling;
      window.utils.toggleAttribute('aria-checked', currentFilterLabel);
      window.utils.toggleAttribute('aria-checked', chosenFilterLabel);
      callback(chosenFilter, currentFilter);
      currentFilter = chosenFilter;
      currentFilterLabel = chosenFilterLabel;
    };

    currentFilterButton.checked = true;
    controls.addEventListener('keypress', generateChange);
    controls.addEventListener('change', replaceFilter);

  };

})();
