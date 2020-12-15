'use strict';

const loadData = () => {
  let storageEmpty = true;
  let store = [];
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
    let jsonArray = JSON.stringify(window.util.ADS);
    localStorage.setItem(`keksobooking_local_data`, jsonArray);
    store = JSON.parse(localStorage[`keksobooking_local_data`]);
  }
  return store;
};

const uploadData = (ad) => {
  let store = JSON.parse(localStorage[`keksobooking_local_data`]);
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
