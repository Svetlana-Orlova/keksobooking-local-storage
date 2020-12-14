/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {


const PRIMARY_MOUSE_BUTTON = 0;

const OFFER_TYPES = {
  flat: {
    minPrice: `1000`,
    text: `Квартира`
  },
  house: {
    minPrice: `5000`,
    text: `Дом`
  },
  palace: {
    minPrice: `10000`,
    text: `Дворец`
  },
  bungalow: {
    minPrice: `0`,
    text: `Бунгало`
  }
};

const AD_FIRST = {
  "author": {
    "avatar": `img/avatars/user01.png`
  },
  "offer": {
    "title": `Уютное гнездышко для молодоженов`,
    "address": `102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3`,
    "price": 42000,
    "type": `house`,
    "rooms": 3,
    "guests": 6,
    "checkin": `14:00`,
    "checkout": `10:00`,
    "features": [
      `wifi`,
      `dishwasher`,
      `parking`,
      `washer`,
      `elevator`,
      `conditioner`
    ],
    "description": `Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.`,
    "photos": [
      `https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_25_b.jpg`,
      `https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_27_b.jpg`,
      `https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_17_b.jpg`,
      `https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_30_b.jpg`,
      `https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_1_b.jpg`,
      `https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_12_b.jpg`,
      `https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_5_b.jpg`
    ]
  },
  "location": {
    "x": 427,
    "y": 493
  }
};

const AD_SECOND = {
  "author": {
    "avatar": `img/avatars/user02.png`
  },
  "offer": {
    "title": `Маленькая квартирка рядом с парком`,
    "address": `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
    "price": 30000,
    "type": `flat`,
    "rooms": 1,
    "guests": 1,
    "checkin": `9:00`,
    "checkout": `7:00`,
    "features": [
      `elevator`,
      `conditioner`
    ],
    "description": `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
    "photos": [
      `https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/01488611-c1f9-4854-ad67-9f0ad3e857e6.jpeg`,
      `https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/d976dd4b-2a7e-415a-a2a2-afc51caf8006.jpeg`
    ]
  },
  "location": {
    "x": 471,
    "y": 545
  }
};

const onPrimaryMouseButtonPress = (evt, action) => {
  if (evt.button === PRIMARY_MOUSE_BUTTON) {
    action();
  }
};

const onEscPress = (evt, action) => {
  if (evt.key === `Escape`) {
    action();
  }
};

const onEnterPress = (evt, action) => {
  if (evt.key === `Enter`) {
    action();
  }
};

window.util = {
  offerTypes: OFFER_TYPES,
  ad1: AD_SECOND,
  ad2: AD_FIRST,
  onPrimaryMouseButtonPress,
  onEscPress,
  onEnterPress
};

})();

(() => {


let dataOfLocalStorage = [window.util.ad1, window.util.ad2];
// let isStorageSupport = true;
let storage = ``;
let store = ``;

try {
  storage = localStorage.getItem(`keksobooking_local_data`);
} catch (err) {
  // isStorageSupport = false;
}

const loadData = () => {
  if (storage) {
    store = JSON.parse(localStorage[`keksobooking_local_data`]);
  } else {
    let JSONarray = JSON.stringify(dataOfLocalStorage);
    localStorage.setItem(`keksobooking_local_data`, JSONarray);
    store = JSON.parse(localStorage[`keksobooking_local_data`]);
  }
  return store;
};

const uploadData = (ad) => {
  store = JSON.parse(localStorage[`keksobooking_local_data`]);
  store.push(ad);
  let jsonArrayOfAds = JSON.stringify(store);
  localStorage.setItem(`keksobooking_local_data`, jsonArrayOfAds);
  store = JSON.parse(localStorage[`keksobooking_local_data`]);
  dataOfLocalStorage = store;
  return store;
};

window.locStore = {
  loadData,
  uploadData,
  data: dataOfLocalStorage
};

})();

(() => {


const DEBOUNCE_INTERVAL = 500;

window.debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

})();

