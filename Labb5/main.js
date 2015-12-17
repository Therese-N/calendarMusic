/*Skapad av Therese Nyberg 2015-12-15*/

var dueDate = document.querySelector(".checked");
var year = document.querySelector(".year");
var month = document.querySelector(".month");
var day = document.querySelector(".day");

$(document).ready(function() {
    year.focus();
});

$(":button").click(function () {
   
    var firstName = "";
    var address = "http://api.dryg.net/dagar/v2.1/" + year.value + "/" + month.value + "/" + day.value;
    
    function getDateFunc(address) {
        $.getJSON(address, function(data) {
            dueDate.innerHTML = "";
            $.each(data.dagar, function(index, value) {
                firstName = value.namnsdag[0];
                $.each(value, function(index, value) {
                    index = index.substring(0, 1).toUpperCase() + index.substring(1, index.length);
                    dueDate.innerHTML += index + ": " + value + "<br/>";
                });
            });
        }).error(function() {
            address = "http://api.dryg.net/dagar/v2.1/" + (new Date).getFullYear() + "/" + ((new Date).getMonth() + 1) + "/" + (new Date).getDate();
            alert("Du har angivit ett felaktigt datum\n" + year.value + "/" + month.value + "/" + day.value + " är inte ett korrekt format");
            getDateFunc(address);
        }).success(function() {
            getSong(firstName);
            year.focus();
            year.value = "";
            month.value = "";
            day.value = "";
        });
    }
    getDateFunc(address);
});

function getSong(name) {
    var funSong = "https://api.spotify.com/v1/search?q=" + name + "&type=track";
    $.getJSON(funSong, function (data) {
        $(".song").attr("href", "");
        $(".song").text("");
        var num = Math.floor(Math.random()*20);
        $("p").css("visibility", "visible");
        $(".song").attr("href", data.tracks.items[num].external_urls.spotify);
        $(".song").append(data.tracks.items[num].external_urls.spotify);
    });
};


