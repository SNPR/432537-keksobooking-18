'use strict';

(function () {
  var MAX_ADVERTISEMENTS_AMOUNT = 5;
  var filtersForm = document.querySelector('.map__filters');
  var map = document.querySelector('.map');
  var housingType = filtersForm.querySelector('#housing-type');

  function removeCard() {
    if (document.querySelector('.popup__close')) {
      map.removeChild(map.querySelector('.map__card'));
    }
  }

  function removePins() {
    var mainPin = document.querySelector('.map__pin--main');
    var pins = document.querySelector('.map__pins');
    pins.textContent = '';
    pins.appendChild(mainPin);
  }

  function getHousingType(element) {
    return housingType.value === 'any' ? true : element.offer.type === housingType.value;
  }

  function filterAll(data) {
    return data
      .filter(function (element) {
        return getHousingType(element);
      })
      .slice(0, MAX_ADVERTISEMENTS_AMOUNT);
  }

  filtersForm.addEventListener('change', function () {
    removeCard();
    removePins();
    window.pin.renderPins(window.filters.filterAll(window.advertisements));
  });

  window.filters = {
    filterAll: filterAll
  };
})();
