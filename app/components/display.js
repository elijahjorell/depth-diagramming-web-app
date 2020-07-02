function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('app');
    coordinatesUpdateOrigin();
}

function draw() {
    translate(coordinatesOrigin.x, coordinatesOrigin.y);
    background(34, 42, 53);
    cursorUpdateCoordinatesTranslated();
    cursorUpdateDetectedItems();
    cursorUpdateStyle();
    itemsUpdateGrabbedItemsCoordinates();
    displayDrawItems();
    displayDrawAreaSelector();
}

function displayDrawItems() {
    for (i = 0; i < items.length; i++) {
        
        // ring
        stroke(180, 199, 231);
        fill(255, 0);
        ellipse(items[i].coordinates.raw.x,
                items[i].coordinates.raw.y,
                items[i].dimensions.raw.r * 2);
        
        
        // inner circle
        noStroke();

        if (itemsSelected.includes(items[i].id)) {
            fill('red');
        } else {
            fill(255);
        }

        ellipse(items[i].coordinates.raw.x,
                items[i].coordinates.raw.y,
                items[i].dimensions.raw.r * 2 - 20);
        



    }
}

function displayDrawAreaSelector() {
    if (commandsAreaSelectReferenceCoordinate !== undefined) {
        var areaSelectorCoordinate;
        var areaSelectorDimensions;
        if (cursorCoordinatesTranslated.y < commandsAreaSelectReferenceCoordinate.y) {
            if (cursorCoordinatesTranslated.x < commandsAreaSelectReferenceCoordinate.x) {
            // TOP LEFT QUADRANT
                areaSelectorCoordinate = {
                    x: cursorCoordinatesTranslated.x,
                    y: cursorCoordinatesTranslated.y
                }
                areaSelectorDimensions = {
                    w: commandsAreaSelectReferenceCoordinate.x - cursorCoordinatesTranslated.x,
                    h: commandsAreaSelectReferenceCoordinate.y - cursorCoordinatesTranslated.y
                }
            } else {
            // TOP RIGHT QUADRANT
                areaSelectorCoordinate = {
                    x: commandsAreaSelectReferenceCoordinate.x,
                    y: cursorCoordinatesTranslated.y
                }
                areaSelectorDimensions = {
                    w: cursorCoordinatesTranslated.x - commandsAreaSelectReferenceCoordinate.x,
                    h: commandsAreaSelectReferenceCoordinate.y - cursorCoordinatesTranslated.y
                }
            }
        } else {
            if (cursorCoordinatesTranslated.x < commandsAreaSelectReferenceCoordinate.x) {
            // BOTTOM LEFT QUADRANT
                areaSelectorCoordinate = {
                    x: cursorCoordinatesTranslated.x,
                    y: commandsAreaSelectReferenceCoordinate.y
                }
                areaSelectorDimensions = {
                    w: commandsAreaSelectReferenceCoordinate.x - cursorCoordinatesTranslated.x,
                    h: cursorCoordinatesTranslated.y - commandsAreaSelectReferenceCoordinate.y
                }
            } else {
            // BOTTOM RIGHT QUADRANT
                areaSelectorCoordinate = {
                    x: commandsAreaSelectReferenceCoordinate.x,
                    y: commandsAreaSelectReferenceCoordinate.y
                }
                areaSelectorDimensions = {
                    w: cursorCoordinatesTranslated.x - commandsAreaSelectReferenceCoordinate.x,
                    h: cursorCoordinatesTranslated.y - commandsAreaSelectReferenceCoordinate.y
                }
            }
        }
    stroke(255);
    fill(255, 120);
    rect(areaSelectorCoordinate.x, areaSelectorCoordinate.y, areaSelectorDimensions.w, areaSelectorDimensions.h);
    }
}