(() => {


const mainElement = document.querySelector(`main`);
const successMessageTemplateElement = document.querySelector(`#success`).content.querySelector(`.success`);
const errorMessageTemplateElement = document.querySelector(`#error`).content.querySelector(`.error`);
const errorButtonElement = errorMessageTemplateElement.querySelector(`.error__button`);

const errorHandler = (errorMessage) => {
  const node = document.createElement(`div`);

  node.style = `z-index: 100; padding: 10px; margin: 0 auto; color: #fff; font-weight: 500; text-align: center; background-color: #f44336; border-radius: 4px;`;
  node.style.position = `fixed`;
  node.style.top = `5px`;
  node.style.left = `15px`;
  node.style.right = `15px`;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;

  node.addEventListener(`click`, () => {
    node.remove();
  });
  document.addEventListener(`keydown`, onDocumentEscPress);

  const onDocumentEscPress = (evt) => {
    window.util.onEscPress(evt, node.remove());
  };

  document.body.insertAdjacentElement(`afterbegin`, node);
  window.form.filters.remove();
};

const showErrorMessage = () => {
  mainElement.insertAdjacentElement(`afterbegin`, errorMessageTemplateElement);
  errorButtonElement.addEventListener(`click`, () => {
    errorMessageTemplateElement.remove();
  });
  documentAddEventListener();
};

const showSuccessMessage = () => {
  mainElement.insertAdjacentElement(`afterbegin`, successMessageTemplateElement);
  documentAddEventListener();
};

const closeMessage = () => {
  removeMessage();
  documentRemoveEventListener();
};

const removeMessage = () => {
  const messageSuccess = document.querySelector(`.success`);
  const messageError = document.querySelector(`.error`);
  if (messageSuccess) {
    messageSuccess.remove();
  } else if (messageError) {
    messageError.remove();
  }
};

const onMessageEscPress = (evt) => {
  window.util.onEscPress(evt, closeMessage);
};

const documentAddEventListener = () => {
  document.addEventListener(`keydown`, onMessageEscPress);
  document.addEventListener(`click`, closeMessage);
};

const documentRemoveEventListener = () => {
  document.removeEventListener(`keydown`, onMessageEscPress);
  document.removeEventListener(`click`, closeMessage);
};

window.message = {
  errorHandler,
  error: showErrorMessage,
  success: showSuccessMessage
};

})();

