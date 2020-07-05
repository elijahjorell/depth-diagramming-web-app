var cGrab = {
    IDs: [],
    offsets: {
        x: [],
        y: []
    },
    targetDepth: undefined
};

function cGrabBegin(targetItems) {
    cLog.push('Grabbed item(s): ' + cSelectItemsArray) 
    if (Array.isArray(targetItems)) {
        cGrab.IDs = cGrab.IDs.concat(targetItems);
    } else {
        cGrab.IDs.push(targetItems);
    }
    for (j = 0; j < cGrab.IDs.length; j++) { // minimise for loops
        currentItemIndex = cFilterGetIndexOfID(cGrab.IDs[j]);
        cGrab.offsets.x.push(mCursor.coordinate.current.x - mItems.IDs[currentItemIndex].coordinate.x);
        cGrab.offsets.y.push(mCursor.coordinate.current.y - mItems.IDs[currentItemIndex].coordinate.y);
    }
}

function cGrabOn() {
    if (cGrab.IDs.length > 0) {
        for (i = 0; i < cGrab.IDs.length; i++) {
            mItems.IDs[cGrab.IDs[i]].coordinate.x = mCursor.coordinate.current.x - cGrab.offsets.x[i];
            mItems.IDs[cGrab.IDs[i]].coordinate.y = mCursor.coordinate.current.y - cGrab.offsets.y[i];
        }
        cGrabUpdateGrabbedItemsDepth();
    }
}

function cGrabUpdateGrabbedItemsDepth() {
    var currentGrabbedItemIndex;
    var targetParentID = cFilterGetFrontItemID(mCursor.IDs.detectedExcludingGrabbed);
    var targetDepth;

    if (targetParentID === undefined) {
        targetDepth = 0;
    } else {
        targetDepth = mItems.IDs[cFilterGetIndexOfID(targetParentID)].structure.depth + 1;
    }

    if (targetParentID !== undefined) {
        for (currentGrabbedItemIndex = 0; currentGrabbedItemIndex < cGrab.IDs.length; currentGrabbedItemIndex++) {
            mItems.IDs[cGrab.IDs[currentGrabbedItemIndex]].structure.depth = targetDepth;
        }    
    }
}


function cGrabEnd() {
    cLog.push('Letting go of grabbed item(s): ' + cGrab.IDs)  
    //cGrabUpdateGrabbedItemsDepth
    cGrab.IDs = [];
    cGrab.offsets = {
        x: [],
        y: []
    }
}

