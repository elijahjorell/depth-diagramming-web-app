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
    cSelectArea.coordinates.origin.x = mCursor.coordinates.current.x;
    cSelectArea.coordinates.origin.y = mCursor.coordinates.current.y;
}

function cSelectAreaOn() {
    if (cSelectArea.state) {
        cSelectAreaUpdateBounds();
        cSelectAreaDetect();
    }
}

function cSelectAreaUpdateBounds() {
    if (mCursor.coordinates.current.y < cSelectArea.coordinates.origin.y) {
        if (mCursor.coordinates.current.x < cSelectArea.coordinates.origin.x) {
        // TOP LEFT QUADRANT
            cSelectArea.coordinates.topLeftCorner.x = mCursor.coordinates.current.x;
            cSelectArea.coordinates.topLeftCorner.y = mCursor.coordinates.current.y;
            cSelectArea.dimensions.w = cSelectArea.coordinates.origin.x - mCursor.coordinates.current.x;
            cSelectArea.dimensions.h = cSelectArea.coordinates.origin.y - mCursor.coordinates.current.y;
        } else {
        // TOP RIGHT QUADRANT
            cSelectArea.coordinates.topLeftCorner.x = cSelectArea.coordinates.origin.x;
            cSelectArea.coordinates.topLeftCorner.y = mCursor.coordinates.current.y;
            cSelectArea.dimensions.w = mCursor.coordinates.current.x - cSelectArea.coordinates.origin.x;
            cSelectArea.dimensions.h = cSelectArea.coordinates.origin.y - mCursor.coordinates.current.y;
        }
    } else {
        if (mCursor.coordinates.current.x < cSelectArea.coordinates.origin.x) {
        // BOTTOM LEFT QUADRANT
            cSelectArea.coordinates.topLeftCorner.x = mCursor.coordinates.current.x;
            cSelectArea.coordinates.topLeftCorner.y = cSelectArea.coordinates.origin.y;
            cSelectArea.dimensions.w = cSelectArea.coordinates.origin.x - mCursor.coordinates.current.x;
            cSelectArea.dimensions.h = mCursor.coordinates.current.y - cSelectArea.coordinates.origin.y;
        } else {
        // BOTTOM RIGHT QUADRANT
            cSelectArea.coordinates.topLeftCorner.x = cSelectArea.coordinates.origin.x;
            cSelectArea.coordinates.topLeftCorner.y = cSelectArea.coordinates.origin.y;
            cSelectArea.dimensions.w = mCursor.coordinates.current.x - cSelectArea.coordinates.origin.x;
            cSelectArea.dimensions.h = mCursor.coordinates.current.y - cSelectArea.coordinates.origin.y;
        }
    }
}

function cSelectAreaDetect() {
    var i;
    var detectedItems = [];
    for (i = 0; i < mItems.database.length; i++) {
        if (mItems.database[i].coordinate.x > cSelectArea.coordinates.topLeftCorner.x &&
            mItems.database[i].coordinate.x < cSelectArea.coordinates.topLeftCorner.x + cSelectArea.dimensions.w &&
            mItems.database[i].coordinate.y > cSelectArea.coordinates.topLeftCorner.y &&
            mItems.database[i].coordinate.y < cSelectArea.coordinates.topLeftCorner.y + cSelectArea.dimensions.h) {
                detectedItems.push(mItems.database[i].id);  
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