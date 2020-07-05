var cursorPreviousCoordinateRelativeToScreen;
var cursorStyle = 'default';

var mCursor = {
    IDs: {
        detected: undefined,
        detectedExcludingGrabbed: undefined,
        front: undefined
    },
    coordinate: {
        current: {
            x: undefined,
            y: undefined
        },
        previous: {
            x: undefined,
            y: undefined
        }
    },
    style: 'default'
};

function cursorUpdateCoordinatesReal() {
    mCursor.coordinate.current = coordinatesConvertRelativeToScreenToReal(mouseX, mouseY);
}

function cursorUpdatePreviousCoordinate() {
    cursorPreviousCoordinateRelativeToScreen = {
        x: mouseX,
        y: mouseY
    };
}

function cursorUpdateDetectedItemsID() {
    var detectedItemsID = [];
    for (i = 0; i < mItems.IDs.length; i++) {
        if (dist(mCursor.coordinate.current.x,
                 mCursor.coordinate.current.y,
                 mItems.IDs[i].coordinate.x,
                 mItems.IDs[i].coordinate.y) < mItems.IDs[i].dimensions.r) {
            detectedItemsID.push(mItems.IDs[i].id);
        }
    }
    mCursor.IDs.detected = detectedItemsID;
}

function cursorUpdateDetectedItemsExcludingGrabbedID() {
    mCursor.IDs.detectedExcludingGrabbed = cFilterExcludeValuesFromArray(cGrab.IDs, mCursor.IDs.detected);
}

function cursorUpdateDetectedFrontItemID() {
    mCursor.IDs.front = cFilterGetFrontItemID(mCursor.IDs.detected);
}

function cursorUpdateStyle() {  
    var cursorProposedStyle;
    
    // styling logic
    if (mCursor.IDs.front === undefined) {
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