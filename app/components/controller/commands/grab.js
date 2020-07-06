var cGrab = {
    state: false,
    IDs: [],
    coordinates: {
        initial: {
            x: undefined,
            y: undefined
        },
        final: {
            x: undefined,
            y: undefined
        }
    },
    offsets: {
        x: [],
        y: []
    },
    targetDepth: undefined
};

function cGrabBegin(targetItems) {
    var i;
    var currentItemIndex;
    mLog.push('Grabbed IDs: ' + cSelect.IDs) 
    cGrab.state = true;
    cGrab.coordinates.initial.x = mCursor.coordinates.current.x;
    cGrab.coordinates.initial.y = mCursor.coordinates.current.y;
    if (Array.isArray(targetItems)) {
        cGrab.IDs = cGrab.IDs.concat(targetItems);
    } else {
        cGrab.IDs.push(targetItems);
    }
    for (i = 0; i < cGrab.IDs.length; i++) { // minimise for loops
        currentItemIndex = cFilterGetIndexOfID(cGrab.IDs[i]);
        cGrab.offsets.x.push(cGrab.coordinates.initial.x - mItems.database[currentItemIndex].coordinate.x);
        cGrab.offsets.y.push(cGrab.coordinates.initial.y - mItems.database[currentItemIndex].coordinate.y);
    }
}

function cGrabOn() {
    var i;
    var currentIndex;
    cGrab.coordinates.final.x = mCursor.coordinates.current.x;
    cGrab.coordinates.final.y = mCursor.coordinates.current.y;
    if (cGrab.state) {
        for (i = 0; i < cGrab.IDs.length; i++) {
            currentIndex = cFilterGetIndexOfID(cGrab.IDs[i]);
            mItems.database[currentIndex].coordinate.x = cGrab.coordinates.final.x - cGrab.offsets.x[i];
            mItems.database[currentIndex].coordinate.y = cGrab.coordinates.final.y - cGrab.offsets.y[i];
        }
        cStructureSetParentOfIDsTo(cGrab.IDs, cFilterGetFrontItemID(mCursor.IDs.detectedExcludingGrabbed));
    }
}

function cGrabEnd() {
    mLog.push('Ending grab for IDs: ' + cGrab.IDs);
    // mLog.push(model states)
    cGrab = {
        state: false,
        IDs: [],
        coordinates: {
            initial: {
                x: undefined,
                y: undefined
            },
            final: {
                x: undefined,
                y: undefined
            }
        },
        offsets: {
            x: [],
            y: []
        },
        targetDepth: undefined
    };
}

