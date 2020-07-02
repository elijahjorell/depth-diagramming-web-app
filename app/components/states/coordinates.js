var coordinatesOrigin;

function coordinatesUpdateOrigin() {
    coordinatesOrigin = {
        x: windowWidth/2,
        y: windowHeight/2
    }
}

function coordinatesConvertRawToTranslated(x, y) {
    return {
        x: (x - coordinatesOrigin.x) / screenCurrentScale,
        y: (y - coordinatesOrigin.y) / screenCurrentScale
    };
}