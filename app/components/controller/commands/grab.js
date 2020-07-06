var cGrab = {
    state: false,
    IDs: [],
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
    if (Array.isArray(targetItems)) {
        cGrab.IDs = cGrab.IDs.concat(targetItems);
    } else {
        cGrab.IDs.push(targetItems);
    }
    for (i = 0; i < cGrab.IDs.length; i++) { // minimise for loops
        currentItemIndex = cFilterGetIndexOfID(cGrab.IDs[i]);
        cGrab.offsets.x.push(mCursor.coordinate.current.x - mItems.database[currentItemIndex].coordinate.x);
        cGrab.offsets.y.push(mCursor.coordinate.current.y - mItems.database[currentItemIndex].coordinate.y);
    }
}

function cGrabOn() {
    var i;
    var currentIndex;
    if (cGrab.state) {
        for (i = 0; i < cGrab.IDs.length; i++) {
            currentIndex = cFilterGetIndexOfID(cGrab.IDs[i]);
            mItems.database[currentIndex].coordinate.x = mCursor.coordinate.current.x - cGrab.offsets.x[i];
            mItems.database[currentIndex].coordinate.y = mCursor.coordinate.current.y - cGrab.offsets.y[i];
        }
        cGrabUpdateGrabbedItemsDepth();
    }
}

function cGrabUpdateGrabbedItemsDepth() {
    var i;
    var targetParentID = cFilterGetFrontItemID(mCursor.IDs.detectedExcludingGrabbed);
    var targetDepth;

    if (targetParentID === undefined) {
        targetDepth = 0;
    } else {
        targetDepth = mItems.database[cFilterGetIndexOfID(targetParentID)].structure.depth + 1;
    }

    if (targetParentID !== undefined) {
        for (i = 0; i < cGrab.IDs.length; i++) {
            mItems.database[cGrab.IDs[i]].structure.depth = targetDepth;
        }    
    }
}


function cGrabEnd() {
    mLog.push('Letting go of IDs: ' + cGrab.IDs)
    cGrab = {
        state: false,
        IDs: [],
        offsets: {
            x: [],
            y: []
        },
        targetDepth: undefined
    };
}

