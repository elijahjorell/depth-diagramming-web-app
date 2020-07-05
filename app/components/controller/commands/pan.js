const PAN_SPEED = 0.7;

var panState = false;

function cPanBegin() {
    panState = true;
}

function cPanOn() {
    if (panState) {
        coordinatesOrigin.x -= PAN_SPEED * (mCursor.coordinate.previousRelativeToScreen.x - mouseX);
        coordinatesOrigin.y -= PAN_SPEED * (mCursor.coordinate.previousRelativeToScreen.y - mouseY);
    }
}

function cPanEnd() {
    screenPanPreviousCursorCoordinate = undefined;
    panState = false;
}