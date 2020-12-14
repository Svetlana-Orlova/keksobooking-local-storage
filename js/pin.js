'use strict';

const MAX_PINS = 5;
const pinTemplateElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const containerPinTemplateElement = document.querySelector(`.map__pins`);
// const fieldsetElements = document.querySelectorAll(`fieldset`);
const filtersElement = document.querySelector(`.map__filters`);

const getPin = (ad) => {
  if (!ad.offer) {
    return false;
  }
  const pin = pinTemplateElement.cloneNode(true);
  const img = pin.querySelector(`img`);

  pin.style = `left: ${(ad.location.x - img.width / 2)}px;` + `top: ${ad.location.y - img.height}px;`;
  img.src = ad.author.avatar;
  img.alt = ad.offer.title;

  pin.addEventListener(`click`, () => {
    window.card.create(window.card.get(ad));
    disablePin();
    pin.classList.add(`map__pin--active`);
    document.addEventListener(`keydown`, onEscDisablePin);
  });

  return pin;
};

const insertPins = (ads) => {
  const pins = document.createDocumentFragment();
  let count;

  if (ads.length < MAX_PINS) {
    count = ads.length;
  } else {
    count = MAX_PINS;
  }

  for (let i = 0; i < count; i++) {
    pins.appendChild(getPin(ads[i]));
  }

  document.querySelector(`.map__pins`).appendChild(pins);
};

const disablePin = () => {
  const activePinElement = containerPinTemplateElement.querySelector(`.map__pin--active`);
  if (activePinElement) {
    activePinElement.classList.remove(`map__pin--active`);
  }
};

const onEscDisablePin = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    disablePin();
  }
};

const removePins = () => {
  const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((pin) => {
    pin.remove();
  });
};

let adverts = [];

// const successLoadHandler = (jsonData) => {
//   adverts = jsonData;

//   if (jsonData.length > 0) {
//     window.form.enableItems(fieldsetElements);
//   }

//   updatePins();
// };

const showMapPins = () => {
  insertPins(window.locStore.loadData());
};

const updatePins = () => {
  removePins();
  window.card.close();

  const filteredAds = window.filter.doOffers(adverts);

  insertPins(filteredAds);
};

filtersElement.addEventListener(`change`, window.debounce(updatePins));

window.pin = {
  disable: disablePin,
  insert: insertPins,
  remove: removePins,
  update: showMapPins
};
