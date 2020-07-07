function mDetectionIsCoordinateWithinCircle(coordinate, circleCoordinate, circleRadius) {
    if (dist(coordinate.x, coordinate.y, circleCoordinate.x, circleCoordinate.y) < circleRadius) {
        return true;
    } else {
        return false;
    }
}