(() => {


const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const AVATAR_DEFAULT = `img/muffin-grey.svg`;

const avatarLoader = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview`);
const photoLoader = document.querySelector(`.ad-form__upload input[type=file]`);
const photoPreview = document.querySelector(`.ad-form__photo`);

const makeImageInfo = (text, width, height) => {
  return {
    text,
    size: {
      width,
      height
    }
  };
};

const avatarInfo = makeImageInfo(`Аватар пользователя`, 40, 44);
const photoInfo = makeImageInfo(`Фотография жилья`, 70, 70);

const createImagePreview = (source, info, previewNode) => {
  const imageNode = document.createElement(`img`);

  imageNode.src = source;
  imageNode.width = info.size.width;
  imageNode.height = info.size.height;
  imageNode.alt = info.text;

  previewNode.appendChild(imageNode);
};

const setupFileChooser = (fileChooser, preview, info) => {
  fileChooser.addEventListener(`change`, () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((type) => {
      return fileName.endsWith(type);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        preview.innerHTML = ``;
        createImagePreview(reader.result, info, preview);
      });

      reader.readAsDataURL(file);
    }
  });
};

const resetPreviews = () => {
  photoPreview.innerHTML = ``;
  avatarPreview.innerHTML = ``;
  createImagePreview(AVATAR_DEFAULT, avatarInfo, avatarPreview);
};

setupFileChooser(avatarLoader, avatarPreview, avatarInfo);
setupFileChooser(photoLoader, photoPreview, photoInfo);

window.photo = {
  resetPreviews
};

})();

(() => {


const mapElement = document.querySelector(`.map`);

const disableMap = () => {
  mapElement.classList.add(`map--faded`);
};

const enableMap = () => {
  mapElement.classList.remove(`map--faded`);
};

window.map = {
  disable: disableMap,
  enable: enableMap
};

})();

(() => {


const MAIN_PIN_POINTER_HEIGHT = 10;
const mapElement = document.querySelector(`.map`);
const mainPinElement = mapElement.querySelector(`.map__pin--main`);
const mainPinHeight = mainPinElement.offsetHeight + MAIN_PIN_POINTER_HEIGHT;
const mainPinHalfWidth = Math.floor(mainPinElement.offsetWidth / 2);

const MainPinStartCoordinates = {
  X: 375,
  Y: 570,
};

const CoordinateX = {
  MIN: 0,
  MAX: mapElement.offsetWidth
};

const CoordinateY = {
  MIN: 130,
  MAX: 630
};

let mainPinPositionX = {
  min: CoordinateX.MIN - mainPinHalfWidth,
  max: CoordinateX.MAX - mainPinHalfWidth
};

let mainPinPositionY = {
  min: CoordinateY.MIN - mainPinHeight,
  max: CoordinateY.MAX - mainPinHeight
};

const moveMainPin = (evt) => {
  evt.preventDefault();
  let dragged = false;

  let currentCoords = {
    X: evt.clientX,
    Y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    window.card.close();
    window.pin.disable();
    mainPinElement.removeEventListener(`keydown`, onMainPinEnterPress);
    dragged = true;

    const Shift = {
      X: currentCoords.X - moveEvt.clientX,
      Y: currentCoords.Y - moveEvt.clientY
    };

    currentCoords = {
      X: moveEvt.clientX,
      Y: moveEvt.clientY
    };

    let mainPinY = mainPinElement.offsetTop - Shift.Y;
    let mainPinX = mainPinElement.offsetLeft - Shift.X;

    if (mainPinX <= mainPinPositionX.min) {
      mainPinX = mainPinPositionX.min;
    } else if (mainPinX >= mainPinPositionX.max) {
      mainPinX = mainPinPositionX.max;
    }

    if (mainPinY <= mainPinPositionY.min) {
      mainPinY = mainPinPositionY.min;
    } else if (mainPinY >= mainPinPositionY.max) {
      mainPinY = mainPinPositionY.max;
    }

    mainPinElement.style.top = `${mainPinY}px`;
    mainPinElement.style.left = `${mainPinX}px`;

    window.form.fillAddress(mainPinElement, mainPinHeight);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

    const onClickPreventDefault = (clickEvt) => {
      clickEvt.preventDefault();
      mainPinElement.removeEventListener(`click`, onClickPreventDefault);
    };

    if (dragged === false) {
      mainPinElement.addEventListener(`click`, onClickPreventDefault);
    }

    window.form.fillAddress(mainPinElement, mainPinHeight);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

mainPinElement.addEventListener(`mousedown`, moveMainPin);

const resetMainPin = () => {
  mainPinElement.style.top = `${MainPinStartCoordinates.X}px`;
  mainPinElement.style.left = `${MainPinStartCoordinates.Y}px`;
  window.form.fillAddress(mainPinElement, mainPinHeight);
  mainPinElement.addEventListener(`keydown`, onMainPinEnterPress);
};

const onMainPinEnterPress = (evt) => {
  window.util.onEnterPress(evt, window.main.activatePage);
};

window.mainPin = {
  restart: resetMainPin
};

})();

(() => {


const mapElement = document.querySelector(`.map`);
const cardTemplateElement = document.querySelector(`#card`).content.querySelector(`.map__card`);
const filtersContainerElement = mapElement.querySelector(`.map__filters-container`);

const getCapacityText = (rooms, guests) => {
  let result = ``;
  if (rooms === 0) {
    result = `Помещение `;
  } else if (rooms % 10 === 1 && rooms % 100 !== 11) {
    result = rooms + ` комната `;
  } else if (rooms % 10 > 1 && rooms % 10 < 5 && rooms % 100 !== 12 && rooms % 100 !== 13 && rooms % 100 !== 14) {
    result = rooms + ` комнаты `;
  } else {
    result = rooms + ` комнат `;
  }

  if (guests === 0) {
    result += `без гостей`;
  } else if (guests % 10 === 1 && guests % 100 !== 11) {
    result += `для ` + guests + ` гостя.`;
  } else {
    result += `для ` + guests + ` гостей.`;
  }
  return result;
};

const getCard = (ad) => {
  let cardElement = cardTemplateElement.cloneNode(true);
  const photoElements = cardElement.querySelector(`.popup__photos`);
  const photoElement = photoElements.querySelector(`.popup__photo`);
  const featureListElement = cardElement.querySelector(`.popup__features`);
  const popupClose = cardElement.querySelector(`.popup__close`);

  cardElement.querySelector(`.popup__title`).textContent = ad.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = ad.offer.price + `₽/ночь`;
  cardElement.querySelector(`.popup__text--capacity`).textContent = getCapacityText(ad.offer.rooms, ad.offer.guests);
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + `, выезд до ` + ad.offer.checkout;
  cardElement.querySelector(`.popup__description`).textContent = ad.offer.description;
  cardElement.querySelector(`.popup__avatar`).src = ad.author.avatar;
  cardElement.querySelector(`.popup__type`).textContent = window.util.offerTypes[ad.offer.type].text;

  if (ad.offer.photos) {
    photoElements.innerHTML = ``;
    ad.offer.photos.forEach((photo) => {
      const photoCard = photoElement.cloneNode(true);
      photoCard.src = photo;
      photoElements.append(photoCard);
    });
  } else {
    photoElements.remove();
  }

  if (ad.offer.features) {
    featureListElement.innerHTML = ``;
    ad.offer.features.forEach((feature) => {
      const featureElement = document.createElement(`li`);
      featureElement.classList.add(`popup__feature`, `popup__feature--${feature}`);
      featureListElement.append(featureElement);
    });
  } else {
    featureListElement.remove();
  }

  popupClose.addEventListener(`click`, () => {
    cardElement.remove();
    window.pin.disable();
  });

  return cardElement;
};

const createCard = (card) => {
  removeCard();
  document.addEventListener(`keydown`, onEscCloseCard);
  mapElement.insertBefore(card, filtersContainerElement);
};

const removeCard = () => {
  const currentCard = document.querySelector(`.map__card`);
  if (currentCard) {
    currentCard.remove();
  }
};

const closeCard = () => {
  removeCard();
  document.removeEventListener(`keydown`, onEscCloseCard);
};

const onEscCloseCard = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeCard();
  }
};

