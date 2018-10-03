require("./main.css");
require("./index.html");
alert("loaded New");

var a = async() => {
    await console.log("Hello From The babel!");
    console.log("Done");
}