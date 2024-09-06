console.log("Before");
getUser(1, (user) => {
  getRepositories(user.githubUsername, (repos) => {
    getCommies(repos, (commits) => {});
  });
});

getUser(1, getRepositories);

console.log("After");
function getRepositories(user) {
  getRepositories(user.githubUsername, getCommies);
}

function getCommies(repos) {
  getCommies(repos, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

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
