function commandsFilterGetIndexOfID(itemID) {
    for (i = 0; i < items.length; i++) {
        if (itemID === items[i].id) {
            return i;
        }
    }
}

function commandsFilterGetFrontItemID(itemsID) {
    return itemsID[0];
}

function commandsFilterExcludeValuesFromArray(values, array) {
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