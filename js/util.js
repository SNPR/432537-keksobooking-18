'use strict';

(function () {
  var KeyCodes = {
    enter: 13,
    escape: 27,
    space: 32
  };

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
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

  window.util = {
    KeyCodes: KeyCodes,
    generateRandomNumber: generateRandomNumber,
    shuffleArray: shuffleArray
  };
})();
