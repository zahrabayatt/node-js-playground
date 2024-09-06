const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 1....");
    resolve(1);
    //reject(new Error("something went wrong..."));
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2....");
    resolve(2);
  }, 2000);
});

// it's not real concurrency and it's a single thread that kicks off multi promises almost in the same time, it's not exactly in the same time and it release promise in order but it's not waiting for result of each promise result.

// the results of promises will return as a array.

// if any of the promise get rejected, the final promise that Promise.all() return , it will considered as rejected!

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

// If you want to kick off multiple async operations but you want to do something as soon as first operation complete.

// the result is the first promise's value that is fulfilled.

Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
