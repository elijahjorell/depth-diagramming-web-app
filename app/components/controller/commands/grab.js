var cGrab = {
    active: false,
    state: undefined,
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
        original: {
            x: [],
            y: []
        },
        animated: {
            x: [],
            y: []
        }
    },  
    targetDepth: undefined
};

function cGrabBegin(targetItems) {
    var i;
    var currentItemIndex;
    if (!cGrab.active) {
        mLog.push('Grabbed IDs: ' + cSelect.IDs) 
        cGrab.active = true;
        cGrab.coordinates.initial.x = mCursor.coordinates.current.x;
        cGrab.coordinates.initial.y = mCursor.coordinates.current.y;
        if (Array.isArray(targetItems)) {
            cGrab.IDs = cGrab.IDs.concat(targetItems);
        } else {
            cGrab.IDs.push(targetItems);
        }

        // move to end of items database (so it is displayed in front)
        mItemsMoveIDsToEndOfDatabase(cGrab.IDs)
        
        // get offsets (to keep items at the same distance from initial coordinate throughout the grab)
        for (i = 0; i < cGrab.IDs.length; i++) {
            currentItemIndex = mItemsGetIndexOfID(cGrab.IDs[i]);
            cGrab.offsets.original.x.push(cGrab.coordinates.initial.x - mItems.database[currentItemIndex].coordinate.x);
            cGrab.offsets.original.y.push(cGrab.coordinates.initial.y - mItems.database[currentItemIndex].coordinate.y);
            cGrab.offsets.animated.x.push(cGrab.offsets.original.x[i]);
            cGrab.offsets.animated.y.push(cGrab.offsets.original.y[i]);
        }
    }
}

function cGrabOn() {
    var i;
    var currentIndex;
    cGrab.coordinates.final.x = mCursor.coordinates.current.x;
    cGrab.coordinates.final.y = mCursor.coordinates.current.y;
    if (cGrab.active) {
        for (i = 0; i < cGrab.IDs.length; i++) {
            currentIndex = mItemsGetIndexOfID(cGrab.IDs[i]);
            mItems.database[currentIndex].coordinate.x = cGrab.coordinates.final.x - cGrab.offsets.animated.x[i];
            mItems.database[currentIndex].coordinate.y = cGrab.coordinates.final.y - cGrab.offsets.animated.y[i];
        }
        cStructureSetParentOfIDsTo(cGrab.IDs, mItemsGetFrontIDFromIDs(mCursor.IDs.detectedExcludingGrabbed));
    }
}

function cGrabEnd() {
    if (cGrab.active) {
        mLog.push('Ending grab for IDs: ' + cGrab.IDs);
        // mLog.push(model states) DO THIS FOR ALL COMMAND ENDS
        cGrab = {
            active: false,
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
                original: {
                    x: [],
                    y: []
                },
                animated: {
                    x: [],
                    y: []
                }
            },  
            targetDepth: undefined
        };
    }
}

