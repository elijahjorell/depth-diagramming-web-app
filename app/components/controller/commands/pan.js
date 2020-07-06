var cPan = {
    active: false,
    speed: 0.7
}

function cPanBegin() {
    cPan.active = true;
}

function cPanOn() {
    if (cPan.active) {
        mOrigin.coordinate.x -= cPan.speed * (mCursor.coordinates.previousRelativeToScreen.x - mouseX);
        mOrigin.coordinate.y -= cPan.speed * (mCursor.coordinates.previousRelativeToScreen.y - mouseY);
    }
}

function cPanEnd() {
    screenPanPreviousCursorCoordinate = undefined;
    cPan.active = false;
}