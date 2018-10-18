// require("babel-runtime/regenerator");
//require("react-hot-loader/patch");
// require("babel-register");
//require("webpack-hot-middleware/client?reload=true");
// require("./main.css");
// require("./nav.css");
require("bootstrap");
require("./js/2_jquery-migrate");
require("./js/4_jquery.flex-images");
require("./js/5_slick.min");
require("./js/6_custom");
require("./js/7_slidebar");
require("./js/8_header");
require("./js/8_jqBootstrapValidation");
require("./js/9_wow.min");
require("./js/10_pickmeup");
require("./js/11_jquery.magnific-popup");
require("./js/12_isotope.pkgd.min");
require("./js/13_imagesLoaded");
require("./js/15_sharethis");
require("./js/16_navshrink");

//HOME TAGS CLICK LISTENER
$('#trendingTab a').on('click', function(e) {
    //PREVENT DEFAULT
    e.preventDefault();
    //REMOVE HIGHLIGHT FROM PREVIOUS TAB
    $('#trendingTab a').removeClass("current");
    //HIGHLIGHT SELECTED TAB
    $(this).addClass("current");
    var firstHomeTag = 29;
    var stockImages = [];
    //IF FIRST TAB IS CLICKED, NO NEED TO INVOKE AJAX
    if (e.target.id == firstHomeTag) {
        stockImages = [{ "id": "54", "width": "1280", "height": "800", "original_image": "1516100800744_XB9A9YB0LY.jpg" }, { "id": "76", "width": "1000", "height": "1280", "original_image": "1516100809696_W3GPN83LL3.jpg" }, { "id": "96", "width": "1280", "height": "870", "original_image": "1516100813721_RK49WYSNXP.jpg" }, { "id": "90", "width": "720", "height": "1280", "original_image": "1516100817373_2S1ZWMLO3X.jpg" }, { "id": "91", "width": "1280", "height": "960", "original_image": "1516100818304_OXXM3USLBU.jpg" }, { "id": "104", "width": "1280", "height": "853", "original_image": "1516100820846_TWI7H3W3PD.jpg" }, { "id": "107", "width": "1280", "height": "847", "original_image": "1516100820034_YAZZFJMVBJ.jpg" }, { "id": "112", "width": "1280", "height": "860", "original_image": "1516100821221_ZF96DG7FFB.jpg" }, { "id": "116", "width": "1280", "height": "762", "original_image": "1516100822098_JA0N49JPJR.jpg" }, { "id": "93", "width": "1280", "height": "853", "original_image": "1516100810264_F08PESKD6L.jpg" }, { "id": "100", "width": "1280", "height": "853", "original_image": "1516100809876_S2031R4JY3.jpg" }];
    } else {
        //FETCH IMAGES FOR SELECTED TAG
        $.ajax({
            url: "https://www.fotoboss.io/photos/homeImagesForTag/" + e.target.id + "/true",
            dataType: "json",
            async: false,
            success: function(data) {
                stockImages = data.images;
            },
        });
    }

    //CLEAR STOCK GALLERY
    $('#stock').children().remove();
    //POPULATE STOCK GALLERY WITH NEW IMAGES
    for (var i = 0; i < stockImages.length; i++) {
        $('#stock').append('<div class="item" data-w="' + stockImages[i].width + '" data-h="' + stockImages[i].height + '">' +
            '<a href="https://www.fotoboss.io/photos/details/' + stockImages[i].id + '">' +
            '<img src="https://www.fotoboss.io/assets/images/blank.gif" data-src="https://fotoboss.nyc3.digitaloceanspaces.com/thumb_' + stockImages[i].original_image + '"/>' +
            '</a></div>');
    }
    //RESET FLEX LIBRARY
    $('#stock').flexImages({ rowHeight: 300, truncate: 1 });




});


//SET FLEX IMAGE GALLERIES
$('#stock').flexImages({ rowHeight: 300, truncate: 1 });
$('#lowCostPhotos').flexImages({ rowHeight: 140, maxRows: 1, truncate: 1 });

