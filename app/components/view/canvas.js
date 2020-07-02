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
    itemsUpdateGrabbedItemsCoordinates();
    canvasDrawItems();
    canvasDrawAreaSelector();
}

function canvasDrawItems() {
    for (i = 0; i < items.length; i++) {
        
        // ring
        stroke(180, 199, 231);
        fill(255, 0);
        ellipse(items[i].coordinates.real.x,
                items[i].coordinates.real.y,
                items[i].dimensions.real.r * 2);
        
        
        // inner circle
        noStroke();

        if (itemsSelected.includes(items[i].id)) {
            fill('red');
        } else {
            fill(255);
        }

        ellipse(items[i].coordinates.real.x,
                items[i].coordinates.real.y,
                items[i].dimensions.real.r * 2 - 20);
        



    }
}

function canvasDrawAreaSelector() {
    if (commandsAreaSelectReferenceCoordinate !== undefined) {
        var areaSelectorCoordinate;
        var areaSelectorDimensions;
        if (cursorCoordinatesReal.y < commandsAreaSelectReferenceCoordinate.y) {
            if (cursorCoordinatesReal.x < commandsAreaSelectReferenceCoordinate.x) {
            // TOP LEFT QUADRANT
                areaSelectorCoordinate = {
                    x: cursorCoordinatesReal.x,
                    y: cursorCoordinatesReal.y
                }
                areaSelectorDimensions = {
                    w: commandsAreaSelectReferenceCoordinate.x - cursorCoordinatesReal.x,
                    h: commandsAreaSelectReferenceCoordinate.y - cursorCoordinatesReal.y
                }
            } else {
            // TOP RIGHT QUADRANT
                areaSelectorCoordinate = {
                    x: commandsAreaSelectReferenceCoordinate.x,
                    y: cursorCoordinatesReal.y
                }
                areaSelectorDimensions = {
                    w: cursorCoordinatesReal.x - commandsAreaSelectReferenceCoordinate.x,
                    h: commandsAreaSelectReferenceCoordinate.y - cursorCoordinatesReal.y
                }
            }
        } else {
            if (cursorCoordinatesReal.x < commandsAreaSelectReferenceCoordinate.x) {
            // BOTTOM LEFT QUADRANT
                areaSelectorCoordinate = {
                    x: cursorCoordinatesReal.x,
                    y: commandsAreaSelectReferenceCoordinate.y
                }
                areaSelectorDimensions = {
                    w: commandsAreaSelectReferenceCoordinate.x - cursorCoordinatesReal.x,
                    h: cursorCoordinatesReal.y - commandsAreaSelectReferenceCoordinate.y
                }
            } else {
            // BOTTOM RIGHT QUADRANT
                areaSelectorCoordinate = {
                    x: commandsAreaSelectReferenceCoordinate.x,
                    y: commandsAreaSelectReferenceCoordinate.y
                }
                areaSelectorDimensions = {
                    w: cursorCoordinatesReal.x - commandsAreaSelectReferenceCoordinate.x,
                    h: cursorCoordinatesReal.y - commandsAreaSelectReferenceCoordinate.y
                }
            }
        }
    stroke(255);
    fill(255, 120);
    rect(areaSelectorCoordinate.x, areaSelectorCoordinate.y, areaSelectorDimensions.w, areaSelectorDimensions.h);
    }
}