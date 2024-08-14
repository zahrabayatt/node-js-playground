// Node js is an open source and cross platform runtime environment for executing JavaScript Code outside of a browser.

// Before Node we use JS only to build applications that run inside of a browser so every browser out there has what we call a JS engine that takes our JS code and converts it to code that a computer can understand for example:
// Microsoft edge uses Chakra as JS engin
// Firefox uses SpiderMonkey as JS engin
// Chrome uses v8 as JS engin
// and because of these varieties of engines that sometimes JS code can behave differently in one browse or another.

// A browser provide a runtime environment for JS code for example in browsers we have the window or the document object, these objects allow us to work with the environment in witch our code is running.

// Up to 2009 the only way to execute JS code was inside of a browser in 2009 Brian Dahl, the creator of Node, came with a brilliant idea he thought it would be great to execute JS outside of a browser so he took Google's v8 engine witch is the fastest JS out there and emended it inside a C++ program and called that program Node.

//so similar to a browser node is a runtime environment for JS code.Node contains a JS engin that can execute our JS code but it also has certain objects that provide an environment for our JS code but these object are different form the environment objects that we have in browsers for example we don't have the document object instead we have other objects that give us more interesting capabilities for example:
// fs.readFile() - we can work with file system
// http.createServer() - listen for requests and a given port,...
// we can't do stuff like that inside of a browser.

//  In essence node is a program that includes the v8 JS engine plus some additional modules that give us capabilities not available inside browsers like we can work with the file system or the network and ...

// Both chrome and Node share same JS engin but they provide different runtime environments for JS.

// Node is not a programming language!
// Node is not a framework!
// Node is a runtime environment for executing JS code!
