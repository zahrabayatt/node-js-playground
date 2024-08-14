const url = "http://mylogger.io/log";

function log(message) {
  // Send an HTTP request
  console.log(message);
}

// export the function and variable
module.export.log = log;
// module.export.url = url; // this variable is implementation details and we don't need to export that!