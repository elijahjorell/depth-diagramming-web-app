function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('app');
    coordinatesUpdateOrigin();
}

function draw() {
    translate(coordinatesOrigin.x, coordinatesOrigin.y);
    cursorUpdateCoordinatesReal();
    cursorUpdateDetectedItemsID();
    cursorUpdateDetectedFrontItemID();
    cursorUpdateStyle();
    panOn();
    commandsSelectAreaOn();
    commandsGrabOn();
    canvasDrawBackground()
    canvasDrawItems();
    canvasDrawSelectArea();
    cursorUpdatePreviousCoordinate();
}

function canvasDrawBackground() {
    background(255);
    noStroke();
    fill(34, 42, 53)
    rect(-windowWidth/2, - windowHeight/2, windowWidth, windowHeight)
}

function canvasDrawItems() {
    for (i = 0; i < items.length; i++) {
        // ring
        if (cursorDetectedFrontItemID === items[i].id) {
            stroke(255, 230, 153);
        } else {
            stroke(180, 199, 231);
        }
        fill(255, 0);
        ellipse(items[i].coordinates.real.x,
                items[i].coordinates.real.y,
                items[i].dimensions.real.r * 2 + 20);
        
        // circle
        noStroke();
        if (commandsSelectAreaDetectedItems.includes(items[i].id) || 
            itemsSelected.includes(items[i].id)) {
            fill(255, 230, 153,);
        } else {
            fill(255);
        }
        ellipse(items[i].coordinates.real.x,
                items[i].coordinates.real.y,
                items[i].dimensions.real.r * 2);

        // text
        fill(0);
        textSize(18);
        text(items[i].name, 
             items[i].coordinates.real.x - textWidth(items[i].name)/2,
             items[i].coordinates.real.y + textAscent(items[i].name)/2);

        // stroke(0);
        // line(items[i].coordinates.real.x - items[i].dimensions.real.r,
        //      items[i].coordinates.real.y,
        //      items[i].coordinates.real.x + items[i].dimensions.real.r,
        //      items[i].coordinates.real.y)
    }
}

function canvasDrawSelectArea() {
    if (commandsSelectAreaOriginCoordinate !== undefined) {
        stroke(255);
        fill(255, 120);
        rect(commandsSelectAreaTopLeftCoordinate.x, commandsSelectAreaTopLeftCoordinate.y, commandsSelectAreaDimensions.w, commandsSelectAreaDimensions.h);
    }
}