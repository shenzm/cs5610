function runAnimation() {
    startAnimation();
    setTimeout(changeColor, 0, "lightblue");
    setTimeout(changeColor, 1000, "lightseagreen");
    setTimeout(changeColor, 2000, "lightpink");
    setTimeout(changeColor, 3000, "lightsalmon");
    setTimeout(changeColor, 4000, "white");
    setTimeout(endAnimation, 4000);
}

function changeColor(newColor) {
    var obj = document.getElementById("object");
    obj.style.backgroundColor = newColor;
}

function startAnimation() {
    var obj = document.getElementById("object");
    obj.innerHTML = "Start";
}

function endAnimation() {
    var obj = document.getElementById("object");
    obj.innerHTML = "End";
}

function changeSize() {
    var sizeDisplay = document.getElementById("size-display");
    var obj = document.getElementById("object");
    var sizeRange = document.getElementById("size-range");
    var size = sizeRange.value;
    sizeDisplay.innerHTML = size + "px";
    obj.style.width = size + "px";
    obj.style.height = (size / 2) + "px";
}