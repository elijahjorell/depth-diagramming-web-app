function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('app');
    mOriginInitialise();
    mStylesInitialise();
}

function draw() {
    translate(mOrigin.coordinate.x, mOrigin.coordinate.y);
    mCursorUpdateCoordinateCurrent();
    mCursorUpdateDetectedIDs();
    mCursorUpdateDetectedComponentOfSelectedIDs();
    mCursorUpdateStyle();
    mStylesUpdateItems();
    mItemsTextBoxUpdateCoordinates();
    cPanOn();
    cSelectAreaOn();
    cGrabOn();
    cEditItemTextBoxOn();
    cMoveArrowKeysOn();
    vCanvasDrawBackground();
    vCanvasDrawItems();
    vCanvasDrawSelectArea();
    mCursorUpdateCoordinatePreviousRelativeToScreen();
}

function vCanvasDrawBackground() {
    background(255);
    noStroke();
    fill(34, 42, 53);
    rect(-windowWidth/2, - windowHeight/2, windowWidth, windowHeight);
}

function vCanvasDrawItems() {
    var i;
    var itemStyle;
    for (i = 0; i < mItems.database.length; i++) {
        // access style
        itemStyle = mStylesAccessComponentStyle('items', mItems.database[i].style);
        
        // ring
        stroke(itemStyle.ringsStrokeColour)
        fill(itemStyle.ringsFillColour);
        ellipse(mItems.database[i].coordinate.x,
                mItems.database[i].coordinate.y,
                mItems.database[i].dimensions.r * 2 + 20);
        
        // circle
        stroke(itemStyle.circleStrokeColour)
        fill(itemStyle.circleFillColour);
        ellipse(mItems.database[i].coordinate.x,
                mItems.database[i].coordinate.y,
                mItems.database[i].dimensions.r * 2);

        // text
        noStroke();
        fill(itemStyle.textFillColour);
        textSize(mItems.database[i].textBox.fontSize);
        text(mItems.database[i].textBox.value, 
             mItems.database[i].coordinate.x - mItems.database[i].textBox.dimensions.w / 2,
             mItems.database[i].coordinate.y + mItems.database[i].textBox.dimensions.h / 2); // does not use textBox coordinate because text lags behind when moving fast
    }
}

function vCanvasDrawSelectArea() {
    if (cSelectArea.active) {
        stroke(255);
        fill(255, 120);
        rect(cSelectArea.coordinates.topLeftCorner.x, 
             cSelectArea.coordinates.topLeftCorner.y, 
             cSelectArea.dimensions.w, 
             cSelectArea.dimensions.h);
    }
}

