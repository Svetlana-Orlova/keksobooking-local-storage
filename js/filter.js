'use strict';

const ADS_NUMBER = 5;
const ANY = `any`;
const filtersElement = document.querySelector(`.map__filters`);
const typeElement = filtersElement.querySelector(`#housing-type`);
const priceElement = filtersElement.querySelector(`#housing-price`);
const roomsElement = filtersElement.querySelector(`#housing-rooms`);
const guestsElement = filtersElement.querySelector(`#housing-guests`);
const featuresElement = filtersElement.querySelector(`#housing-features`);

const Prices = {
  MIN: 10000,
  MAX: 50000
};

const checkPrice = (element) => {
  switch (priceElement.value) {
    case ANY:
      return true;
    case `low`:
      return (element.offer.price < Prices.MIN);
    case `middle`:
      return (element.offer.price >= Prices.MIN) && (element.offer.price < Prices.MAX);
    case `high`:
      return (element.offer.price >= Prices.MAX);
    default:
      return element === priceElement.value;
  }
};

const getSelectFeatures = () => {
  return Array.from(featuresElement.querySelectorAll(`input:checked`)).map((item) => {
    return item.value;
  });
};

const filterOffers = (offers) => {
  const filteredOffers = [];

  for (let i = 0; i < offers.length; i++) {
    const element = offers[i];
    const isTypeMatched = typeElement.value === ANY ? true : element.offer.type === typeElement.value;
    const isRoomsMatched = roomsElement.value === ANY ? true : element.offer.rooms === +roomsElement.value;
    const isGuestMatched = guestsElement.value === ANY ? true : element.offer.guests === +guestsElement.value;
    const isPriceMatched = checkPrice(element);
    const isFeaturesMatched = getSelectFeatures().every((feature) => {
      return element.offer.features.includes(feature);
    });
    if (isTypeMatched && isRoomsMatched && isGuestMatched && isPriceMatched && isFeaturesMatched) {
      filteredOffers.push(element);
    }
    if (filteredOffers.length === ADS_NUMBER) {
      break;
    }
  }
  return filteredOffers;
};

window.filter = {
  doOffers: filterOffers
};
