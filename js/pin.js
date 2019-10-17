'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsConatiner = document.querySelector('.map__pins');
  var map = document.querySelector('.map');

  function render(advertisement) {
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
      map.appendChild(window.card.renderAdvertisementCard(advertisement));
    });

    return pin;
  }

  function renderMany(advertisements) {
    advertisements.forEach(function (advertisement) {
      pinsConatiner.appendChild(render(advertisement));
    });
  }

  window.pin = {render: render, renderMany: renderMany};
})();
