var cZoom = {
    zoomFactor: 1.25,
}

function cZoomOn(event) {
    // zoom out
    
    if (event.deltaY > 0) {
        mScreen.scale /= cZoom.zoomFactor; 
        mOrigin.coordinate.x += mCursor.coordinates.current.x * mScreen.scale * (cZoom.zoomFactor - 1);
        mOrigin.coordinate.y += mCursor.coordinates.current.y * mScreen.scale * (cZoom.zoomFactor - 1);
    // zoom in
    } else if (event.deltaY < 0) {
        mOrigin.coordinate.x -= mCursor.coordinates.current.x * mScreen.scale * (cZoom.zoomFactor - 1);
        mOrigin.coordinate.y -= mCursor.coordinates.current.y * mScreen.scale * (cZoom.zoomFactor - 1);
        mScreen.scale *= cZoom.zoomFactor; 
    }
    mScreenUpdate();
}