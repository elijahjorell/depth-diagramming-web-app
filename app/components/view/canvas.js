function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('app');
    coordinatesUpdateOrigin();
}

function draw() {
    translate(coordinatesOrigin.x, coordinatesOrigin.y);
    background(34, 42, 53);
    cursorUpdateCoordinatesReal();
    cursorUpdateDetectedItems();
    cursorUpdateStyle();
    screenPanOn();
    commandsSelectAreaOn();
    commandsGrabOn();
    canvasDrawItems();
    canvasDrawSelectArea();
    cursorUpdatePreviousCoordinate();
}

function canvasDrawItems() {
    for (i = 0; i < items.length; i++) {
        // ring
        stroke(180, 199, 231);
        fill(255, 0);
        ellipse(items[i].coordinates.real.x,
                items[i].coordinates.real.y,
                items[i].dimensions.real.r * 2 + 20);
        
        // circle
        noStroke();
        if (commandsSelectAreaDetectedItems.includes(items[i].id)) {
            fill('pink');
        } else if (itemsSelected.includes(items[i].id)) {
            fill('red');
        } else {
            fill(255);
        }
        ellipse(items[i].coordinates.real.x,
                items[i].coordinates.real.y,
                items[i].dimensions.real.r * 2);
    }
}

function canvasDrawSelectArea() {
    if (commandsSelectAreaOriginCoordinate !== undefined) {
        stroke(255);
        fill(255, 120);
        rect(commandsSelectAreaTopLeftCoordinate.x, commandsSelectAreaTopLeftCoordinate.y, commandsSelectAreaDimensions.w, commandsSelectAreaDimensions.h);
    }
}