'use strict';
var adForm = document.querySelector('.ad-form');

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
