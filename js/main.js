"use strict";

var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var types = ["palace", "flat", "house", "bungalo"];
var times = ["12:00", "13:00", "14:00"];

function getAvatarsList() {
  var avatarsArray = [];

  for (var i = 1; i <= 8; i++) {
    avatarsArray.push("img/avatars/user0" + i + ".png");
  }

  return avatarsArray;
}

function getPhotosList() {
  var photosArray = [];

  for (var i = 1; i <= 3; i++) {
    photosArray.push("http://o0.github.io/assets/images/tokyo/hotel" + i + ".jpg");
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
    var locationX = generateRandomNumber(0, 1200);
    var locationY = generateRandomNumber(130, 630);
    var photos = getPhotosList();

    advertisements.push({
      author: {
        avatar: avatar,
        title: "Супер крутое жильё",
        address: locationX + ", " + locationY,
        price: generateRandomNumber(100, 5000),
        type: types[generateRandomNumber(0, types.length)],
        rooms: generateRandomNumber(1, 5),
        guests: generateRandomNumber(1, 10),
        checkin: times[generateRandomNumber(0, times.length)],
        checkout: times[generateRandomNumber(0, times.length)],
        features: shuffleArray(features).slice(0, generateRandomNumber(1, features.length)),
        description: "Самое популярное жильё в городе!",
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
