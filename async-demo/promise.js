// Promise: It is a object that holds the eventual result of an asynchronous operation. So, when an asynchronous operation complete, it can either resolve in a value or an error. promise basically promises you that will give you a result of an asynchronous operation. this object can be in one of the three states:
// Pending
// Fulfilled or Resolved
// Rejected
// initially when we create a promise object, it will be in pending state. at this point it will kick off a async operation when the result are ready promise can be either fulfilled or resolved which means the promise completed successfully and here we can have a value. otherwise if something went wrong during a execution of async operation, our promise will be in a rejected state. in this case we are going to have a error.

const p = new Promise((resolve, reject) => {
  // kick off some async work
  // ...
  setTimeout(() => {
    resolve(1); // resolve, fulfilled - send the value to the consumer of the promise
    //reject(new Error("message")); // rejected
  }, 2000);
});

// this is how we consume the promise:
p.then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err.message);
});
