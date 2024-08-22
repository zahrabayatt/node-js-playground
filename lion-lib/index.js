module.exports.add = (a, b) => a + b;
module.exports.multiply = (a, b) => a * b;

// to update a published package we can manually update the version in package.json and run npm publish
// Or run this command:
// npm version major --> if it's a major update
// npm version minor --> if it's a minor update
// npm version patch --> if it's a patch update

// in this example it is a minor update

// after that we can publish the updated package:
// npm publish
