var cPan = {
    state: false,
    speed: 0.7
}

function cPanBegin() {
    cPan.state = true;
}

function cPanOn() {
    if (cPan.state) {
        mOrigin.coordinate.x -= cPan.speed * (mCursor.coordinate.previousRelativeToScreen.x - mouseX);
        mOrigin.coordinate.y -= cPan.speed * (mCursor.coordinate.previousRelativeToScreen.y - mouseY);
    }
}

function cPanEnd() {
    screenPanPreviousCursorCoordinate = undefined;
    cPan.state = false;
}