'use strict';

window.initializeScale = (function () {

  var imagePreview = document.querySelector('.filter-image-preview');
  var controls = document.querySelector('.upload-resize-controls');
  var controlsValue = controls.querySelector('.upload-resize-controls-value');
  var controlsDec = controls.querySelector('.upload-resize-controls-button-dec');
  var controlsInc = controls.querySelector('.upload-resize-controls-button-inc');

  return function (scaleDefault, scaleStep, scaleMin, scaleMax) {

    scaleDefault = typeof scaleDefault !== 'undefined' ? scaleDefault : 1;
    scaleStep = typeof scaleStep !== 'undefined' ? scaleStep : 0.25;
    scaleMin = typeof scaleMin !== 'undefined' ? scaleMin : 0.25;
    scaleMax = typeof scaleMax !== 'undefined' ? scaleMax : 1;

    var scaleCurrent = scaleDefault;

    var resizeImage = function () {
      controlsValue.value = +(scaleCurrent * 100).toFixed(5) + '%';
      imagePreview.style.transform = 'scale(' + scaleCurrent + ')';
    };

    var decreaseImage = function () {
      var dec = +(scaleCurrent - scaleStep).toFixed(3);
      if (scaleCurrent > scaleMin) {
        scaleCurrent = (dec > scaleMin) ? dec : scaleMin;
        resizeImage();
      }
    };

    var increaseImage = function () {
      var inc = +(scaleCurrent + scaleStep).toFixed(3);
      if (scaleCurrent < scaleMax) {
        scaleCurrent = (inc < scaleMax) ? inc : scaleMax;
        resizeImage();
      }
    };

    controlsDec.addEventListener('click', decreaseImage);
    controlsInc.addEventListener('click', increaseImage);
    resizeImage();
  };

})();
