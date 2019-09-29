'use strict';

(function() {
  var MAP_PIN_HEIGHT = 80;
  var MAP_PIN_WIDTH = 40;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsConatiner = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var advertisements = window.generateAdvertisement(8);

  function toggleFieldSets(fieldsetsDisabled) {
    document.querySelectorAll('fieldset').forEach(function(fieldset) {
      fieldset.disabled = fieldsetsDisabled;
    });
  }

  toggleFieldSets(true);

  function renderAdvertisement(advertisement) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.style = 'left: ' + advertisement.location.x + 'px; top: ' + advertisement.location.y + 'px';
    pinImage.src = advertisement.author.avatar;
    pinImage.alt = advertisement.offer.title;

    return pin;
  }

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(renderAdvertisement(advertisements[i]));
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

  var addressInput = document.querySelector('#address');

  function setAddress(x, y) {
    addressInput.value = x + MAP_PIN_WIDTH + ', ' + (y + MAP_PIN_HEIGHT);
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
})();
