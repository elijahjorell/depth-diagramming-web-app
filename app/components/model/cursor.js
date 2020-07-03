var cursorDetectedFrontItemID;
var cursorDetectedItemsID;
var cursorCoordinateReal;
var cursorPreviousCoordinateRelativeToScreen;
var cursorStyle = 'default';

function cursorUpdateCoordinatesReal() {
    cursorCoordinateReal = coordinatesConvertRelativeToScreenToReal(mouseX, mouseY);
}

function cursorUpdatePreviousCoordinate() {
    cursorPreviousCoordinateRelativeToScreen = {
        x: mouseX,
        y: mouseY
    };
}

function cursorUpdateDetectedItemsID() {
    var detectedItemsID = [];
    for (i = 0; i < items.length; i++) {
        if (dist(cursorCoordinateReal.x,
                 cursorCoordinateReal.y,
                 items[i].coordinates.real.x,
                 items[i].coordinates.real.y) < items[i].dimensions.real.r) {
            detectedItemsID.push(items[i].id);
        }
    }
    cursorDetectedItemsID = detectedItemsID;
}

function cursorUpdateDetectedFrontItemID() {
    // pending logic to select item with highest order
    cursorDetectedFrontItemID = commandsFilterGetFrontItemID(cursorDetectedItemsID);
}

function cursorUpdateStyle() {  
    var cursorProposedStyle;
    
    // styling logic
    if (cursorDetectedFrontItemID === undefined) {
        cursorProposedStyle = 'default';
    } else {
        cursorProposedStyle = 'move';
    }

    // change cursor only when a new style is proposed
    if (cursorProposedStyle !== cursorStyle) {
        cursorStyle = cursorProposedStyle;
        document.getElementById('app').style.cursor = cursorStyle;
    }
}