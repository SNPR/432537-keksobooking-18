'use strict';

(function () {
  var FORM_URL = 'https://js.dump.academy/keksobooking';
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var pins = document.querySelector('.map__pins');
  var MAIN_PIN_X_INITIAL = 570;
  var MAIN_PIN_Y_INITIAL = 375;

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
    validateAdFormInputs(evt.target);
  });

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successElement = successTemplate.cloneNode(true);

  function removeSuccessPopup(errorElement) {
    if (errorElement) {
      document.body.querySelector('main').removeChild(errorElement);
      document.body.removeEventListener('click', onBodyClick);
      document.removeEventListener('keydown', onEscPress);
    }
  }

  function onBodyClick() {
    removeSuccessPopup(successElement);
  }

  function onEscPress(evt) {
    if (evt.keyCode === window.util.KeyCodes.escape) {
      removeSuccessPopup(successElement);
    }
  }

  function resetPage() {
    adForm.reset();
    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    pins.textContent = '';
    mainPin.style.left = MAIN_PIN_X_INITIAL + 'px';
    mainPin.style.top = MAIN_PIN_Y_INITIAL + 'px';
    pins.appendChild(mainPin);
    window.map.setAddress(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10));
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      document.querySelector('.map').removeChild(mapCard);
    }
    mainPin.addEventListener('click', window.map.activatePage);
  }

  function onFormSubmit(evt) {
    evt.preventDefault();

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('POST', FORM_URL);
    xhr.send(new FormData(adForm));

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        document.body.querySelector('main').appendChild(successElement);
        document.body.addEventListener('click', onBodyClick);
        document.addEventListener('keydown', onEscPress);
        resetPage();
      } else {
        window.requests.onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
  }

  adForm.addEventListener('submit', onFormSubmit);

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
    checkRooms(evt.target.value);
  });
})();
