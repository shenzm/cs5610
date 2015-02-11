$(function () {
    $("#search-movie").click(function () {
        var urlPrefix = "http://www.myapifilms.com/imdb?format=JSONP&title="
        var title = $("#movie-name-input").val();
        var urlVar = urlPrefix + encodeURIComponent(title);
        var attributes = ["title", "rating", "plot"];
        $.ajax({
            url: urlVar,
            dataType: "jsonp",
            success: function (response) {
                $("#info-list").empty();
                $.each(response, function (i, r) {
                    var movieInfo = r;
                    $.each(attributes, function (j, a) {
                        var attrValue = movieInfo[a];
                        var attrObj = $("<li></li>");
                        attrObj.text(a + ": " + attrValue);
                        $("#info-list").append(attrObj);
                    });
                });
            }
        });
    });
})