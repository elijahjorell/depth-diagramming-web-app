var cSelectArea = {
    state: false,
    IDs: [],
    coordinates: {
        origin: {
            x: undefined,
            y: undefined
        },
        topLeftCorner: {
            x: undefined,
            y: undefined
        }
    },
    dimensions: {
        w: undefined,
        h: undefined
    }
}

function cSelectAreaBegin() {
    cSelectArea.state = true;
    cSelectArea.coordinates.origin.x = mCursor.coordinate.current.x;
    cSelectArea.coordinates.origin.y = mCursor.coordinate.current.y;
}

function cSelectAreaOn() {
    if (cSelectArea.state) {
        cSelectAreaUpdateBounds();
        cSelectAreaDetect();
    }
}

function cSelectAreaUpdateBounds() {
    if (mCursor.coordinate.current.y < cSelectArea.coordinates.origin.y) {
        if (mCursor.coordinate.current.x < cSelectArea.coordinates.origin.x) {
        // TOP LEFT QUADRANT
            cSelectArea.coordinates.topLeftCorner.x = mCursor.coordinate.current.x;
            cSelectArea.coordinates.topLeftCorner.y = mCursor.coordinate.current.y;
            cSelectArea.dimensions.w = cSelectArea.coordinates.origin.x - mCursor.coordinate.current.x;
            cSelectArea.dimensions.h = cSelectArea.coordinates.origin.y - mCursor.coordinate.current.y;
        } else {
        // TOP RIGHT QUADRANT
            cSelectArea.coordinates.topLeftCorner.x = cSelectArea.coordinates.origin.x;
            cSelectArea.coordinates.topLeftCorner.y = mCursor.coordinate.current.y;
            cSelectArea.dimensions.w = mCursor.coordinate.current.x - cSelectArea.coordinates.origin.x;
            cSelectArea.dimensions.h = cSelectArea.coordinates.origin.y - mCursor.coordinate.current.y;
        }
    } else {
        if (mCursor.coordinate.current.x < cSelectArea.coordinates.origin.x) {
        // BOTTOM LEFT QUADRANT
            cSelectArea.coordinates.topLeftCorner.x = mCursor.coordinate.current.x;
            cSelectArea.coordinates.topLeftCorner.y = cSelectArea.coordinates.origin.y;
            cSelectArea.dimensions.w = cSelectArea.coordinates.origin.x - mCursor.coordinate.current.x;
            cSelectArea.dimensions.h = mCursor.coordinate.current.y - cSelectArea.coordinates.origin.y;
        } else {
        // BOTTOM RIGHT QUADRANT
            cSelectArea.coordinates.topLeftCorner.x = cSelectArea.coordinates.origin.x;
            cSelectArea.coordinates.topLeftCorner.y = cSelectArea.coordinates.origin.y;
            cSelectArea.dimensions.w = mCursor.coordinate.current.x - cSelectArea.coordinates.origin.x;
            cSelectArea.dimensions.h = mCursor.coordinate.current.y - cSelectArea.coordinates.origin.y;
        }
    }
}

function cSelectAreaDetect() {
    var detectedItems = []
    for (i = 0; i < mItems.IDs.length; i++) {
        if (mItems.IDs[i].coordinate.x > cSelectArea.coordinates.topLeftCorner.x &&
            mItems.IDs[i].coordinate.x < cSelectArea.coordinates.topLeftCorner.x + cSelectArea.dimensions.w &&
            mItems.IDs[i].coordinate.y > cSelectArea.coordinates.topLeftCorner.y &&
            mItems.IDs[i].coordinate.y < cSelectArea.coordinates.topLeftCorner.y + cSelectArea.dimensions.h) {
                detectedItems.push(mItems.IDs[i].id);  
        }
    }
    cSelectArea.IDs = detectedItems;
}

function cSelectAreaEnd() {
    cSelectArea = {
        state: false,
        IDs: [],
        coordinates: {
            origin: {
                x: undefined,
                y: undefined
            },
            topLeftCorner: {
                x: undefined,
                y: undefined
            }
        },
        dimensions: {
            w: undefined,
            h: undefined
        }
    };
}