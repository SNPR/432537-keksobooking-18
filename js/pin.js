'use strict';

(function() {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.renderPin = function(advertisement) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.style = 'left: ' + advertisement.location.x + 'px; top: ' + advertisement.location.y + 'px';
    pinImage.src = advertisement.author.avatar;
    pinImage.alt = advertisement.offer.title;

    return pin;
  };
})();
