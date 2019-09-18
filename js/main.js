'use strict';

var AVATARS_AMOUNT = 8;
var ADVERTISEMENTS_AMOUNT = 8;
var PHOTOS_AMOUNT = 3;
var MIN_ROOM_PRICE = 100;
var MAX_ROOM_PRICE = 5000;
var MIN_ROOMS_AMOUNT = 1;
var MAX_ROOMS_AMOUNT = 5;
var MIN_GUESTS_AMOUNT = 1;
var MAX_GUESTS_AMOUNT = 10;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var MIN_X_POSITION = 0;
var MAX_X_POSITION = 1200;
var MIN_Y_POSITION = 130;
var MAX_Y_POSITION = 630;

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];

function getAvatarsList() {
  var avatarsArray = [];

  for (var i = 1; i <= AVATARS_AMOUNT; i++) {
    avatarsArray.push('img/avatars/user0' + i + '.png');
  }

  return avatarsArray;
}

function getPhotosList() {
  var photosArray = [];

  for (var i = 1; i <= PHOTOS_AMOUNT; i++) {
    photosArray.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }

  return photosArray;
}

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
  var avatars = shuffleArray(getAvatarsList());

  for (var i = 0; i < amount; i++) {
    var randomAvatarIndex = generateRandomNumber(0, avatars.length);
    var avatar = avatars[randomAvatarIndex];
    avatars.splice(randomAvatarIndex, 1);
    var locationX = generateRandomNumber(MIN_X_POSITION, MAX_X_POSITION);
    var locationY = generateRandomNumber(MIN_Y_POSITION, MAX_Y_POSITION);
    var photos = getPhotosList();

    advertisements.push({
      author: {
        avatar: avatar,
        title: 'Супер крутое жильё',
        address: locationX + ', ' + locationY,
        price: generateRandomNumber(MIN_ROOM_PRICE, MAX_ROOM_PRICE),
        type: types[generateRandomNumber(0, types.length)],
        rooms: generateRandomNumber(MIN_ROOMS_AMOUNT, MAX_ROOMS_AMOUNT),
        guests: generateRandomNumber(MIN_GUESTS_AMOUNT, MAX_GUESTS_AMOUNT),
        checkin: times[generateRandomNumber(0, times.length)],
        checkout: times[generateRandomNumber(0, times.length)],
        features: shuffleArray(features).slice(0, generateRandomNumber(1, features.length)),
        description: 'Самое популярное жильё в городе!',
        photos: shuffleArray(photos).slice(0, generateRandomNumber(1, photos.length))
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

  return advertisements;
}

var advertisements = generateAdvertisement(ADVERTISEMENTS_AMOUNT);

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
  pinImage.alt = advertisement.title;

  return pin;
}

for (var i = 0; i < advertisements.length; i++) {
  fragment.appendChild(renderAdvertisement(advertisements[i]));
}

pins.appendChild(fragment);
