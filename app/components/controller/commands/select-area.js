var commandsSelectAreaOriginCoordinate;
var commandsSelectAreaTopLeftCoordinate;
var commandsSelectAreaDimensions;
var commandsSelectAreaDetectedItems = [];
var commandsSelectAreaState = false;


function commandsSelectAreaBegin() {
    commandsSelectAreaState = true;
    commandsSelectAreaOriginCoordinate = {
        x: cursorCoordinatesReal.x,
        y: cursorCoordinatesReal.y
    }
}

function commandsSelectAreaOn() {
    if (commandsSelectAreaState) {
        commandsSelectAreaUpdateBounds();
        commandsSelectAreaDetect();
    }
}

function commandsSelectAreaUpdateBounds() {
    if (commandsSelectAreaOriginCoordinate !== undefined) {
        if (cursorCoordinatesReal.y < commandsSelectAreaOriginCoordinate.y) {
            if (cursorCoordinatesReal.x < commandsSelectAreaOriginCoordinate.x) {
            // TOP LEFT QUADRANT
                commandsSelectAreaTopLeftCoordinate = {
                    x: cursorCoordinatesReal.x,
                    y: cursorCoordinatesReal.y
                }
                commandsSelectAreaDimensions = {
                    w: commandsSelectAreaOriginCoordinate.x - cursorCoordinatesReal.x,
                    h: commandsSelectAreaOriginCoordinate.y - cursorCoordinatesReal.y
                }
            } else {
            // TOP RIGHT QUADRANT
                commandsSelectAreaTopLeftCoordinate = {
                    x: commandsSelectAreaOriginCoordinate.x,
                    y: cursorCoordinatesReal.y
                }
                commandsSelectAreaDimensions = {
                    w: cursorCoordinatesReal.x - commandsSelectAreaOriginCoordinate.x,
                    h: commandsSelectAreaOriginCoordinate.y - cursorCoordinatesReal.y
                }
            }
        } else {
            if (cursorCoordinatesReal.x < commandsSelectAreaOriginCoordinate.x) {
            // BOTTOM LEFT QUADRANT
                commandsSelectAreaTopLeftCoordinate = {
                    x: cursorCoordinatesReal.x,
                    y: commandsSelectAreaOriginCoordinate.y
                }
                commandsSelectAreaDimensions = {
                    w: commandsSelectAreaOriginCoordinate.x - cursorCoordinatesReal.x,
                    h: cursorCoordinatesReal.y - commandsSelectAreaOriginCoordinate.y
                }
            } else {
            // BOTTOM RIGHT QUADRANT
                commandsSelectAreaTopLeftCoordinate = {
                    x: commandsSelectAreaOriginCoordinate.x,
                    y: commandsSelectAreaOriginCoordinate.y
                }
                commandsSelectAreaDimensions = {
                    w: cursorCoordinatesReal.x - commandsSelectAreaOriginCoordinate.x,
                    h: cursorCoordinatesReal.y - commandsSelectAreaOriginCoordinate.y
                }
            }
        }
    }
}

function commandsSelectAreaDetect() {
    var detectedItems = []
    for (i = 0; i < items.length; i++) {
        if (items[i].coordinates.real.x > commandsSelectAreaTopLeftCoordinate.x &&
            items[i].coordinates.real.x < commandsSelectAreaTopLeftCoordinate.x + commandsSelectAreaDimensions.w &&
            items[i].coordinates.real.y > commandsSelectAreaTopLeftCoordinate.y &&
            items[i].coordinates.real.y < commandsSelectAreaTopLeftCoordinate.y + commandsSelectAreaDimensions.h) {
                detectedItems.push(items[i].id);  
        }
    }
    commandsSelectAreaDetectedItems = detectedItems;
}

function commandsSelectAreaEnd() {
    commandsSelectAreaOriginCoordinate = undefined;
    commandsSelectAreaTopLeftCoordinate = undefined;
    commandsSelectAreaDimensions = undefined;
    commandsSelectAreaDetectedItems = [];
    commandsSelectAreaState = false;
}