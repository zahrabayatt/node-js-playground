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

// JWT docs: https://jwt.io/#debugger-io

// JWT (JSON Web Token) is a compact, secure way to transmit information between two parties, such as a server and a client.

//It contains three parts:
// header
// payload
// signature

// The header specifies the token type and algorithm, the payload holds the data(like user details), and the signature ensures that the token hasn’t been tampered with.JWTs are often used for authentication, where a server issues a token to a user, and the user includes it in requests to prove their identity.

//In the JWT payload, we send data (also called "claims") that is needed by the server to identify the user or control access. This can include:

// User Information: Like user ID, username, or email, to recognize the authenticated user.
// Expiration Time (exp): To specify when the token will expire, improving security by limiting its validity.
// Issued At (iat): To indicate when the token was created.
// Roles/Permissions: To define what actions the user is allowed to perform.
// Custom Claims: Any additional information needed for the application.

// We do this to avoid sending sensitive data like passwords in every request. The payload allows the server to quickly verify the user's identity and access level without needing to check the database on each request.

// In the JWT payload, we include data like the user's ID, roles, and token expiration time. This way, the server can verify who the user is and what they’re allowed to do without needing to make a request to the database for every action. It saves time and resources, allowing for faster, more efficient communication between the client and server.

// Even if someone has a JWT and can decode the payload, they still can't change it and make the server accept it. This is because the signature is built using a secret key and is based on the content of the payload. If someone tries to modify the payload, the signature won't match anymore. Since only the server knows the secret key, it will detect the change and reject the token. This ensures the token's integrity and prevents tampering.