window.card = {
  get: getCard,
  create: createCard,
  close: closeCard
};

})();

(() => {


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

})();

(() => {


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

// let adverts = [];

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

  const filteredAds = window.filter.doOffers(window.locStore.data);

  insertPins(filteredAds);
};

filtersElement.addEventListener(`change`, window.debounce(updatePins));

window.pin = {
  disable: disablePin,
  insert: insertPins,
  remove: removePins,
  update: showMapPins
};

})();

(() => {


const ROOMS_NOT_FOR_GUESTS = 100;
const advertFormElement = document.querySelector(`.ad-form`);
const filtersFormElement = document.querySelector(`.map__filters`);
// const avatarInputElement = advertFormElement.querySelector(`#avatar`);
const titleInputElement = advertFormElement.querySelector(`#title`);
const addressInputElement = advertFormElement.querySelector(`#address`);
const roomQuantityElement = advertFormElement.querySelector(`#room_number`);
const guestQuantityElement = advertFormElement.querySelector(`#capacity`);
const priceElement = advertFormElement.querySelector(`#price`);
const typeFieldElement = advertFormElement.querySelector(`#type`);
const checkInFieldElement = advertFormElement.querySelector(`#timein`);
const checkOutFieldElement = advertFormElement.querySelector(`#timeout`);
const descriptionElement = advertFormElement.querySelector(`#description`);
const resetButtonElement = advertFormElement.querySelector(`.ad-form__reset`);
const imageElement = advertFormElement.querySelector(`#images`);
const buttonSubmitElement = advertFormElement.querySelector(`.ad-form__submit`);

const roomValidityMessage = {
  1: `1 комната — для 1 гостя`,
  2: `2 комнаты — для 2 гостей или для 1 гостя`,
  3: `3 комнаты — для 3 гостей, или для 2 гостей, или для 1 гостя`,
  100: `100 комнат — не для гостей`
};

let arrayOfPhoto = [];
imageElement.onchange = () => {
  arrayOfPhoto.push(imageElement.value);
  return arrayOfPhoto;
};

let arrayOfFeatures = [];

buttonSubmitElement.onclick = () => {
  const inp = advertFormElement.querySelectorAll(`.feature__checkbox`);
  for (let i = 0; i < inp.length; i++) {
    if (inp[i].checked) {
      arrayOfFeatures.push(inp[i].value);
    }
  }
  arrayOfFeatures.join(`,`);
};

const getNewData = () => {
  const coordOfAddress = addressInputElement.value.split(`,`);
  let obj = {
    "author": {
      "avatar": `img/avatars/user03.png`
    },
    "offer": {
      "title": titleInputElement.value,
      "address": addressInputElement.value,
      "price": priceElement.value,
      "type": typeFieldElement.value,
      "rooms": roomQuantityElement.value,
      "guests": guestQuantityElement.value,
      "checkin": checkInFieldElement.value,
      "checkout": checkOutFieldElement.value,
      "features": arrayOfFeatures,
      "description": descriptionElement.value,
      "photos": [`https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/5a29d708-9396-40bf-b002-92c5fdeb5c90.jpeg`,
        `https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/23e332cb-1379-4582-85ac-901d6c441635.jpeg`,
        `https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/1c859bbf-61d6-4295-b463-c1d0cbf62592.jpeg`,
        `https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/f5e66549-1940-4659-b27a-652f5c809231.jpeg`,
        `https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_30_b.jpg`]
    },
    "location": {
      "x": coordOfAddress[0],
      "y": coordOfAddress[1]
    }
  };

  return obj;
};

const disableItems = (items) => {
  items.forEach((item) => {
    item.setAttribute(`disabled`, true);
  });
};

const enableItems = (items) => {
  items.forEach((item) => {
    item.removeAttribute(`disabled`);
  });
};

const checkMinPrice = () => {
  priceElement.setAttribute(`min`, window.util.offerTypes[typeFieldElement.value].minPrice);
  priceElement.setAttribute(`placeholder`, window.util.offerTypes[typeFieldElement.value].minPrice);
};

const checkValidationCapacity = () => {
  const guests = +guestQuantityElement.value;
  const rooms = +roomQuantityElement.value;
  let result = true;

  if ((rooms === ROOMS_NOT_FOR_GUESTS && guests !== 0) || (rooms !== ROOMS_NOT_FOR_GUESTS && (guests < 1 || guests > rooms))) {
    guestQuantityElement.setCustomValidity(roomValidityMessage[rooms]);
    result = false;
  } else {
    guestQuantityElement.setCustomValidity(``);
  }
  guestQuantityElement.reportValidity();
  return result;
};

const onCheckInAndCheckOutChange = (evt) => {
  const target = evt.target;

  if (target === checkInFieldElement) {
    checkOutFieldElement.value = checkInFieldElement.value;
  } else if (target === checkOutFieldElement) {
    checkInFieldElement.value = checkOutFieldElement.value;
  }
};

const checkValidation = () => {
  checkMinPrice();
  typeFieldElement.addEventListener(`input`, checkMinPrice);
  checkValidationCapacity();
  roomQuantityElement.addEventListener(`change`, checkValidationCapacity);
  guestQuantityElement.addEventListener(`change`, checkValidationCapacity);
  checkInFieldElement.addEventListener(`change`, onCheckInAndCheckOutChange);
  checkOutFieldElement.addEventListener(`change`, onCheckInAndCheckOutChange);
};

const onSuccess = () => {
  advertFormElement.reset();
  filtersFormElement.reset();
  checkMinPrice();
  window.message.success();
  window.main.deactivatePage();
};

// const onError = () => {
//   window.message.error();
// };

const onFormSubmit = (evt) => {
  evt.preventDefault();
  window.pin.insert(window.locStore.uploadData(getNewData()));
  onSuccess();
  // window.server.upload(new FormData(advertFormElement), onSuccess, onError);
  window.scrollTo(0, 0);
};

advertFormElement.addEventListener(`submit`, onFormSubmit);

resetButtonElement.addEventListener(`click`, () => {
  advertFormElement.reset();
  filtersFormElement.reset();
  checkValidation();
  window.main.deactivatePage();
  window.scrollTo(0, 0);
});

const fillAddress = (obj, height) => {
  let addressX = Math.floor(parseInt(obj.style.left, 10) + obj.clientWidth / 2);
  let addressY;
  if (advertFormElement.classList.contains(`ad-form--disabled`)) {
    addressY = (Math.floor(parseInt(obj.style.top, 10) + obj.clientHeight / 2));
  } else {
    addressY = (Math.floor(parseInt(obj.style.top, 10) + height));
  }

  addressInputElement.value = `${addressX}, ${addressY}`;
};

window.form = {
  filters: filtersFormElement,
  checkValidation,
  disableItems,
  enableItems,
  fillAddress
};

})();

