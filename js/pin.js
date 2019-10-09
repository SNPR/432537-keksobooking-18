'use strict';

(function () {
  var MAX_ADVERTISEMENTS_AMOUNT = 5;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsConatiner = document.querySelector('.map__pins');
  var map = document.querySelector('.map');

  function renderPin(advertisement, index) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.style = 'left: ' + advertisement.location.x + 'px; top: ' + advertisement.location.y + 'px';
    pinImage.src = advertisement.author.avatar;
    pinImage.alt = advertisement.offer.title;

    pin.addEventListener('click', function () {
      var advertisementCard = map.querySelector('.map__card');

      if (advertisementCard) {
        map.removeChild(advertisementCard);
      }
      map.appendChild(window.renderAdvertisementCard(window.advertisements[index]));
    });

    return pin;
  }

  function renderPins(advertisements) {
    for (var i = 0; i < MAX_ADVERTISEMENTS_AMOUNT; i++) {
      pinsConatiner.appendChild(renderPin(advertisements[i], i));
    }
  }

  window.pin = {renderPin: renderPin, renderPins: renderPins};
})();
