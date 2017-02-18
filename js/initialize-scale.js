'use strict';

window.initializeScale = (function () {

  var adjustScale = null;

  return function (cb, parent, decrease, increase, initial, step, min, max) {

    initial = typeof initial !== 'undefined' ? initial : 1;
    step = typeof step !== 'undefined' ? step : 0.1;
    min = typeof min !== 'undefined' ? min : 0;
    max = typeof max !== 'undefined' ? max : 2;
    var current = initial;

    adjustScale = cb;

    var decreaseValue = function () {
      var dec = +(current - step).toFixed(3);
      if (current > min) {
        current = (dec > min) ? dec : min;
        adjustScale(current);
      }
    };

    var increaseValue = function () {
      var inc = +(current + step).toFixed(3);
      if (current < max) {
        current = (inc < max) ? inc : max;
        adjustScale(current);
      }
    };

    var chooseControl = function (event) {
      if (event.target === decrease) {
        decreaseValue();
      }
      if (event.target === increase) {
        increaseValue();
      }
    };

    parent.addEventListener('click', chooseControl);
    adjustScale(current);
  };

})();
