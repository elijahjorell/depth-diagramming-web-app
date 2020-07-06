function cFilterGetIndexOfID(itemID) {
    var i;
    for (i = 0; i < mItems.database.length; i++) {
        if (itemID === mItems.database[i].id) {
            return i;
        }
    }
}

function cFilterGetFrontItemID(itemsID) {
    return itemsID[0];
}

function cFilterExcludeValuesFromArray(values, array) {
    var i;
    var arrayClone = [].concat(array);
    if (Array.isArray(arrayClone)) {
        if (!Array.isArray(values)) {
            values = [values];
        }
        
        for (i = 0; i < values.length; i++) {
            if (arrayClone.includes(values[i])) {
                arrayClone.splice(arrayClone.indexOf(values[i]), 1);
            }
        }
        return arrayClone;
    }
}