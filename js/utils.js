'use strict';

window.utils = (function () {

  var ENTER_KEY_CODE = 13;
  var SPACE_CHAR_CODE = 32;

  return {
    isActivateEvent: function (event) {
      var enter = event.keyCode === ENTER_KEY_CODE;
      var space = event.charCode === SPACE_CHAR_CODE;
      return (event.type === 'click') || (event.keyCode || event.charCode) && (enter || space);
    },
    toggleAttribute: function (attribute, element) {
      var newValue = !(element.getAttribute(attribute) === 'true');
      element.setAttribute(attribute, newValue);
    },
    generateEvent: function (type, element) {
      var newEvent = document.createEvent('Event');
      newEvent.initEvent(type, true, true);
      element.dispatchEvent(newEvent);
    }
  };

})();
