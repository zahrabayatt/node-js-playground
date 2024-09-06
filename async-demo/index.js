console.log("Before");
const user = getUser(1);
console.log(user); // undefined - when we calling getUser(1), the function callback that we sent to setTimeout doesn't call at the time we calling getUser(1), so the value that this callback function returns it is not available! It will call 2 seconds after in the future.
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a use from a database...");
    return { id: id, githubUsername: "zahrabayatt" };
  }, 2000);
}

// How to access to the user that getUser function returns?
// There is three patterns for dealing with asynchronous cod:
// Callbacks
// Promises
// Async/await - which is a syntax sugar over the promises
