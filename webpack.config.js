const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/localStorage.js",
    "./js/debounce.js",
    "./js/message.js",
    "./js/photo.js",
    "./js/map.js",
    "./js/mainPin.js",
    "./js/card.js",
    "./js/filter.js",
    "./js/pin.js",
    "./js/form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  optimization: {
    minimize: false
  },
  devtool: false
};
