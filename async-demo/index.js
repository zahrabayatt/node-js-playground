console.log("Before");

// Promise-based approach
// getUser(1)
//   .then((user) => getRepositories(user.githubUsername))
//   .then((repos) => getCommits(repos[0]))
//   .then((commits) => console.log(commits))
//   .catch((err) => console.log("Error", err.message));

// Async and Await approach

async function displayCommits() {
  try {
    const user = await getUser(1);
    const repo = await getRepositories(user.githubUsername);
    const commit = await getCommits(repo[0]);
    console.log(commit);
  } catch (err) {
    console.log("Error", err.message);
  }
}

displayCommits();

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, githubUsername: "zahrabayatt" });
      // reject(new Error("Couldn't get the user "));
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
