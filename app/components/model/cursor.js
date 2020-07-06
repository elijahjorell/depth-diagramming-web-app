var mCursor = {
    IDs: {
        detected: [],
        detectedExcludingGrabbed: [],
        front: undefined
    },
    coordinate: {
        current: {
            x: undefined,
            y: undefined
        },
        previousRelativeToScreen: {
            x: undefined,
            y: undefined
        }
    },
    style: 'default'
};

function mCursorUpdateCoordinateCurrent() {
    var updatedCursorCoordinate = mScreenConvertCoordinateRelativeToReal(mouseX, mouseY);
    mCursor.coordinate.current.x = updatedCursorCoordinate.x;
    mCursor.coordinate.current.y = updatedCursorCoordinate.y;
}

function mCursorUpdateCoordinatePreviousRelativeToScreen() {
    mCursor.coordinate.previousRelativeToScreen.x = mouseX;
    mCursor.coordinate.previousRelativeToScreen.y = mouseY;
}

function mCursorUpdateIDs() {
    var i;
    var updatedIDsDetected = [];
    for (i = 0; i < mItems.database.length; i++) {
        if (dist(mCursor.coordinate.current.x,
                 mCursor.coordinate.current.y,
                 mItems.database[i].coordinate.x,
                 mItems.database[i].coordinate.y) < mItems.database[i].dimensions.r) {
            updatedIDsDetected.push(mItems.database[i].id);
        }
    }
    mCursor.IDs.detected = updatedIDsDetected;
    mCursor.IDs.detectedExcludingGrabbed = cFilterExcludeValuesFromArray(cGrab.IDs, mCursor.IDs.detected);
    mCursor.IDs.front = cFilterGetFrontItemID(mCursor.IDs.detected);
}

function mCursorUpdateStyle() {  
    var updatedStyle;
    
    // styling logic
    if (mCursor.IDs.detected.length === 0) {
        updatedStyle = 'default';
    } else {
        updatedStyle = 'move';
    }

    // change cursor style only when a different style is proposed
    if (updatedStyle !== mCursor.style) {
        mCursor.style = updatedStyle;
        document.getElementById('app').style.cursor = mCursor.style;
    }
}