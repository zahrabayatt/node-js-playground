const mongoose = require("mongoose");

// Mongoose is a node package that gives us simple api to work with MongoDB database.

// how to connect to mongodb?
// we pass a connection string as input
mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err)); // use debug module to log in real time application

//The error you're encountering, MongooseServerSelectionError: connect ECONNREFUSED ::1:27017, suggests that Mongoose is trying to connect to MongoDB using the IPv6 address ::1 (localhost in IPv6), but the connection is being refused. This could be due to MongoDB not listening on the IPv6 address or not being properly configured.
// Here are a few steps you can try to resolve this:

// 1. Use IPv4 explicitly
// You can force Mongoose to connect using the IPv4 version of localhost(127.0.0.1) instead of relying on localhost, which may resolve to the IPv6 address(:: 1).

// 2. Ensure MongoDB is running
// You can check if MongoDB is running using the following steps:
// Press Windows + R, type services.msc, and hit Enter.
// In the Services window, scroll down to find MongoDB.
// Ensure the service is running. If not, right-click on MongoDB and select Start.
// Alternatively, you can open Command Prompt or PowerShell as Administrator and start MongoDB manually:
// net start MongoDB
