require("babel-runtime/regenerator");
require("webpack-hot-middleware/client?reload=true");
require("./main.css");
require("./index.html");

alert("Loaded");

var a = async args => {
    const { a, b } = args;
    await console.log("Hello From The babel!");
    console.log("Done");
}

a({ a: 1, b: 4 });