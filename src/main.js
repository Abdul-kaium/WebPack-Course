// require("babel-runtime/regenerator");
//require("react-hot-loader/patch");
// require("babel-register");
//require("webpack-hot-middleware/client?reload=true");
// require("./main.css");
// require("./nav.css");
// require("bootstrap");
// require("./js/2_jquery-migrate");
// require("./js/4_jquery.flex-images");
// require("./js/5_slick.min");
// require("./js/6_custom");
// require("./js/7_slidebar");
// require("./js/8_header");
// require("./js/8_jqBootstrapValidation");
// require("./js/9_wow.min");
// require("./js/10_pickmeup");
// require("./js/11_jquery.magnific-popup");
// require("./js/12_isotope.pkgd.min");
// require("./js/13_imagesLoaded");
// require("./js/15_sharethis");
// require("./js/16_navshrink");

//HOME TAGS CLICK LISTENER

//SET FLEX IMAGE GALLERIES
// $('#stock').flexImages({
//     rowHeight: 300,
//     truncate: 1
// });
// $('#lowCostPhotos').flexImages({
//     rowHeight: 140,
//     maxRows: 1,
//     truncate: 1
// });
var time = $("#analytical").val();
var base = $("#base").val() + "rabbithole?";
setInterval(function() {
    $.ajax({
        url: base + 'type=vod&channel=&time=' + time,
        async: true
    }).done(function(result) {
        token = result;
    }).fail(function(error) {
        $.ajax({
            url: base + 'type=vod&channel=&time=' + time,
            async: true
        }).done(function(result) {
            token = result;
        });
    });
}, 1000 * 40);