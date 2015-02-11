$(function () {

    $("#tag-box-2 > ul").sortable({
        placeholder: "sortable-placeholder"
    });

    $("#tag-box-2 > ul").droppable({
        drop: function () {
            $("#tag-box-2 > ul > #placeholder").remove()
        }
    });

    $("#tag-box-1 > ul > li").draggable({
        opacity: 0.35,
        connectToSortable: "#tag-box-2 > ul",
        addClasses: false
    });

    $("#tag-add").click(function () {
        var text = $("#tag-input").val();
        addTag(text);
    });
});

function addTag(text) {
    var tagList = $("#tag-box-1 > ul");
    var tagObj = $("<li></li>");
    tagObj.html(text).addClass("tag");
    tagObj.draggable({
        connectToSortable: "#tag-box-2 > ul",
        addClasses: false
    })
    tagList.append(tagObj);
}