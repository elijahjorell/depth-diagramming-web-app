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
        fill(255);
        // rect(0, 0, 100, 100)

        areaSelectorTopLeftCorner
        areaSelectorTopRightCorner
        areaSelectorBottomLeftCorner
        areaSelectorBottomRightCorner
        
        if (cursorCoordinatesTranslated.y <= commandsAreaSelectReferenceCoordinate.y) {
            // TOP LEFT QUADRANT
            
            // TOP RIGHT QUADRANT

        } else {
            // BOTTOM LEFT QUADRANT

            // BOTTOM RIGHT QUADRANT
        }
        

        // rect()s
        console.log(commandsAreaSelectReferenceCoordinate.x,
                    commandsAreaSelectReferenceCoordinate.y,
                    cursorCoordinatesTranslated.x,
                    cursorCoordinatesTranslated.y)
    }
}