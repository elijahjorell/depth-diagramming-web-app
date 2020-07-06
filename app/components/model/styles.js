var mStyles = {
    database: []
}

class Style {
    constructor(name, circleFillHex, circleFillAlpha, 
                circleStrokeHex, circleStrokeAlpha, ringsFillHex,
                ringsFillAlpha, ringsStrokeHex, ringsStrokeAlpha,
                textFillHex, textFillAlpha) {
        this.name = name;
        this.circleFillHex = circleFillHex;
        this.circleFillAlpha = circleFillAlpha;
        this.circleStrokeHex =  circleStrokeHex;
        this.circleStrokeAlpha = circleStrokeAlpha;
        this.ringsFillHex = ringsFillHex;
        this.ringsFillAlpha = ringsFillAlpha;
        this.ringsStrokeHex =  ringsStrokeHex;
        this.ringsStrokeAlpha = ringsStrokeAlpha;
        this.textFillHex = textFillHex;
        this.textFillAlpha = textFillAlpha;
    }
}

mStyles.database.push(new Style('default', '#FFFFFF', 255, '#FFFFFF', 255, '#FFFFFF', 0, '#FFFFFF', 255, '#000000', 255));
mStyles.database.push(new Style('default-hover', '#FFFFFF', 255, '#FFFFFF', 255, '#FFFFFF', 0, '#FFE699', 255, '#000000', 255));
mStyles.database.push(new Style('default-selected', '#FFE699', 255, '#FFE699', 255, '#FFE699', 0, '#FFFFFF', 255, '#000000', 255));
mStyles.database.push(new Style('default-selected-hover', '#FFE699', 255, '#FFE699', 255, '#FFE699', 0, '#FFE699', 255, '#000000', 255));
mStyles.database.push(new Style('parent', '#FFFFFF', 0, '#FFFFFF', 255, '#FFFFFF', 0, '#FFFFFF', 255, '#FFFFFF', 255));
mStyles.database.push(new Style('parent-hover', '#FFFFFF', 0, '#FFFFFF', 255, '#FFFFFF', 0, '#FFE699', 255, '#FFFFFF', 255));
mStyles.database.push(new Style('parent-selected', '#FFE699', 0, '#FFE699', 255, '#FFE699', 0, '#FFFFFF', 255, '#FFFFFF', 255));
mStyles.database.push(new Style('parent-selected-hover', '#FFE699', 0, '#FFE699', 255, '#FFE699', 0, '#FFE699', 255, '#FFFFFF', 255));

function mStylesUpdateItems() {
    var i;
    for (i = 0; i < mItems.database.length; i++) {
        // if default
        if (mItems.database[i].structure.parent !== undefined) {
        
            // if selected + hovered
            if ((cSelectArea.IDs.includes(mItems.database[i].id) || cSelect.IDs.includes(mItems.database[i].id)) &&
                 mCursor.IDs.front === mItems.database[i].id) {
                mItems.database[i].style = 'default-selected-hover';

            // if selected
            } else if (cSelectArea.IDs.includes(mItems.database[i].id) || cSelect.IDs.includes(mItems.database[i].id)) {
                mItems.database[i].style = 'default-selected';

            // if hovered
            } else if (mCursor.IDs.front === mItems.database[i].id) {
                mItems.database[i].style = 'default-hover';

            // if no interaction    
            } else {
                mItems.database[i].style = 'default';
            }

        // if parent
        } else {

            // if selected + hovered
            if ((cSelectArea.IDs.includes(mItems.database[i].id) || cSelect.IDs.includes(mItems.database[i].id)) &&
            mCursor.IDs.front === mItems.database[i].id) {
            mItems.database[i].style = 'parent-selected-hover';

            // if selected
            } else if (cSelectArea.IDs.includes(mItems.database[i].id) || cSelect.IDs.includes(mItems.database[i].id)) {
            mItems.database[i].style = 'parent-selected';

            // if hovered
            } else if (mCursor.IDs.front === mItems.database[i].id) {
            mItems.database[i].style = 'parent-hover';

            // if no interaction    
            } else {
            mItems.database[i].style = 'parent';
            }
        }
    }
}

function mStylesAccessStyle(styleName) {
    var i;
    for (i = 0; i < mStyles.database.length; i++) {
        if (mStyles.database[i].name === styleName) {
            return mStyles.database[i];
        }
    }
}