const log = (req, res, next) => {
  console.log("Logging...");
  next(); // To pass control to next middleware in pipeline
  // if we don't pass to next middleware or do not determine response, it makes request hang and stuck.
};

module.exports = log;
