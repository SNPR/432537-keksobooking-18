'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var map = document.querySelector('.map');

  function filterAdvertisementsByHousingType(filterOption) {
    if (document.querySelector('.popup__close')) {
      map.removeChild(map.querySelector('.map__card'));
    }
    if (filterOption === 'any') {
      return window.advertisements;
    }

    document.querySelector('.map__pins').textContent = '';

    return window.advertisements.filter(function (advertisement) {
      return advertisement['offer']['type'] === filterOption;
    });
  }

  filtersForm.addEventListener('change', function (evt) {
    switch (evt.target.name) {
      case 'housing-type':
        var filteredAdvertisements = filterAdvertisementsByHousingType(evt.target.value);
        window.pin.renderPins(filteredAdvertisements, filteredAdvertisements.length);
        break;
    }
  });
})();
