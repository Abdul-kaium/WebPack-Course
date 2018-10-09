require("babel-runtime/regenerator");
require("webpack-hot-middleware/client?reload=true");
require("react-hot-loader/patch");
require("babel-register");
require("bootstrap");
require("./home.scss");
require("./tab.css");
require("./home.html");

$(document).ready(function() {
    $("#hide").click(function() {
        $("p").hide();
    });
    $("#show").click(function() {
        $("p").show();
    });

    $("#flip").click(function() {
        $("#panel").slideDown("slow");
    });
});