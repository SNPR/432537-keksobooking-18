'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsConatiner = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var MAP_PIN_HEIGHT = 80;
  var MAP_PIN_WIDTH = 40;

  var addressInput = document.querySelector('#address');

  window.setAddress = function (x, y) {
    addressInput.value = x + MAP_PIN_WIDTH + ', ' + (y + MAP_PIN_HEIGHT);
  };

  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    var target = evt.currentTarget;

    activatePage();
    window.setAddress(parseInt(target.style.left, 10), parseInt(target.style.top, 10));
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
  for (var i = 0; i < window.advertisements.length; i++) {
    fragment.appendChild(window.renderPin(window.advertisements[i], i));
  }

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
    onEscPress();
  }
})();
