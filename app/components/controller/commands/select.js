var cSelect = {
    IDs: []
}

function cSelectBegin(targetItems) {
    if (Array.isArray(targetItems)) {
        cSelect.IDs = cSelect.IDs.concat(targetItems);
    } else {
        cSelect.IDs.push(targetItems);
    }
    
    if (cSelect.IDs.length > 0) {
        mLog.push('Selected mItems.IDs: ' + cSelect.IDs);
    }    
}

function cSelectEnd() {
    mLog.push('Deselected item(s): ' + cSelect.IDs);
    cSelect = {
        IDs: []
    }
}

