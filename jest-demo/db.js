module.exports.getCustomerSync = (id) => {
  console.log("Reading a customer form MongoDB...");
  return { id: id, points: 11 };
};

module.exports.getCustomer = async (id) => {
  return new Promise((resolve, reject) => {
    console.log("Reading a customer form MongoDB...");
    resolve({ id: id, points: 11 });
  });
};
