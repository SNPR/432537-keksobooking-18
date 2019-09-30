'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');

  window.renderPin = function (advertisement, index) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.style = 'left: ' + advertisement.location.x + 'px; top: ' + advertisement.location.y + 'px';
    pinImage.src = advertisement.author.avatar;
    pinImage.alt = advertisement.offer.title;

    pin.addEventListener('click', function (evt) {
      var advertisementCard = map.querySelector('.map__card');

      if (advertisementCard) {
        map.removeChild(advertisementCard);
      }
      map.appendChild(window.renderAdvertisementCard(window.advertisements[index]));
      var adCloseButton = document.querySelector('.popup__close');

      adCloseButton.addEventListener('click', function () {
        map.removeChild(map.querySelector('.map__card'));
      });
      window.setAddress(
          parseInt(evt.currentTarget.style.left, 10),
          parseInt(evt.currentTarget.style.top, 10)
      );
    });

    return pin;
  };
})();
