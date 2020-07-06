function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('app');
    mOriginInitialise();
}

function draw() {
    translate(mOrigin.coordinate.x, mOrigin.coordinate.y);
    mCursorUpdateCoordinateCurrent();
    mCursorUpdateIDs();
    mCursorUpdateStyle();
    cPanOn();
    cSelectAreaOn();
    cGrabOn();
    canvasDrawBackground();
    canvasDrawItems();
    canvasDrawSelectArea();
    mCursorUpdateCoordinatePreviousRelativeToScreen();
}

function canvasDrawBackground() {
    background(255);
    noStroke();
    fill(34, 42, 53);
    rect(-windowWidth/2, - windowHeight/2, windowWidth, windowHeight);
}

function canvasDrawItems() {
    var i;
    for (i = 0; i < mItems.database.length; i++) {
        // ring
        if (mCursor.IDs.front === mItems.database[i].id) {
            stroke(255, 230, 153);
        } else {
            stroke(180, 199, 231);
        }
        fill(255, 0);
        ellipse(mItems.database[i].coordinate.x,
                mItems.database[i].coordinate.y,
                mItems.database[i].dimensions.r * 2 + 20);
        
        // circle
        noStroke();
        if (cSelectArea.IDs.includes(mItems.database[i].id) || 
            cSelect.IDs.includes(mItems.database[i].id)) {
            fill(255, 230, 153);
        } else {
            fill(255);
        }
        ellipse(mItems.database[i].coordinate.x,
                mItems.database[i].coordinate.y,
                mItems.database[i].dimensions.r * 2);

        // text
        fill(0);
        textSize(18);
        text(mItems.database[i].name, 
             mItems.database[i].coordinate.x - textWidth(mItems.database[i].name)/2,
             mItems.database[i].coordinate.y + textAscent()/2);
    }
}

function canvasDrawSelectArea() {
    if (cSelectArea.active) {
        stroke(255);
        fill(255, 120);
        rect(cSelectArea.coordinates.topLeftCorner.x, 
             cSelectArea.coordinates.topLeftCorner.y, 
             cSelectArea.dimensions.w, 
             cSelectArea.dimensions.h);
    }
}