// Testing numbers
module.exports.absolute = (number) => {
  return number >= 0 ? number : -number;
};

// Testing strings
module.exports.greet = (name) => {
  return "Welcome " + name;
};

// Testing arrays
module.exports.getCurrencies = () => {
  return ["USD", "AUD", "EUR"];
};

// Testing Objects
module.exports.getProduct = (productId) => {
  return { id: productId, price: 10, category: "a" };
};
