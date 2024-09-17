const genres = require("./routes/genres");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Download MongoDB: https://www.mongodb.com/try/download/community
// install MongoDB Compass

// find the path of mongod : C:\Program Files\MongoDB\Server\7.0\bin add it as path in system variable in environment variables.

// run mongod command in cmd to check if installed successfully. if you see this error: "NonExistentPath: Data directory C:\\data\\db\\ not found. Create the missing directory or specify another path using, run this command md c:\data\db
// mongod
// md c:\data\db

// open MongoDB Compass, create a localhost connection with default config.
