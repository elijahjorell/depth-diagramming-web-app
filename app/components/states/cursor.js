var cursorDetectedItemID;
var cursorCoordinatesTranslated;
var cursorStyle = 'default';

function cursorUpdateCoordinatesTranslated() {
    cursorCoordinatesTranslated = coordinatesConvertRawToTranslated(mouseX, mouseY);
    return {
        x: cursorCoordinatesTranslated.x,
        y: cursorCoordinatesTranslated.y
    };
}

function cursorUpdateDetectedItems() {
    var detectedItems = [];
    for (i = 0; i < items.length; i++) {
        if (dist(cursorCoordinatesTranslated.x,
                 cursorCoordinatesTranslated.y,
                 items[i].coordinates.raw.x,
                 items[i].coordinates.raw.y) < items[i].dimensions.raw.r) {
            detectedItems.push(items[i].id);
        }
    }
    cursorDetectedItemID = detectedItems[0]; // pending logic to select item with highest order
}

function cursorUpdateStyle() {  
    var cursorProposedStyle;
    
    // styling logic
    if (cursorDetectedItemID === undefined) {
        cursorProposedStyle = 'default';
    } else {
        cursorProposedStyle = 'default';
    }

    // change cursor only when a new style is proposed
    if (cursorProposedStyle !== cursorStyle) {
        cursorStyle = cursorProposedStyle;
        document.getElementById('app').style.cursor = cursorStyle;
    }
}