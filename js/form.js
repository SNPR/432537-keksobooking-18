'use strict';

(function () {
  var MAIN_PIN_X_INITIAL = 570;
  var MAIN_PIN_Y_INITIAL = 375;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var pins = document.querySelector('.map__pins');

  var avatarInput = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview');

  var apartmentInput = document.querySelector('.ad-form__input');
  var apartmentPhotoPreview = document.querySelector('.ad-form__photo');

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

  function removeSuccessPopup(element) {
    if (element) {
      document.body.querySelector('main').removeChild(element);
      document.body.removeEventListener('click', onBodyClick);
      document.removeEventListener('keydown', onEscPress);
    }
  }

  function onBodyClick() {
    removeSuccessPopup(successElement);
  }

  function onEscPress(evt) {
    if (evt.keyCode === window.util.KeyCodes.ESCAPE) {
      removeSuccessPopup(successElement);
    }
  }

  function removeImagesFromForm() {
    avatarPreview.querySelector('img').src = 'img/muffin-grey.svg';
    apartmentPhotoPreview.textContent = '';
  }

  function resetPage() {
    removeImagesFromForm();
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

  adForm.addEventListener('reset', function () {
    removeImagesFromForm();
  });

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.network.sendFormData(adForm, function () {
      document.body.querySelector('main').appendChild(successElement);
      document.body.addEventListener('click', onBodyClick);
      document.addEventListener('keydown', onEscPress);
      resetPage();
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

  function appendImage(reader, preview) {
    var img = document.createElement('img');
    img.src = reader.result;
    img.height = 100;
    preview.appendChild(img);
  }

  function onFileUpload(input, preview, appendItems) {
    return function () {
      var file = input.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (appendItems && preview.querySelector('img')) {
            appendImage(reader, preview);
          } else if (!preview.querySelector('img')) {
            appendImage(reader, preview);
          } else {
            preview.querySelector('img').src = reader.result;
          }
        });

        reader.readAsDataURL(file);
      }
    };
  }

  apartmentInput.addEventListener('change', onFileUpload(apartmentInput, apartmentPhotoPreview, true));
  avatarInput.addEventListener('change', onFileUpload(avatarInput, avatarPreview, false));
})();
