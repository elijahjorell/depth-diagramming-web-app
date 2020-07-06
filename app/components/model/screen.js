var screenCoordinate;
var screenDimensions;
var screenCurrentScale = 1;

function mScreenConvertCoordinateRelativeToReal(x, y) {
    return {
        x: (x - mOrigin.coordinate.x) / screenCurrentScale,
        y: (y - mOrigin.coordinate.y) / screenCurrentScale
    };
}