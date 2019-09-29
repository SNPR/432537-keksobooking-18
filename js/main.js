'use strict';

var MAP_PIN_HEIGHT = 80;
var MAP_PIN_WIDTH = 40;

var advertisements = window.generateAdvertisement(8);

var map = document.querySelector('.map');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsConatiner = document.querySelector('.map__pins');

function renderAdvertisement(advertisement) {
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');

  pin.style = 'left: ' + advertisement.location.x + 'px; top: ' + advertisement.location.y + 'px';
  pinImage.src = advertisement.author.avatar;
  pinImage.alt = advertisement.offer.title;

  return pin;
}

function toggleFieldSets(fieldsetsDisabled) {
  document.querySelectorAll('fieldset').forEach(function(fieldset) {
    fieldset.disabled = fieldsetsDisabled;
  });
}

toggleFieldSets(true);

var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');

function renderAdvertisementOnPinClick() {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  pins.forEach(function(pin, index) {
    pin.addEventListener('click', function(evt) {
      var advertisementCard = map.querySelector('.map__card');
      if (advertisementCard) {
        map.removeChild(advertisementCard);
      }
      map.appendChild(window.renderAdvertisementCard(advertisements[index]));
      closeAdvertisementOnCloseClick();
      setAddress(parseInt(evt.currentTarget.style.left, 10), parseInt(evt.currentTarget.style.top, 10));
    });
  });
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < advertisements.length; i++) {
  fragment.appendChild(renderAdvertisement(advertisements[i]));
}

function closeAdvertisementOnCloseClick() {
  var adCloseButton = document.querySelector('.popup__close');

  adCloseButton.addEventListener('click', function() {
    map.removeChild(map.querySelector('.map__card'));
  });
}

function onEscPress() {
  document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === window.util.KeyCodes.escape && document.querySelector('.popup__close')) {
      map.removeChild(map.querySelector('.map__card'));
    }
  });
}

function activatePage() {
  toggleFieldSets(false);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  pinsConatiner.appendChild(fragment);
  map.appendChild(renderAdvertisementCard(advertisements[0]));
  renderAdvertisementOnPinClick();
  closeAdvertisementOnCloseClick();
  onEscPress();
}

var addressInput = document.querySelector('#address');

function setAddress(x, y) {
  addressInput.value = x + MAP_PIN_WIDTH + ', ' + (y + MAP_PIN_HEIGHT);
}

mainPin.addEventListener('mousedown', function(evt) {
  var target = evt.currentTarget;

  activatePage();
  setAddress(parseInt(target.style.left, 10), parseInt(target.style.top, 10));
});

mainPin.addEventListener('keydown', function(evt) {
  if (evt.keyCode === window.util.KeyCodes.enter) {
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
housingType.addEventListener('change', function(evt) {
  var priceInput = adForm.querySelector('#price');
  priceInput.value = '';
  priceInput.placeholder = housingTypeToMinPrice[evt.target.value];
  priceInput.setAttribute('min', housingTypeToMinPrice[evt.target.value]);
});

var checkinTimeSelect = document.querySelector('#timein');
var checkoutTimeSelect = document.querySelector('#timeout');

checkinTimeSelect.addEventListener('change', function() {
  checkoutTimeSelect.value = checkinTimeSelect.value;
});

checkoutTimeSelect.addEventListener('change', function() {
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

adForm.addEventListener('input', function(evt) {
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

  seatingCapacityOptions.forEach(function(option) {
    option.disabled = true;
  });

  roomValues[peopleAmount].forEach(function(seatsAmount) {
    seatingCapacityOptions.forEach(function(option) {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
}

roomsAmountSelect.addEventListener('change', function(evt) {
  var target = evt.target;

  checkRooms(target.value);
});
