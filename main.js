// Show Colour - GET
$( "#showColour" ).on('click', function() {

    let colorId = $('#colorId').val();

    $.ajax({
        type: 'GET',
        url: '/colours/' + colorId,
        success: function(data) {
            console.log('success', data);
            $('#colorId').val(data[0].colorId);
            $('#hexString').val(data[0].hexString);
            $('#rgb').val('rgb(' + data[0].rgb.r + ', ' + data[0].rgb.g + ', ' + data[0].rgb.b + ')');
            $('#hsl').val('hsl(' + data[0].hsl.h + ', ' + data[0].hsl.s + '%, ' + data[0].hsl.h + '%)');
            $('#name').val(data[0].name);
            $("#displayColour").css("background-color", data[0].hexString);

            $('#message').html('Displaying colour with ID ' + data[0].colorId);
        },
        error: function(xhr, status, error) {
            $('#message').html('Error: Colour with ID ' + colorId + ' was not found');
        }
    });
});

// Insert Colour - POST
$( "#insertColour" ).on('click', function() {

    let hexString = $('#hexString').val();
    let rgb = $('#rgb').val();
    let hsl = $('#hsl').val();
    let name = $('#name').val();

    // convert values to string
    let rgbString = String(rgb);
    let hslString = String(hsl);

    // extract numbers to array
    let rgbNumArr = rgbString.match(/\d+/g).map(Number);
    let hslNumArr = hslString.match(/\d+/g).map(Number);

    // change to object
    let rgbObj = {r:rgbNumArr[0], g:rgbNumArr[1], b:rgbNumArr[2]};
    let hslObj = {h:hslNumArr[0], s:hslNumArr[1], l:hslNumArr[2]};
    
    // object for api
    newColour = {
        hexString: hexString,
        rgb: rgbObj,
        hsl: hslObj,
        name: name
    };

    $.ajax({
        type: 'POST',
        url: '/colours/',
        data: JSON.stringify(newColour),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            $('#colorId').val(data.colorId);
            $('#hexString').val(data.hexString);
            $('#rgb').val('rgb(' + data.rgb.r + ', ' + data.rgb.g + ', ' + data.rgb.b + ')');
            $('#hsl').val('hsl(' + data.hsl.h + ', ' + data.hsl.s + '%, ' + data.hsl.h + '%)');
            $('#name').val(data.name);
            $("#displayColour").css("background-color", data.hexString);

            $('#message').html('Colour inserted successfully');
        }
    });
});

// Remove Colour - DELETE
$( "#removeColour" ).on('click', function() {

    let colorId = $('#colorId').val();

    $.ajax({
        type: 'DELETE',
        url: '/colours/' + colorId,
        success: function(data) {
            $('#message').html('Colour with ID ' + colorId + ' was deleted');
        },
        error: function(xhr, status, error) {
            $('#message').html('Error: Colour with ID ' + colorId + ' was not found');
        }
    });
});

// Modify Colour - PUT
$( "#modifyColour" ).on('click', function() {

    let colorId = $('#colorId').val();
    let hexString = $('#hexString').val();
    let rgb = $('#rgb').val();
    let hsl = $('#hsl').val();
    let name = $('#name').val();

    // convert values to string
    let rgbString = String(rgb);
    let hslString = String(hsl);

    // extract numbers to array
    let rgbNumArr = rgbString.match(/\d+/g).map(Number);
    let hslNumArr = hslString.match(/\d+/g).map(Number);

    // change to object
    let rgbObj = {r:rgbNumArr[0], g:rgbNumArr[1], b:rgbNumArr[2]};
    let hslObj = {h:hslNumArr[0], s:hslNumArr[1], l:hslNumArr[2]};
    
    // object for api
    modifiedColour = {
        hexString: hexString,
        rgb: rgbObj,
        hsl: hslObj,
        name: name
    };

    $.ajax({
        type: 'PUT',
        url: '/colours/' + colorId,
        data: JSON.stringify(modifiedColour),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            $('#colorId').val(data.colorId);
            $('#hexString').val(data.hexString);
            $('#rgb').val('rgb(' + data.rgb.r + ', ' + data.rgb.g + ', ' + data.rgb.b + ')');
            $('#hsl').val('hsl(' + data.hsl.h + ', ' + data.hsl.s + '%, ' + data.hsl.h + '%)');
            $('#name').val(data.name);
            $("#displayColour").css("background-color", data.hexString);

            $('#message').html('Colour with ID ' + colorId + ' was modified');
        }
    });
});

$( "#selectBackground" ).on('click', function() {

    let backgroundColour = $('#hexString').val();

    document.cookie = "backgroundColour=" + backgroundColour;

    $("body").css("background-color", backgroundColour);

});

$( window ).on("load", function() {
    // if cookie exists then set background colour
    let backgroundColour = getCookie("backgroundColour");

    if (backgroundColour != "") {
        $("body").css("background-color", backgroundColour);
    }
});

// source: https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}