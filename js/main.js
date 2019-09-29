'use strict';

var MIN_X_POSITION = 50;
var MAX_X_POSITION = 1100;
var MIN_Y_POSITION = 130;
var MAX_Y_POSITION = 420;

var MAP_PIN_HEIGHT = 80;
var MAP_PIN_WIDTH = 40;

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

var offerTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var KeyCodes = {
  enter: 13,
  escape: 27,
  space: 32
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

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsConatiner = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

function renderAdvertisement(advertisement) {
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');

  pin.style = 'left: ' + advertisement.location.x + 'px; top: ' + advertisement.location.y + 'px';
  pinImage.src = advertisement.author.avatar;
  pinImage.alt = advertisement.offer.title;

  return pin;
}

for (var i = 0; i < advertisements.length; i++) {
  fragment.appendChild(renderAdvertisement(advertisements[i]));
}

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

function renderAdvertisementCard(advertisement) {
  var card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = advertisement.offer.title;
  card.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  card.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = offerTypes[advertisement.offer.type];
  card.querySelector('.popup__text--capacity').textContent =
    advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent =
    'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

  var featuresPopup = card.querySelector('.popup__features');
  featuresPopup.textContent = '';

  var featureFragment = document.createDocumentFragment();
  advertisement.offer.features.forEach(function (featureName) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature', 'popup__feature--' + featureName);
    featureFragment.appendChild(feature);
  });
  featuresPopup.appendChild(featureFragment);

  card.querySelector('.popup__description').textContent = advertisement.offer.description;
  card.querySelector('.popup__photos img').src = advertisement.offer.photos[0];
  card.querySelector('.popup__avatar').src = advertisement.author.avatar;

  return card;
}

function toggleFieldSets(fieldsetsDisabled) {
  document.querySelectorAll('fieldset').forEach(function (fieldset) {
    fieldset.disabled = fieldsetsDisabled;
  });
}

toggleFieldSets(true);

var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');

function renderAdvertisementOnPinClick() {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  pins.forEach(function (pin, index) {
    pin.addEventListener('click', function () {
      var advertisementCard = map.querySelector('.map__card');
      if (advertisementCard) {
        map.removeChild(advertisementCard);
      }
      map.appendChild(renderAdvertisementCard(advertisements[index]));
      onAdvertisementOnCloseClick();
    });
  });
}

function onAdvertisementOnCloseClick() {
  var adCloseButton = document.querySelector('.popup__close');

  adCloseButton.addEventListener('click', function (evt) {
    map.removeChild(map.querySelector('.map__card'));
  });
}

function activatePage() {
  toggleFieldSets(false);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  pinsConatiner.appendChild(fragment);
  map.appendChild(renderAdvertisementCard(advertisements[0]));
  renderAdvertisementOnPinClick();
  onAdvertisementOnCloseClick();
}

var addressInput = document.querySelector('#address');

function setAddress(x, y) {
  addressInput.value = x + MAP_PIN_WIDTH + ', ' + (y + MAP_PIN_HEIGHT);
}

mainPin.addEventListener('mousedown', function (evt) {
  var target = evt.currentTarget;

  activatePage();
  setAddress(parseInt(target.style.left, 10), parseInt(target.style.top, 10));
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.enter) {
    activatePage();
  }
});

var housingTypeToMinPrice = {
  flat: 1000,
  bungalo: 0,
  house: 5000,
  palace: 10000
};

var housingType = document.querySelector('#type');
housingType.addEventListener('change', function (evt) {
  var priceInput = adForm.querySelector('#price');
  priceInput.value = '';
  priceInput.placeholder = housingTypeToMinPrice[evt.target.value];
  priceInput.setAttribute('min', housingTypeToMinPrice[evt.target.value]);
});

var checkinTimeSelect = document.querySelector('#timein');
var checkoutTimeSelect = document.querySelector('#timeout');

checkinTimeSelect.addEventListener('change', function () {
  checkoutTimeSelect.value = checkinTimeSelect.value;
});

checkoutTimeSelect.addEventListener('change', function () {
  checkinTimeSelect.value = checkoutTimeSelect.value;
});

function validateAdFormInputs(target) {
  switch (target.id) {
    case 'title':
      if (target.value.length < 30) {
        target.setCustomValidity('Заголовок должен содержать не менее 30 символов');
      } else {
        target.setCustomValidity('');
      }
      break;
    case 'price':
      if (housingTypeToMinPrice[target.value] < target.min) {
        target.setCustomValidity(
            'Минимальное значение цены за ночь для данного типа жилья ' + target.min + ' рублей'
        );
      }
  }
}

adForm.addEventListener('input', function (evt) {
  var target = evt.target;
  validateAdFormInputs(target);
});

var roomsAmountSelect = document.querySelector('#room_number');
var seatingCapacitySelect = document.querySelector('#capacity');

var roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

function checkRooms(peopleAmount) {
  var seatingCapacityOptions = seatingCapacitySelect.querySelectorAll('option');

  seatingCapacityOptions.forEach(function (option) {
    option.disabled = true;
  });

  roomValues[peopleAmount].forEach(function (seatsAmount) {
    seatingCapacityOptions.forEach(function (option) {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
}

roomsAmountSelect.addEventListener('change', function (evt) {
  var target = evt.target;

  checkRooms(target.value);
});
