const PAN_SPEED = 0.7;

var panState = false;

function panBegin() {
    panState = true;
}

function panOn() {
    if (panState) {
        coordinatesOrigin.x -= PAN_SPEED * (cursorPreviousCoordinateRelativeToScreen.x - mouseX);
        coordinatesOrigin.y -= PAN_SPEED * (cursorPreviousCoordinateRelativeToScreen.y - mouseY);
    }
}

function panEnd() {
    screenPanPreviousCursorCoordinate = undefined;
    panState = false;
}