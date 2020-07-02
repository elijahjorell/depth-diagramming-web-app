var commandsSelectAreaOriginCoordinate;
var commandsSelectAreaTopLeftCoordinate;
var commandsSelectAreaDimensions;
var commandsSelectAreaDetectedItems = [];
var commandsSelectAreaState = false;


function commandsSelectAreaBegin() {
    commandsSelectAreaState = true;
    commandsSelectAreaOriginCoordinate = {
        x: cursorCoordinateReal.x,
        y: cursorCoordinateReal.y
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
        if (cursorCoordinateReal.y < commandsSelectAreaOriginCoordinate.y) {
            if (cursorCoordinateReal.x < commandsSelectAreaOriginCoordinate.x) {
            // TOP LEFT QUADRANT
                commandsSelectAreaTopLeftCoordinate = {
                    x: cursorCoordinateReal.x,
                    y: cursorCoordinateReal.y
                }
                commandsSelectAreaDimensions = {
                    w: commandsSelectAreaOriginCoordinate.x - cursorCoordinateReal.x,
                    h: commandsSelectAreaOriginCoordinate.y - cursorCoordinateReal.y
                }
            } else {
            // TOP RIGHT QUADRANT
                commandsSelectAreaTopLeftCoordinate = {
                    x: commandsSelectAreaOriginCoordinate.x,
                    y: cursorCoordinateReal.y
                }
                commandsSelectAreaDimensions = {
                    w: cursorCoordinateReal.x - commandsSelectAreaOriginCoordinate.x,
                    h: commandsSelectAreaOriginCoordinate.y - cursorCoordinateReal.y
                }
            }
        } else {
            if (cursorCoordinateReal.x < commandsSelectAreaOriginCoordinate.x) {
            // BOTTOM LEFT QUADRANT
                commandsSelectAreaTopLeftCoordinate = {
                    x: cursorCoordinateReal.x,
                    y: commandsSelectAreaOriginCoordinate.y
                }
                commandsSelectAreaDimensions = {
                    w: commandsSelectAreaOriginCoordinate.x - cursorCoordinateReal.x,
                    h: cursorCoordinateReal.y - commandsSelectAreaOriginCoordinate.y
                }
            } else {
            // BOTTOM RIGHT QUADRANT
                commandsSelectAreaTopLeftCoordinate = {
                    x: commandsSelectAreaOriginCoordinate.x,
                    y: commandsSelectAreaOriginCoordinate.y
                }
                commandsSelectAreaDimensions = {
                    w: cursorCoordinateReal.x - commandsSelectAreaOriginCoordinate.x,
                    h: cursorCoordinateReal.y - commandsSelectAreaOriginCoordinate.y
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