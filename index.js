// Restful Services or Restful APIs:
// Most Applications follows the client-server architecture. the app itself is client or front-end and under the hood it needs to talks to server or backend to get or save data. this communication happened using HTTP protocol. the same protocol that powers the web. so on the server we expose a bunche of service that accessible via HTTP protocol then the client can directly call these services by sending HTTP requests. this is where REST comes to the picture. REST is short for Representational State Transfer. It's a convention to build these  serveries.
// we use simple HTTP protocol principle to provide support to Create, Read, Update, Delete Data, we refer to these operations all together as CRUD operations.

// example:
//we have a compony called VIDLY to renting out movies.we have a client app where we manage the list of customer.in the server we should expose a service and the endpoint like this:
// http://vidly.com/api/customers
// then client can send HTTP request to this endpoint to talk to our service

// the endpoint can start with http or https and that depends on application needs to be a requirement. if you want to be exchange on secure channel you would use https protocol.
// after that we have domain of application: vidly.com
// next we have /api is a conviction for api path
// after that we have /customers witch refers to collections of customers in our application in rest world we refer to this part as resource. we expose our resources such as customers, movies,... on various endpoints.
// all operations around the customers such as create, read, update, delete will be done by sending a HTTP request to this endpoint.
// the type of HTTP request determines kind of operation. so every http request has what we called a verb or method that determines its type or intention.
// here are the standard HTTP Methods:
// GET : getting data
// POST: creating data
// PUT: updating data
// DELETE: deleting data
