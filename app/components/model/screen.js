var mScreen = {
    coordinate: {
        x: undefined,
        y: undefined
    },
    dimensions: {
        w: undefined,
        h: undefined
    },
    scale: 1,
    helpText: []
}

function mScreenConvertCoordinateRelativeToReal(xRelative, yRelative) {
    return {
        x: (xRelative - mOrigin.coordinate.x) / mScreen.scale,
        y: (yRelative - mOrigin.coordinate.y) / mScreen.scale
    };
}

function mScreenConvertCoordinateRealToRelative(xReal, yReal) {
    return {
        x: mScreen.scale * xReal + mOrigin.coordinate.x,
        y: mScreen.scale * yReal + mOrigin.coordinate.y
    };
}

function mScreenUpdate() {
    mScreen.dimensions.w = windowWidth / mScreen.scale;
    mScreen.dimensions.h = windowHeight / mScreen.scale;
    mScreen.coordinate.x = mScreenConvertCoordinateRelativeToReal(0, 0).x;
    mScreen.coordinate.y = mScreenConvertCoordinateRelativeToReal(0, 0).y;
}

function mScreenInitialise() {
    mScreenUpdate();
    mScreen.helpText.push('CONTROLS (Currently supports mouse and keyboard only)')
    mScreen.helpText.push('------------------')
    mScreen.helpText.push('CREATE NEW ITEM  -  Press Enter')
    mScreen.helpText.push('RENAME ITEM -  Mouse left double-click on selected item text')
    mScreen.helpText.push('SELECT ITEM  -  Mouse left click while cursor is over item ')
    mScreen.helpText.push('SELECT MULTIPLE ITEMS -  Mouse left click on canvas, hold then move cursor')
    mScreen.helpText.push('GRAB AND MOVE ITEM  -  Mouse left click a selected item, hold then move cursor to desired location')
    mScreen.helpText.push('* Letting go of an item while cursor is over another item will make the grabbed item a child of the targeted item')
    mScreen.helpText.push('ZOOM  -  Mouse wheel')
    mScreen.helpText.push('PAN  -  Mouse wheel click and hold')
}


