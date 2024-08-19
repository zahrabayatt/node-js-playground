// example: ^4.13.6

// in SemVer (semantic versioning), the version of the node package has three component, three number: Major.Minor.Patch

// Major: it's for bug fixes
// Minor: it's for new features that don't break the existing API
// Major: it's for new features that break break the existing API

// old version : 4.13.6
// new version with bug fixes: 4.13.7
// new version with minor changes: 4.14.0
// new version with major changes: 5.0.0

// the ^ is the Caret character and tell npm that we are interested in this package with major version 4 and if there is new minor or patch version, we interested in that package as well

// alternative syntax for ^4.13.6 is 4.x
// alternative syntax for ~4.13.6 is 4.13.x
// 4.13.6 means exact version
