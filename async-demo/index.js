console.log("Before");

// with callbacks, our code will be end up like this if all functions are asynchronous, the syntax is nested and refers to this as callback hell:
getUser(1, (user) => {
  getRepositories(user.githubUsername, (repos) => {
    getCommies(repo, (commits) => {});
  });
});
console.log("After");

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
