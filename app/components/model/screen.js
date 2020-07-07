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

function mScreenConvertCoordinateRelativeToReal(xRelative, yRelative) {
    return {
        x: (xRelative - mOrigin.coordinate.x) / mScreen.scale,
        y: (yRelative - mOrigin.coordinate.y) / mScreen.scale
    };
}

function mScreenConvertCoordinateRealToRelative(xReal, yReal) {
    return {
        x: mScreen.scale * xReal + mOrigin.coordinate.x,
        y: mScreen.scale * yReal + mOrigin.coordinate.y
    };
}