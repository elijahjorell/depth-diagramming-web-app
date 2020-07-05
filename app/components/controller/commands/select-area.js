var cSelectAreaOriginCoordinate;
var cSelectAreaTopLeftCoordinate;
var cSelectAreaDimensions;
var cSelectAreaDetectedItems = [];
var cSelectAreaState = false;


function cSelectAreaBegin() {
    cSelectAreaState = true;
    cSelectAreaOriginCoordinate = {
        x: mCursor.coordinate.current.x,
        y: mCursor.coordinate.current.y
    }
}

function cSelectAreaOn() {
    if (cSelectAreaState) {
        cSelectAreaUpdateBounds();
        cSelectAreaDetect();
    }
}

function cSelectAreaUpdateBounds() {
    if (cSelectAreaOriginCoordinate !== undefined) {
        if (mCursor.coordinate.current.y < cSelectAreaOriginCoordinate.y) {
            if (mCursor.coordinate.current.x < cSelectAreaOriginCoordinate.x) {
            // TOP LEFT QUADRANT
                cSelectAreaTopLeftCoordinate = {
                    x: mCursor.coordinate.current.x,
                    y: mCursor.coordinate.current.y
                }
                cSelectAreaDimensions = {
                    w: cSelectAreaOriginCoordinate.x - mCursor.coordinate.current.x,
                    h: cSelectAreaOriginCoordinate.y - mCursor.coordinate.current.y
                }
            } else {
            // TOP RIGHT QUADRANT
                cSelectAreaTopLeftCoordinate = {
                    x: cSelectAreaOriginCoordinate.x,
                    y: mCursor.coordinate.current.y
                }
                cSelectAreaDimensions = {
                    w: mCursor.coordinate.current.x - cSelectAreaOriginCoordinate.x,
                    h: cSelectAreaOriginCoordinate.y - mCursor.coordinate.current.y
                }
            }
        } else {
            if (mCursor.coordinate.current.x < cSelectAreaOriginCoordinate.x) {
            // BOTTOM LEFT QUADRANT
                cSelectAreaTopLeftCoordinate = {
                    x: mCursor.coordinate.current.x,
                    y: cSelectAreaOriginCoordinate.y
                }
                cSelectAreaDimensions = {
                    w: cSelectAreaOriginCoordinate.x - mCursor.coordinate.current.x,
                    h: mCursor.coordinate.current.y - cSelectAreaOriginCoordinate.y
                }
            } else {
            // BOTTOM RIGHT QUADRANT
                cSelectAreaTopLeftCoordinate = {
                    x: cSelectAreaOriginCoordinate.x,
                    y: cSelectAreaOriginCoordinate.y
                }
                cSelectAreaDimensions = {
                    w: mCursor.coordinate.current.x - cSelectAreaOriginCoordinate.x,
                    h: mCursor.coordinate.current.y - cSelectAreaOriginCoordinate.y
                }
            }
        }
    }
}

function cSelectAreaDetect() {
    var detectedItems = []
    for (i = 0; i < mItems.IDs.length; i++) {
        if (mItems.IDs[i].coordinate.x > cSelectAreaTopLeftCoordinate.x &&
            mItems.IDs[i].coordinate.x < cSelectAreaTopLeftCoordinate.x + cSelectAreaDimensions.w &&
            mItems.IDs[i].coordinate.y > cSelectAreaTopLeftCoordinate.y &&
            mItems.IDs[i].coordinate.y < cSelectAreaTopLeftCoordinate.y + cSelectAreaDimensions.h) {
                detectedItems.push(mItems.IDs[i].id);  
        }
    }
    cSelectAreaDetectedItems = detectedItems;
}

function cSelectAreaEnd() {
    cSelectAreaOriginCoordinate = undefined;
    cSelectAreaTopLeftCoordinate = undefined;
    cSelectAreaDimensions = undefined;
    cSelectAreaDetectedItems = [];
    cSelectAreaState = false;
}