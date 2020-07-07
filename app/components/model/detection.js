function mDetectionIsCoordinateWithinCircle(coordinate, circleCoordinate, circleRadius) {
    if (dist(coordinate.x, coordinate.y, circleCoordinate.x, circleCoordinate.y) < circleRadius) {
        return true;
    } else {
        return false;
    }
}

function mDetectionIsCoordinateWithinRect(coordinate, rectCoordinate, rectDimensions) {
    if (coordinate.x > rectCoordinate.x && coordinate.x < rectCoordinate.x + rectDimensions.w &&
        coordinate.y > rectCoordinate.y && coordinate.y < rectCoordinate.y + rectDimensions.h) {
        return true;
    } else {
        return false;
    }
}