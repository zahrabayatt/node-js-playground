// In the client-side of JS that we run inside of browsers when we declare a variable or a function that is added to the global scope for example:

// var sayHello = function () {};

// window.sayHello();

// There is a problem with this behavior! in a real world application we often split our JS code into multiple files so it is possible that we have two files and in both these files we define this function,sayHello, with the exact same name and because this function added to the global scopes when we define this function in another file that new definition is going to overwrite the previous definition. this is the problem with the global scope so in order to build reliable and maintainable applications, we should avoid defining variables and functions in the global scope instead we need modularity! we need to create small building blocks or modules where we define our variables and functions.

// at the core of node we have this concept called module. every file in the node application is considered a module. the variables and functions that define in that file or that module are scoped to that module.

// in object - oriented programming say we say they are private, they are not available outside of that container.

// if you want to use a variable or function defined in a the module, you need to explicitly export it and make it public.

// every node application has at least one file or module that we call a min module.

console.log(module); // module is not a global object!

// module object is a json object with key-value pairs.
