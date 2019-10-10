'use strict';

(function () {
  var MAX_ADVERTISEMENTS_AMOUNT = 5;
  var filtersForm = document.querySelector('.map__filters');
  var map = document.querySelector('.map');
  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');

  var Price = {
    Type: {
      LOW: 'low',
      MIDDLE: 'middle',
      HIGH: 'high'
    },
    Value: {
      MIN: 10000,
      MAX: 50000
    }
  };

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

  function getHousingPrice(element) {
    switch (housingPrice.value) {
      case Price.Type.LOW:
        return element.offer.price < Price.Value.MIN;
      case Price.Type.MIDDLE:
        return element.offer.price >= Price.Value.MIN && element.offer.price <= Price.Value.MAX;
      case Price.Type.HIGH:
        return element.offer.price >= Price.Value.MAX;
      default:
        return true;
    }
  }

  function getHousingRooms(element) {
    return housingRooms.value === 'any' ? true : element.offer.rooms === Number(housingRooms.value);
  }

  function filterAll(data) {
    return data
      .filter(function (element) {
        return getHousingType(element) && getHousingPrice(element) && getHousingRooms(element);
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
