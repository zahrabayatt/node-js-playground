const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const debug = require("debug")("app:startup");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses); // add route
app.use("/", home);

async function generateJWT() {
  // first parameter is payload which could be a simple string or a object.
  // second parameter is a secret which is jwt private key. you should not hard code it and put it in environment variables.
  const token = jwt.sign({ id: "userId" }, "jwtPrivateKey");
  console.log(token);
}

generateJWT();

// we have various libraries working with jwt for different platforms:

// Here’s a quick overview of JSON Web Token (JWT) libraries for different platforms, used for signing, verifying, and decoding tokens:

// 1. Node.js
// jsonwebtoken: The most popular library for working with JWTs in Node.js. It allows you to sign and verify tokens easily.
// Install: npm install jsonwebtoken

// 2. Python
// PyJWT: A widely-used library for handling JWT in Python. It supports both token encoding (signing) and decoding (verification).
// Install: pip install PyJWT

// 3. C# (.NET)
// System.IdentityModel.Tokens.Jwt: A built-in library in .NET for working with JWT. It's part of Microsoft's identity and security framework.
// Install: dotnet add package System.IdentityModel.Tokens.Jwt

// 4. Java
// jjwt: A simple JWT library for Java that supports token creation and validation.
// Install: Add Maven dependency:

// 5. Ruby
// jwt: A popular library for encoding and decoding JWTs in Ruby.
// Install: gem install jwt

// 6. PHP
// firebase/php-jwt: A widely-used PHP library for working with JWT tokens.
// Install: composer require firebase/php-jwt

// Each of these libraries helps developers securely manage user authentication and authorization across different platforms using JWTs.
