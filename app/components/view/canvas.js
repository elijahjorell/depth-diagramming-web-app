function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('app');
    coordinatesUpdateOrigin();
}

function draw() {
    translate(coordinatesOrigin.x, coordinatesOrigin.y);
    cursorUpdateCoordinatesReal();
    cursorUpdateDetectedItemsID();
    cursorUpdateDetectedItemsExcludingGrabbedID()
    cursorUpdateDetectedFrontItemID();
    cursorUpdateStyle();
    cPanOn();
    cSelectAreaOn();
    cGrabOn();
    canvasDrawBackground();
    canvasDrawItems();
    canvasDrawSelectArea();
    cursorUpdatePreviousCoordinate();
}

function canvasDrawBackground() {
    background(255);
    noStroke();
    fill(34, 42, 53)
    rect(-windowWidth/2, - windowHeight/2, windowWidth, windowHeight)
}

function canvasDrawItems() {
    for (i = 0; i < mItems.IDs.length; i++) {
        // ring
        if (mCursor.IDs.front === mItems.IDs[i].id) {
            stroke(255, 230, 153);
        } else {
            stroke(180, 199, 231);
        }
        fill(255, 0);
        ellipse(mItems.IDs[i].coordinate.x,
                mItems.IDs[i].coordinate.y,
                mItems.IDs[i].dimensions.r * 2 + 20);
        
        // circle
        noStroke();
        if (cSelectAreaDetectedItems.includes(mItems.IDs[i].id) || 
            cSelectItemsArray.includes(mItems.IDs[i].id)) {
            fill(255, 230, 153,);
        } else {
            fill(255);
        }
        ellipse(mItems.IDs[i].coordinate.x,
                mItems.IDs[i].coordinate.y,
                mItems.IDs[i].dimensions.r * 2);

        // text
        fill(0);
        textSize(18);
        text(mItems.IDs[i].name, 
             mItems.IDs[i].coordinate.x - textWidth(mItems.IDs[i].name)/2,
             mItems.IDs[i].coordinate.y + textAscent()/2);

        // stroke(0);
        // line(mItems.IDs[i].coordinate.x - mItems.IDs[i].dimensions.r,
        //      mItems.IDs[i].coordinate.y,
        //      mItems.IDs[i].coordinate.x + mItems.IDs[i].dimensions.r,
        //      mItems.IDs[i].coordinate.y)
    }
}

function canvasDrawSelectArea() {
    if (cSelectAreaOriginCoordinate !== undefined) {
        stroke(255);
        fill(255, 120);
        rect(cSelectAreaTopLeftCoordinate.x, cSelectAreaTopLeftCoordinate.y, cSelectAreaDimensions.w, cSelectAreaDimensions.h);
    }
}