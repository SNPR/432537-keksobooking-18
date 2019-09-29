'use strict';

(function() {
  var map = document.querySelector('.map');
  var pinsConatiner = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var advertisements = window.generateAdvertisement(8);
  var MAP_PIN_HEIGHT = 80;
  var MAP_PIN_WIDTH = 40;

  var addressInput = document.querySelector('#address');

  function setAddress(x, y) {
    addressInput.value = x + MAP_PIN_WIDTH + ', ' + (y + MAP_PIN_HEIGHT);
  }

  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function(evt) {
    var target = evt.currentTarget;

    activatePage();
    setAddress(parseInt(target.style.left, 10), parseInt(target.style.top, 10));
  });

  mainPin.addEventListener('keydown', function(evt) {
    if (evt.keyCode === window.util.KeyCodes.enter) {
      activatePage();
    }
  });

  function toggleFieldSets(fieldsetsDisabled) {
    document.querySelectorAll('fieldset').forEach(function(fieldset) {
      fieldset.disabled = fieldsetsDisabled;
    });
  }

  toggleFieldSets(true);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(window.renderPin(advertisements[i]));
  }

  function closeAdvertisementOnCloseClick() {
    var adCloseButton = document.querySelector('.popup__close');

    adCloseButton.addEventListener('click', function() {
      map.removeChild(map.querySelector('.map__card'));
    });
  }

  function onEscPress() {
    document.addEventListener('keydown', function(evt) {
      if (evt.keyCode === window.util.KeyCodes.escape && document.querySelector('.popup__close')) {
        map.removeChild(map.querySelector('.map__card'));
      }
    });
  }

  function renderAdvertisementOnPinClick() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function(pin, index) {
      pin.addEventListener('click', function(evt) {
        var advertisementCard = map.querySelector('.map__card');

        if (advertisementCard) {
          map.removeChild(advertisementCard);
        }
        map.appendChild(window.renderAdvertisementCard(advertisements[index]));
        closeAdvertisementOnCloseClick();
        setAddress(parseInt(evt.currentTarget.style.left, 10), parseInt(evt.currentTarget.style.top, 10));
      });
    });
  }

  function activatePage() {
    toggleFieldSets(false);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    pinsConatiner.appendChild(fragment);
    map.appendChild(window.renderAdvertisementCard(advertisements[0]));
    renderAdvertisementOnPinClick();
    closeAdvertisementOnCloseClick();
    onEscPress();
  }
})();
