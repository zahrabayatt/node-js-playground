const genres = require("./routes/genres");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// So far we have stored the list of genre in an array in memory, this not how we build real world application because when server restarted we are going to lose all data in the memory, so that's why we need to store all data in the database.

// What is MOngoDB?
// https://www.mongodb.com/
// https://www.w3schools.com/mongodb/

// MongoDB is a document database or no-sql database. It's different form traditional relational databases like sql server or my sql,.. so in MongoDB we don't have concepts like tables, schema, views, record, column,... so unlike relational databases where you have to design your database ahead of time, in MongoDB there is no such thing like that and you simply store your json object in MongoDB. this also means when we querying MongoDB database we got a json object and we simply return that object back to the client and there is no transformation.
