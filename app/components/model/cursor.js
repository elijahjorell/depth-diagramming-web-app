var mCursor = {
    IDs: {
        detected: [],
        detectedExcludingGrabbed: [],
        front: undefined
    },
    components: {
        frontID: {
            
        }
    },
    coordinates: {
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
    mCursor.coordinates.current.x = updatedCursorCoordinate.x;
    mCursor.coordinates.current.y = updatedCursorCoordinate.y;
}

function mCursorUpdateCoordinatePreviousRelativeToScreen() {
    mCursor.coordinates.previousRelativeToScreen.x = mouseX;
    mCursor.coordinates.previousRelativeToScreen.y = mouseY;
}

function mCursorUpdateDetectedIDs() {
    var i;
    var updatedDetectedIDs = [];
    for (i = 0; i < mItems.database.length; i++) {
        if (mDetectionIsCoordinateWithinCircle(mCursor.coordinates.current, mItems.database[i].coordinate, mItems.database[i].dimensions.r)) {
            updatedDetectedIDs.push(mItems.database[i].id);
        }
    }
    mCursor.IDs.detected = updatedDetectedIDs;
    mCursor.IDs.detectedExcludingGrabbed = mArraysExcludeValuesFromArray(cGrab.IDs, mCursor.IDs.detected);
    mCursor.IDs.front = mItemsGetFrontIDFromIDs(mCursor.IDs.detected);
}

function mCursorUpdateStyle() {  
    var updatedStyle;
    
    // styling logic
    if (cPan.active) {
        updatedStyle = 'grabbing';
    // } else if (cSelect.active) {

    } else if (mCursor.IDs.detected.length > 0) {
        updatedStyle = 'move';
    } else {
        updatedStyle = 'default';
    }

    // change cursor style only when a different style is proposed
    if (updatedStyle !== mCursor.style) {
        mCursor.style = updatedStyle;
        document.getElementById('app').style.cursor = mCursor.style;
    }
}