// Testing numbers
module.exports.absolute = function (number) {
  return number >= 0 ? number : -number;
};

// Testing strings
module.exports.greet = function (name) {
  return "Welcome " + name;
};

// Testing arrays
module.exports.getCurrencies = function () {
  return ["USD", "AUD", "EUR"];
};
