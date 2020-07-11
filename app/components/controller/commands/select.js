var cSelect = {
    active: false,
    IDs: []
}

function cSelectBegin(targetItems) {
    if (Array.isArray(targetItems)) {
        cSelect.IDs = cSelect.IDs.concat(targetItems);
    } else {
        cSelect.IDs.push(targetItems);
    }
    
    if (cSelect.IDs.length > 0) {
        cSelect.active = true;
        mLog.push('Selected IDs: ' + cSelect.IDs);
    }   
}

function cSelectEnd() {
    if (cSelect.active) {
        mLog.push('Deselected IDs: ' + cSelect.IDs);
        cSelect.active = false;
        cSelect = {
            IDs: []
        }
    }
}

