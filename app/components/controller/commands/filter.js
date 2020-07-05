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
    if (Array.isArray(array)) {
        if (!Array.isArray(values)) {
            values = [values];
        }
        
        var currentValueIndex;
        for (currentValueIndex = 0; currentValueIndex < values.length; currentValueIndex++) {
            if (array.includes(values[currentValueIndex])) {
                array.splice(array.indexOf(values[currentValueIndex]))
            }
        }
        return array;
    }
}