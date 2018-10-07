require("babel-runtime/regenerator");
require("react-hot-loader/patch");
require("babel-register");
require("webpack-hot-middleware/client?reload=true");
require("./main.css");
require("./index.html");
require("./app.js");
// alert("Loaded");

// var a = async args => {
//     const {
//         a,
//         b
//     } = args;
//     await console.log("Hello From The babel!");
//     console.log("Done");
// }
// debugger
// a({
//     a: 1,
//     b: 4
// });