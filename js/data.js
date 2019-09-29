'use strict';

(function() {
  var MOCK = {
    avatars: [
      'img/avatars/user01.png',
      'img/avatars/user02.png',
      'img/avatars/user03.png',
      'img/avatars/user04.png',
      'img/avatars/user05.png',
      'img/avatars/user06.png',
      'img/avatars/user07.png',
      'img/avatars/user08.png'
    ],
    photos: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    times: ['12:00', '13:00', '14:00'],
    rooms: {
      min: 1,
      max: 5,
      types: ['palace', 'flat', 'house', 'bungalo'],
      priceMin: 100,
      priceMax: 5000
    },
    guests: {
      min: 1,
      max: 10
    }
  };

  window.generateAdvertisement = function(amount) {
    var advertisements = [];

    for (var i = 0; i < amount; i++) {
      advertisements.push({
        author: {
          avatar: MOCK.avatars[window.util.generateRandomNumber(0, MOCK.avatars.length - 1)]
        },
        offer: {
          title: 'Супер крутое жильё',
          price: window.util.generateRandomNumber(MOCK.rooms.priceMin, MOCK.rooms.priceMax),
          type: MOCK.rooms.types[window.util.generateRandomNumber(0, MOCK.rooms.types.length - 1)],
          rooms: window.util.generateRandomNumber(MOCK.rooms.min, MOCK.rooms.max),
          guests: window.util.generateRandomNumber(MOCK.guests.min, MOCK.guests.max),
          checkin: MOCK.times[window.util.generateRandomNumber(0, MOCK.times.length - 1)],
          checkout: MOCK.times[window.util.generateRandomNumber(0, MOCK.times.length - 1)],
          features: window.util
            .shuffleArray(MOCK.features)
            .slice(0, window.util.generateRandomNumber(1, MOCK.features.length)),
          description: 'Самое популярное жильё в городе!',
          photos: window.util
            .shuffleArray(MOCK.photos)
            .slice(0, window.util.generateRandomNumber(1, MOCK.photos.length))
        },
        location: {
          x: window.util.generateRandomNumber(MIN_X_POSITION, MAX_X_POSITION),
          y: window.util.generateRandomNumber(MIN_Y_POSITION, MAX_Y_POSITION)
        }
      });
    }

    return advertisements;
  };
})();
