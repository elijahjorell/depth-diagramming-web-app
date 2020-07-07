var mStyles = {
    items: []
}

class Style {
    constructor(name, circleFillColour, circleStrokeColour, ringsFillColour, ringsStrokeColour, textFillColour) {
        this.name = name;
        this.circleFillColour = circleFillColour;
        this.circleStrokeColour = circleStrokeColour;
        this.ringsFillColour = ringsFillColour;
        this.ringsStrokeColour = ringsStrokeColour;
        this.textFillColour = textFillColour;
    }
}

function mStylesCreateNew(component, name, circleFillValues, circleStrokeValues, ringsFillValues, ringsStrokeValues, textFillValues) {
    mStyles[component].push(new Style(name, 
                            mColoursCreateNew(circleFillValues[0], circleFillValues[1]),
                            mColoursCreateNew(circleStrokeValues[0], circleStrokeValues[1]),
                            mColoursCreateNew(ringsFillValues[0], ringsFillValues[1]),
                            mColoursCreateNew(ringsStrokeValues[0], ringsStrokeValues[1]),
                            mColoursCreateNew(textFillValues[0], textFillValues[1])))
}

function mStylesInitialise() {
    mStylesCreateNew('items', 'default', ['#FFFFFF', 255], ['#FFFFFF', 255], ['#FFFFFF', 0], ['#FFFFFF', 255], ['#000000', 255]);
    mStylesCreateNew('items', 'default-hover', ['#FFFFFF', 255], ['#FFFFFF', 255], ['#FFFFFF', 0], ['#FFE699', 255], ['#000000', 255]);
    mStylesCreateNew('items', 'default-selected', ['#FFE699', 255], ['#FFE699', 255], ['#FFE699', 0], ['#FFFFFF', 255], ['#000000', 255]);
    mStylesCreateNew('items', 'default-selected-hover', ['#FFE699', 255], ['#FFE699', 255], ['#FFE699', 0], ['#FFE699', 255], ['#000000', 255]);
    mStylesCreateNew('items', 'parent', ['#FFFFFF', 0], ['#FFFFFF', 255], ['#FFFFFF', 0], ['#FFFFFF', 255], ['#FFFFFF', 255]);
    mStylesCreateNew('items', 'parent-hover', ['#FFFFFF', 0], ['#FFFFFF', 255], ['#FFFFFF', 0], ['#FFE699', 255], ['#FFFFFF', 255]);
    mStylesCreateNew('items', 'parent-selected', ['#FFE699', 0], ['#FFE699', 255], ['#FFE699', 0], ['#FFFFFF', 255], ['#FFFFFF', 255]);
    mStylesCreateNew('items', 'parent-selected-hover', ['#FFE699', 0], ['#FFE699', 255], ['#FFE699', 0], ['#FFE699', 255], ['#FFFFFF', 255]);
}

function mStylesUpdateItems() {
    var i;
    for (i = 0; i < mItems.database.length; i++) {
        // if default
        if (mItems.database[i].structure.children.length === 0) {
        
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

function mStylesAccessComponentStyle(component, styleName) {
    var i;
    for (i = 0; i < mStyles.items.length; i++) {
        if (mStyles[component][i].name === styleName) {
            return mStyles[component][i];
        }
    }
}