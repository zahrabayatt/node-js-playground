console.log("Before");
// getUser(1, (user) => {
//   console.log("User", user);
// });
getUser(1, (user) => {
  console.log("User", user);
  getRepositories(user.githubUsername, (repos) => {
    console.log("Repos", repos);
  });
});
console.log("After");

// the callback is a function to call when the result of asynchronous operation is ready!
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a use from a database...");
    callback({ id: id, githubUsername: "zahrabayatt" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log(`Getting ${username}'s repositories...`);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
