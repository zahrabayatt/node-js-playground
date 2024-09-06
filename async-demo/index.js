// Synchronous programming:
console.log("Before");
console.log("After");

// Asynchronous programming:
// First the Before and After print in terminal and then after 2 seconds the callback function in Timeout will executed!

console.log("Before");
// This function is a example of asynchronous or non-blocking function. when we call this function, it will schedule to perform this task in the future. It doesn't block and wait it just create a schedule in feature.
setTimeout(() => {
  console.log("Reading a use from a database...");
}, 2000);
console.log("After");

// Asynchronous doesn't mean concurrent or multiple threads. In this application we have a single thread!, so this thread first log two messages and then when it will free it will perform schedule task witch means wait two seconds and then log a message.
