'use strict';

(function () {
  var MAX_TIMEOUT_TIME = 10000;
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var FORM_URL = 'https://js.dump.academy/keksobooking';
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);

  function removeErrorPopup(error) {
    document.body.querySelector('main').removeChild(error);
    document.body.removeEventListener('click', onBodyClick);
    document.removeEventListener('keydown', onEscPress);
  }

  function sendFormData(adForm, callback) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('POST', FORM_URL);
    xhr.send(new FormData(adForm));

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        callback();
      } else {
        window.network.onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
  }

  function onBodyClick() {
    removeErrorPopup(errorElement);
  }

  function onEscPress(evt) {
    if (evt.keyCode === window.util.KeyCodes.escape) {
      removeErrorPopup(errorElement);
    }
  }

  function onError(message) {
    errorElement.querySelector('.error__message').textContent = message;

    document.body.querySelector('main').appendChild(errorElement);
    document.body.addEventListener('click', onBodyClick);
    document.addEventListener('keydown', onEscPress);
  }

  function getData(onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = MAX_TIMEOUT_TIME;

    xhr.open('GET', DATA_URL);
    xhr.send();
  }

  window.network = {
    getData: getData,
    onError: onError,
    sendFormData: sendFormData
  };
})();
