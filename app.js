// Built-in modules and global objects in node js: https://nodejs.org/docs/latest/api/

// this file is a Common Js module!

// Events module docs: https://nodejs.org/docs/latest/api/events.html

// Event is signal that indicates that something has happened in our application.

// emit means make a noise or produce something!

const EventEmitter = require("node:events"); // the naming is uppercase because it's a class not function or simple variable!

// class is a container for a bunch of related methods and properties.

const emitter = new EventEmitter(); // emitter is a object.

// Register a Listener - receive event argument
emitter.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});

// Raise a Event with event argument
emitter.emit("messageLogged", { id: 1, url: "http://" });
