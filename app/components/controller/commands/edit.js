var cEdit = {
    active: false,
    id: undefined,
    itemTextBoxEditor: undefined,
    stringLengthDifference: undefined
}

function cEditItemTextBoxBegin(itemID) {
    var itemIndex = mItemsGetIndexOfID(itemID);
    if (!cEdit.active) {
        cEdit.active = true;
        cEdit.id = itemID;
        cEdit.itemTextBoxEditor = createElement('textarea');
        cEdit.itemTextBoxEditor.id(itemID + '-textbox')
        cEdit.itemTextBoxEditor.value(mItems.database[itemIndex].textBox.value)
        cEditItemTextBoxUpdatePositionAndDimensions();
        cEdit.itemTextBoxEditor.style('resize', 'none');
        cEdit.itemTextBoxEditor.style('background-color', 'rgba(0, 0, 0, 0)');
        cEdit.itemTextBoxEditor.style('border', '0');
        cEdit.itemTextBoxEditor.style('color', 'rgba(0, 0, 0, 0)');
        cEdit.itemTextBoxEditor.style('caret-color', 'rgba(0, 0, 0, 255)');
        cEdit.itemTextBoxEditor.style('font-family', 'sans-serif');
        cEdit.itemTextBoxEditor.style('font-size', mItems.database[itemIndex].textBox.fontSize + 'px');
        cEdit.itemTextBoxEditor.style('margin', '0');
        cEdit.itemTextBoxEditor.style('overflow', 'hidden');
        cEdit.itemTextBoxEditor.style('padding', '0');
        cEdit.itemTextBoxEditor.style('pointer-events', 'none');
        cEdit.itemTextBoxEditor.style('text-transform', 'uppercase');
        document.getElementById(itemID + '-textbox').addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
            }
          });
        cEdit.itemTextBoxEditor.elt.focus();
        cEdit.itemTextBoxEditor.elt.select();
    }
}

function cEditItemTextBoxOn() {
    if (cEdit.active) {
        if (document.activeElement.id !== cEdit.id + '-textbox') {
            cEditItemTextBoxEnd();
        } else {
            cEditItemTextBoxUpdateValue();
            cEditItemTextBoxReduceTextSizeToKeepWIthinItemBounds();
            cEditItemTextBoxUpdatePositionAndDimensions();
        }
    }
}

function cEditItemTextBoxUpdateValue() {
    var itemValue = mItems.database[mItemsGetIndexOfID(cEdit.id)].textBox.value;
    var editorValue = cEdit.itemTextBoxEditor.elt.value
    if (itemValue.toUpperCase() !== editorValue.toUpperCase()) {        
        cEdit.stringLengthDifference = editorValue.length - itemValue.length;
        mItems.database[mItemsGetIndexOfID(cEdit.id)].textBox.value = editorValue.toUpperCase();
    }
}

function cEditItemTextBoxUpdatePositionAndDimensions() {
    var itemIndex = mItemsGetIndexOfID(cEdit.id);
    var itemTextCoordinateRelative = mScreenConvertCoordinateRealToRelative(mItems.database[itemIndex].textBox.coordinate.x,
        mItems.database[itemIndex].textBox.coordinate.y);
    var textAreaTopPaddingHeight;
    
    mItemsTextBoxUpdateDimensions(cEdit.id);
    
    // update textarea
    textSize(mItems.database[itemIndex].textBox.fontSize);
    textAreaTopPaddingHeight = textAscent() * 0.2;
    cEdit.itemTextBoxEditor.position(itemTextCoordinateRelative.x, itemTextCoordinateRelative.y - textAreaTopPaddingHeight);
    cEdit.itemTextBoxEditor.size(mItems.database[itemIndex].textBox.dimensions.w * mScreen.scale,
                                 (mItems.database[itemIndex].textBox.dimensions.h + textAreaTopPaddingHeight * 2) * mScreen.scale);
}

function cEditItemTextBoxReduceTextSizeToKeepWIthinItemBounds() {
    var itemIndex = mItemsGetIndexOfID(cEdit.id);
    var w = mItems.database[itemIndex].textBox.dimensions.w;
    var h = mItems.database[itemIndex].textBox.dimensions.h;
    var r = mItems.database[itemIndex].dimensions.r;
    var proposedTextSize;
    var proposedWidth;
    var proposedHeight;
    
    /////// --- CHANGE THIS WHOLE SECTION TO JUST ADD A "..." WHEN GOING OUTSIDE THE BOUNDS
    // if textbox would go outside the bounds of the circle
    if (Math.sqrt(Math.pow(h / 2, 2) + Math.pow(w / 2, 2)) > r * (1 - mItems.basePaddingRatio)) {
        mItems.database[itemIndex].textBox.fontSize -= 1;
        cEdit.itemTextBoxEditor.style('font-size', mItems.database[itemIndex].textBox.fontSize + 'px');
    }
    // if deleting characters
    if (cEdit.stringLengthDifference < 0) {
        if (mItems.database[itemIndex].textBox.fontSize < mItems.baseTextBoxTextSize) {
            proposedTextSize = textSize(mItems.database[itemIndex].textBox.fontSize + 1);
            proposedWidth = textWidth(proposedTextSize);
            proposedHeight = textAscent() * 0.8;

            // if proposed textbox with +1 textsize dimensions would not go outside the bounds of the cirlce
            if (Math.sqrt(Math.pow(proposedHeight / 2, 2) + Math.pow(proposedHeight / 2, 2)) < r * (1 - mItems.basePaddingRatio)) {
                mItems.database[itemIndex].textBox.fontSize += 1;
                cEdit.itemTextBoxEditor.style('font-size', mItems.database[itemIndex].textBox.fontSize + 'px');
            }
        }
    }
}

function cEditItemTextBoxEnd() {
    cEdit.itemTextBoxEditor.remove();
    cEditItemTextBoxIfBlank(cEdit.id);
    cEdit = {
        active: false,
        id: undefined,
        itemTextBoxEditor: undefined,
        stringLengthDifference: undefined
    }
}

function cEditItemTextBoxIfBlank(itemID) {
    var itemIndex = mItemsGetIndexOfID(itemID);
    if (mItems.database[itemIndex].textBox.value === '') {
        mItems.database[itemIndex].textBox.value = 'ITEM ' + mItems.database[itemIndex].id;
        mItemsTextBoxUpdateDimensions(itemID);
    }
}