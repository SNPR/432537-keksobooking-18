'use strict';

(function () {
  var offerTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  function renderAdvertisementCard(advertisement) {
    var card = cardTemplate.cloneNode(true);
    var map = document.querySelector('.map');

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

    var photosFragment = document.createDocumentFragment();
    advertisement.offer.photos.forEach(function (photo) {
      var photoElement = card.querySelector('.popup__photo').cloneNode(false);

      photoElement.src = photo;
      photosFragment.appendChild(photoElement);
    });

    card.querySelector('.popup__description').textContent = advertisement.offer.description;
    card.querySelector('.popup__photos').textContent = '';
    card.querySelector('.popup__photos').appendChild(photosFragment);
    card.querySelector('.popup__avatar').src = advertisement.author.avatar;
    card.querySelector('.popup__close').addEventListener('click', function () {
      map.removeChild(map.querySelector('.map__card'));
    });

    return card;
  }

  window.card = {renderAdvertisementCard: renderAdvertisementCard};
})();
