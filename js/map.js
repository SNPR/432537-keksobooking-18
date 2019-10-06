'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsConatiner = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var MAP_PIN_HEIGHT = 80;
  var MAP_PIN_WIDTH = 40;
  var MAP_WIDTH = 1200;
  var MIN_PIN_Y_POSITION = 130;
  var MAX_PIN_Y_POSITION = 630;

  var addressInput = document.querySelector('#address');

  function setAddress(x, y) {
    addressInput.value = x + MAP_PIN_WIDTH / 2 + ', ' + (y + MAP_PIN_HEIGHT);
  }

  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    var target = evt.currentTarget;
    activatePage();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
      mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
      if (parseInt(target.style.left, 10) < 0) {
        target.style.left = '0px';
      } else if (parseInt(target.style.left, 10) > MAP_WIDTH - MAP_PIN_WIDTH - MAP_PIN_WIDTH / 2) {
        target.style.left = MAP_WIDTH - MAP_PIN_WIDTH - MAP_PIN_WIDTH / 2 + 'px';
      }

      if (parseInt(target.style.top, 10) < MIN_PIN_Y_POSITION) {
        target.style.top = MIN_PIN_Y_POSITION + 'px';
      } else if (parseInt(target.style.top, 10) > MAX_PIN_Y_POSITION - MAP_PIN_HEIGHT) {
        target.style.top = MAX_PIN_Y_POSITION - MAP_PIN_HEIGHT + 'px';
      }

      setAddress(parseInt(target.style.left, 10), parseInt(target.style.top, 10));
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KeyCodes.enter) {
      activatePage();
    }
  });

  function toggleFieldSets(fieldsetsDisabled) {
    document.querySelectorAll('fieldset').forEach(function (fieldset) {
      fieldset.disabled = fieldsetsDisabled;
    });
  }

  toggleFieldSets(true);

  var fragment = document.createDocumentFragment();
  window.renderPins = function (advertisements) {
    for (var i = 0; i < advertisements.length; i++) {
      fragment.appendChild(window.renderPin(advertisements[i], i));
    }
  };

  function onEscPress() {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KeyCodes.escape && document.querySelector('.popup__close')) {
        map.removeChild(map.querySelector('.map__card'));
      }
    });
  }

  function activatePage() {
    toggleFieldSets(false);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    pinsConatiner.appendChild(fragment);
    setAddress(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10));
    onEscPress();
  }
})();
