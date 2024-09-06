const p = Promise.resolve({ id: 1 }); // return a promise that already resolved!

p.then((result) => console.log(result));

// for best practice always pass a Error object then it will include call stack!
const p1 = Promise.reject(new Error("reason for refection...")); // return a promise that already rejected!

p1.catch((err) => console.log(err));
