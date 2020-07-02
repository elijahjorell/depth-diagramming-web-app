function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('app');
}

function draw() {
    background(34, 42, 53);
    cursorUpdateCoordinatesTranslated();
    cursorUpdateDetectedItems();
    cursorUpdateStyle();
    displayDrawItems();
}

function displayDrawItems() {
    for (i = 0; i < items.length; i++) {
        ellipse(items[i].coordinates.raw.x,
                items[i].coordinates.raw.y,
                items[i].dimensions.raw.r * 2);
    }
}

function displayStyleSelectedItem() {
    
}
