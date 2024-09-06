// async with callbacks:

console.log("Before");
getUser(1, (user) => {
  getRepositories(user.githubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    });
  });
});

console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a use from a database...");
    callback({ id: id, githubUsername: "zahrabayatt" });
  }, 2000);
}

function getRepositories(username) {
  setTimeout(() => {
    console.log(`Getting ${username}'s repositories...`);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log(`Getting ${repo}'s commits...`);
    callback(["commit"]);
  }, 2000);
}

// async with Promises:

console.log("Before");

getUser(1).then((user) => {
  getRepositories(user.githubUsername).then((repos) => {
    getCommits(repos[0]).then((commits) => {
      console.log(commits);
    });
  });
});

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a use from a database...");
      resolve({ id: id, githubUsername: "zahrabayatt" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Getting ${username}'s repositories...`);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Getting ${repo}'s commits...`);
      resolve(["commit"]);
    }, 2000);
  });
}
