var cZoom = {
    zoomFactor: 1.05,
}

function cZoomOn(event) {
    var zoomDirection;
    if (event.deltaY > 0) {
        mScreen.scale /= cZoom.zoomFactor;
        zoomDirection = -1;
      } else if (event.deltaY < 0) {
        mScreen.scale *= cZoom.zoomFactor;
        zoomDirection = 1;
      }
    // mOrigin.coordinate.x -= zoomDirection * mCursor.coordinates.current * mScreen.scale * (cZoom.zoomFactor - 1);
    // mOrigin.coordinate.y -= zoomDirection * mCursor.coordinates.current * mScreen.scale * (cZoom.zoomFactor - 1);
}