//AUTO COMPLETE EVENT LISTENER FOR SEARCH INPUT BOX
var searchLeads;
$("#searchInput_txt").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "https://www.fotoboss.io/photos/genSearchLeads/" + document.getElementById('searchInput_txt').value,
            dataType: "json",
            success: function(data) {
                searchLeads = data;
                $("#searchInput_val").val('none');
                response(data);
            },
        });
    },
    minLength: 2,
    autoFocus: false,
    select: function(event, ui) {
        event.preventDefault();
        $("#searchInput_txt").val(ui.item.label);
        $("#searchInput_val").val(ui.item.value);
    },
    focus: function(event, ui) {
        event.preventDefault();
        $("#searchInput_txt").val(ui.item.label);
        $("#searchInput_val").val(ui.item.value);
    }
});
$("#searchInput_txt").keydown(function(event) {
    if (event.keyCode == 13) {
        var userInput = document.getElementById('searchInput_txt').value;
        for (var obj in searchLeads) {
            if (searchLeads[obj].label == userInput) {
                //alert('matched with: '+searchLeads[obj].label+"--"+searchLeads[obj].value);
                $("#searchInput_txt").val(userInput);
                $("#searchInput_val").val(searchLeads[obj].value);
                break;
            }
        }
        event.preventDefault();
        $("#searchBoxForm").submit();
    }
});

var myIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
        myIndex = 1;
    }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 5000);
}

$('#reply-form').submit(function(event) {
    var formData = {
        'name': $('input[name=name]').val(),
        'email': $('input[name=email]').val(),
    };

    $.ajax({
        type: 'POST',
        url: "https://www.fotoboss.io/photos/subscribe",
        data: formData,
        dataType: 'json',
        encode: true,
        complete: function(data) {
            var response = data.responseJSON;
            switch (response.status) {
                case 1:
                    $('#subDiv').append('<div class="alert alert-info subAlert">' + 'Duplicate Email Address' + '</div>');
                    $('.subAlert').fadeOut(5000);
                    break;
                case 2:
                    $('#subDiv').append('<div class="alert alert-success subAlert">' + 'Subscription Successful' + '</div>');
                    $('.subAlert').fadeOut(5000);
                    break;
                case 3:
                    $('#subDiv').append('<div class="alert alert-warning subAlert">' + 'Something Went Wrong' + '</div>');
                    $('.subAlert').fadeOut(5000);
                    break;
            }
        }
    });
    event.preventDefault();
});

$(document).on('ready', function() {
    $(".lazy").slick({
        lazyLoad: 'ondemand',
        infinite: true,
        dots: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 3000,
        variableWidth: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    variableWidth: false,
                    centerMode: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                    centerMode: true,
                }
            },
        ],
    });

});

//$(document).ready(function() {

//This is view portion height
var windowHeight = $(window).height();
//console.log(windowHeight);


//Original height of the body
var docHeight = $(document).height();
//console.log(docHeight);

//height of footer
var footerHeight = $('.footer-bottom').height();
//console.log(footerHeight);

if ((docHeight - footerHeight) == (windowHeight - footerHeight)) {
    $('.footer-bottom').css('position', 'absolute');
}



var globalSearchLeads = [];

$("#globalSearchInput_txt").autocomplete({
    appendTo: "#globalSearchSuggestion",

    source: function(request, response) {

        $.ajax({

            url: "https://www.fotoboss.io/photos/genSearchLeads/" + document.getElementById('globalSearchInput_txt').value,

            dataType: "json",

            success: function(data) {

                globalSearchLeads = data;

                $("#globalSearchInput_val").val('none');

                response(data);

            },

        });

    },

    minLength: 2,

    autoFocus: false,

    select: function(event, ui) {

        event.preventDefault();

        $("#globalSearchInput_txt").val(ui.item.label);

        $("#globalSearchInput_val").val(ui.item.value);

    },

    focus: function(event, ui) {

        event.preventDefault();

        $("#globalSearchInput_txt").val(ui.item.label);

        $("#globalSearchInput_val").val(ui.item.value);

    }

});

$("#globalSearchInput_txt").keydown(function(event) {

    if (event.keyCode == 13) {

        var userInput = document.getElementById('globalSearchInput_txt').value;

        for (var obj in globalSearchLeads) {

            if (globalSearchLeads[obj].label == userInput) {

                //alert('matched with: '+globalSearchLeads[obj].label+"--"+globalSearchLeads[obj].value);

                $("#globalSearchInput_txt").val(userInput);

                $("#globalSearchInput_val").val(globalSearchLeads[obj].value);

                break;

            }

        }

        event.preventDefault();

        $("#globalSearchBoxForm").submit();

    }

});