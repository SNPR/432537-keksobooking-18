'use strict';

var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var MIN_X_POSITION = 0;
var MAX_X_POSITION = 1200;
var MIN_Y_POSITION = 130;
var MAX_Y_POSITION = 630;

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

function shuffleArray(array) {
  var shuffledArray = array.slice(0);

  for (var i = shuffledArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  return shuffledArray;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function generateAdvertisement(amount) {
  var advertisements = [];

  for (var i = 0; i < amount; i++) {
    advertisements.push({
      author: {
        avatar: MOCK.avatars[generateRandomNumber(0, MOCK.avatars.length - 1)]
      },
      offer: {
        title: 'Супер крутое жильё',
        price: generateRandomNumber(MOCK.rooms.priceMin, MOCK.rooms.priceMax),
        type: MOCK.rooms.types[generateRandomNumber(0, MOCK.rooms.types.length - 1)],
        rooms: generateRandomNumber(MOCK.rooms.min, MOCK.rooms.max),
        guests: generateRandomNumber(MOCK.guests.min, MOCK.guests.max),
        checkin: MOCK.times[generateRandomNumber(0, MOCK.times.length - 1)],
        checkout: MOCK.times[generateRandomNumber(0, MOCK.times.length - 1)],
        features: shuffleArray(MOCK.features).slice(0, generateRandomNumber(1, MOCK.features.length)),
        description: 'Самое популярное жильё в городе!',
        photos: shuffleArray(MOCK.photos).slice(0, generateRandomNumber(1, MOCK.photos.length))
      },
      location: {
        x: generateRandomNumber(MIN_X_POSITION, MAX_X_POSITION),
        y: generateRandomNumber(MIN_Y_POSITION, MAX_Y_POSITION)
      }
    });
  }

  return advertisements;
}

var advertisements = generateAdvertisement(8);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

function renderAdvertisement(advertisement) {
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');

  pin.style =
    'left: ' +
    (advertisement.location.x - PIN_HEIGHT) +
    'px; top: ' +
    (advertisement.location.y - PIN_WIDTH) +
    'px';
  pinImage.src = advertisement.author.avatar;
  pinImage.alt = advertisement.offer.title;

  return pin;
}

for (var i = 0; i < advertisements.length; i++) {
  fragment.appendChild(renderAdvertisement(advertisements[i]));
}

pins.appendChild(fragment);
