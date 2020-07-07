function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('app');
    mOriginInitialise();
    mStylesInitialise();
    

    //-----------------
    // textSize(15)
    // var lowerCaseAlphabet = 'abcdefghijklmnopqrstuvwxyz'
    // var upperCaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVYWXZ'
    // var i;
    // for (i = 0; i < upperCaseAlphabet.length; i++) {
    //     console.log(upperCaseAlphabet[i], textWidth(upperCaseAlphabet[i]));
    // }
}

function draw() {
    translate(mOrigin.coordinate.x, mOrigin.coordinate.y);
    mCursorUpdateCoordinateCurrent();
    mCursorUpdateIDs();
    mCursorUpdateStyle();
    mStylesUpdateItems();
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
    var itemStyle;
    var styleColour;
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
        // rect(mItems.database[i].coordinate.x - mItems.database[i].dimensions.w,
        //      mItems.database[i].coordinate.y - mItems.database[i].dimensions.h,
        //      mItems.database[i].dimensions.w,
        //      mItems.database[i].dimensions.h)

        text(mItems.database[i].textBox.value, 
             mItems.database[i].coordinate.x - mItems.database[i].textBox.dimensions.w,
             mItems.database[i].coordinate.y + mItems.database[i].textBox.dimensions.h);
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

