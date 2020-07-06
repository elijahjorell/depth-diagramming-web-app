function mArraysExcludeValuesFromArray(values, array) {
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