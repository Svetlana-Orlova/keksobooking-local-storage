'use strict';

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
