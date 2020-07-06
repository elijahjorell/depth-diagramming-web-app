var mScreen = {
    coordinate: {
        x: undefined,
        y: undefined
    },
    dimensions: {
        w: undefined,
        h: undefined
    },
    scale: 1,
}

function mScreenConvertCoordinateRelativeToReal(x, y) {
    return {
        x: (x - mOrigin.coordinate.x) / mScreen.scale,
        y: (y - mOrigin.coordinate.y) / mScreen.scale
    };
}