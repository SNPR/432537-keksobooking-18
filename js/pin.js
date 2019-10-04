'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');

  var onSuccess = function (advertisements) {
    window.advertisements = advertisements;
    window.renderPin = function (advertisement, index) {
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
    };
    window.renderPins();
  };

  window.getData('https://js.dump.academy/keksobooking/data', onSuccess);
})();
