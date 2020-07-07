var cSelect = {
    active: false,
    IDs: []
}

function cSelectBegin(targetItems) {
    cSelect.active = true;
    if (Array.isArray(targetItems)) {
        cSelect.IDs = cSelect.IDs.concat(targetItems);
    } else {
        cSelect.IDs.push(targetItems);
    }
    
    if (cSelect.IDs.length > 0) {
        mLog.push('Selected IDs: ' + cSelect.IDs);
    }    
}

function cSelectEnd() {
    mLog.push('Deselected IDs: ' + cSelect.IDs);
    cSelect.active = false;
    cSelect = {
        IDs: []
    }
}

