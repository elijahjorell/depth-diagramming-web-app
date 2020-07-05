var cSelectItemsArray = [];

function cSelectItems(targetItems) {
    if (Array.isArray(targetItems)) {
        cSelectItemsArray = cSelectItemsArray.concat(targetItems);
    } else {
        cSelectItemsArray.push(targetItems);
    }
    
    if (cSelectItemsArray.length > 0) {
        cLog.push('Selected mItems.IDs: ' + cSelectItemsArray);
    }    
}

function cSelectEnd() {
    cLog.push('Deselected item(s): ' + cSelectItemsArray);
    cSelectItemsArray = [];
}

