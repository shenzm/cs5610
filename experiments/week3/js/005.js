$(document).ready(function () {
    $("#flip").click(function () {
        $("#panel").slideToggle(500);
    });
    $("#stop").click(function () {
        $("#panel").stop();
    });
});