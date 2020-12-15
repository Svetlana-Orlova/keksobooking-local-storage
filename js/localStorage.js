'use strict';

let dataOfLocalStorage = [window.util.ad1, window.util.ad2];
let storage = ``;
let store = ``;

try {
  storage = localStorage.getItem(`keksobooking_local_data`);
} catch (err) {
}

const loadData = () => {
  if (storage) {
    store = JSON.parse(localStorage[`keksobooking_local_data`]);
  } else {
    let jsonArray = JSON.stringify(dataOfLocalStorage);
    localStorage.setItem(`keksobooking_local_data`, jsonArray);
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
