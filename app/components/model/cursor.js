var cursorDetectedItemID;
var cursorCoordinatesReal;
var cursorStyle = 'default';

function cursorUpdateCoordinatesReal() {
    cursorCoordinatesReal = coordinatesConvertRelativeToScreenToReal(mouseX, mouseY);
}

function cursorUpdateDetectedItems() {
    var detectedItems = [];
    for (i = 0; i < items.length; i++) {
        if (dist(cursorCoordinatesReal.x,
                 cursorCoordinatesReal.y,
                 items[i].coordinates.real.x,
                 items[i].coordinates.real.y) < items[i].dimensions.real.r) {
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