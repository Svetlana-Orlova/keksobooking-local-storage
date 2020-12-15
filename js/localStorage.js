'use strict';

let dataOfLocalStorage = window.util.ADS;
let store = [];

const loadData = () => {
  let storageEmpty = true;
  try {
    if (localStorage.getItem(`keksobooking_local_data`) !== null) {
      storageEmpty = false;
    }
  } catch (err) {
    storageEmpty = true;
  }
  if (!storageEmpty) {
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
  return store;
};

window.locStore = {
  loadData,
  uploadData
};
