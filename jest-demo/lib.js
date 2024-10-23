const db = require("./db");
const mail = require("./mail");

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

// Testing exceptions
module.exports.registerUser = (username) => {
  if (!username) throw new Error("Username is required.");

  return { id: new Date().getTime(), username: username };
};

// Mock functions
module.exports.applyDiscount = (order) => {
  const customer = db.getCustomerSync(order.customerId);

  if (customer.points > 10) {
    order.totalPrice *= 0.9;
  }
};

module.exports.notifyCustomer = (order) => {
  const customer = db.getCustomerSync(order.customerId);

  mail.send(customer.email, "Your order was placed successfully.");
};
