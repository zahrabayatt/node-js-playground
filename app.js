const Logger = require("./logger"); // uppercase naming cause it's a class
const logger = new Logger();

// Register a listener
logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});

logger.log("message");

// output:
// message
// Listener called { id: 1, url: 'http://' }
