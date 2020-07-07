function mColoursConvertHexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)]
}

function mColoursCreateNew(hex, alpha) {
    var values = mColoursConvertHexToRgb(hex).concat([alpha]);
    var newColour = color(values);
    return newColour;
}