(() => {


const mainPinElement = document.querySelector(`.map__pin--main`);
const advertFormElement = document.querySelector(`.ad-form`);
const fieldsetElements = document.querySelectorAll(`fieldset`);

const mainPinRemoveEventListener = () => {
  mainPinElement.removeEventListener(`mousedown`, onMouseClickActivatePage);
  mainPinElement.removeEventListener(`keydown`, onEnterPressActivatePage);
};

const mainPinAddEventListener = () => {
  mainPinElement.addEventListener(`mousedown`, onMouseClickActivatePage);
  mainPinElement.addEventListener(`keydown`, onEnterPressActivatePage);
};

const onMouseClickActivatePage = (evt) => {
  window.util.onPrimaryMouseButtonPress(evt, activatePage);
  mainPinRemoveEventListener();
};

const onEnterPressActivatePage = (evt) => {
  window.util.onEnterPress(evt, activatePage);
  mainPinRemoveEventListener();
};

mainPinAddEventListener();

const deactivatePage = () => {
  window.map.disable();
  window.form.disableItems(fieldsetElements);
  window.pin.remove();
  window.card.close();
  advertFormElement.classList.add(`ad-form--disabled`);
  window.mainPin.restart();
  mainPinAddEventListener();
  window.photo.resetPreviews();
};

deactivatePage();
window.form.checkValidation();

const activatePage = () => {
  window.map.enable();
  window.form.enableItems(fieldsetElements);
  advertFormElement.classList.remove(`ad-form--disabled`);
  window.pin.update();
};

window.main = {
  deactivatePage,
  activatePage
};

})();

/******/ })()
;