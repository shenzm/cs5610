$(function () {
    $("#addParagraph").click(function () {
        addParagraph("Default Paragraph (Edit this)", 10, 10);
    });
    $("#save").click(function () {
        saveParagraph();
    });
    $("#load").click(function () {
        loadParagraph();
    });
    $("#clear").click(function () {
        clearParagraph()
    });
})

function addParagraph(text, x, y) {
    var newParagraph = $("<p contenteditable=true></p>");
    newParagraph
        .html(text)
        .draggable({ grid: [10, 10] })
        .css({
            "position": "relative",
            "left": x,
            "top": y
        });
    $("#content").append(newParagraph);
}

function saveParagraph() {
    var allParagraphs = $("#content p");
    var paragraphs = [];
    allParagraphs.each(function (index, item) {
        basePos = $("#content").position()
        var pObj = {
            text: $(item).text(),
            x: $(item).position().left - basePos.left,
            y: $(item).position().top - basePos.top
        }
        paragraphs.push(pObj);
    });
    var pStr = JSON.stringify(paragraphs);
    console.log(pStr);
    localStorage.setItem("page", pStr);
}

function loadParagraph() {
    var pStr = localStorage.getItem("page");
    if (pStr == null)
        alert("Nothing stored");
    paragraphs = JSON.parse(pStr);
    for (var i in paragraphs) {
        var p = paragraphs[i];
        var text = p.text;
        var x = p.x;
        var y = p.y;
        addParagraph(text, x, y);
    }
}

function clearParagraph() {
    localStorage.removeItem("page");
    $("#content").html("");
}