const SCREEN_PAN_SPEED = 0.7;
var screenCoordinates;
var screenDimensions;
var screenCurrentScale = 1;
var screenPanState = false;

function screenPanBegin() {
    screenPanState = true;
}

function screenPanOn() {
    if (screenPanState) {
        coordinatesOrigin.x -= SCREEN_PAN_SPEED * (cursorPreviousCoordinateRelativeToScreen.x - mouseX);
        coordinatesOrigin.y -= SCREEN_PAN_SPEED * (cursorPreviousCoordinateRelativeToScreen.y - mouseY);
    }
}

function screenPanEnd() {
    screenPanPreviousCursorCoordinate = undefined;
    screenPanState = false;
}

function screenZoom() {

}