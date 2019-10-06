'use strict';
(function () {
  var MAX_TIMEOUT_TIME = 10000;
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  function removeErrorPopup(errorElement) {
    document.body.querySelector('main').removeChild(errorElement);
  }

  function onError(message) {
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = message;

    document.body.querySelector('main').appendChild(error);
    document.body.addEventListener('click', function () {
      removeErrorPopup(error);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KeyCodes.escape) {
        removeErrorPopup(error);
      }
    });
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

  window.requests = {
    getData: getData,
    onError: onError
  };
})();
