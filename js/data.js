'use strict';

(function() {
  window.MOCK = {
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
})();
