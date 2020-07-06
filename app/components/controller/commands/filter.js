function cFilterGetIndexOfID(itemID) {
    for (i = 0; i < mItems.IDs.length; i++) {
        if (itemID === mItems.IDs[i].id) {
            return i;
        }
    }
}

function cFilterGetFrontItemID(itemsID) {
    return itemsID[0];
}

function cFilterExcludeValuesFromArray(values, array) {
    var arrayClone = [].concat(array);
    var currentValueIndex;
    if (Array.isArray(arrayClone)) {
        if (!Array.isArray(values)) {
            values = [values];
        }
        
        for (currentValueIndex = 0; currentValueIndex < values.length; currentValueIndex++) {
            if (arrayClone.includes(values[currentValueIndex])) {
                arrayClone.splice(arrayClone.indexOf(values[currentValueIndex]), 1);
            }
        }
        return arrayClone;
    }
}