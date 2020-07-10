var cEdit = {
    active: false,
    id: undefined,
    itemTextBoxEditor: undefined
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
        cEdit.itemTextBoxEditor.style('font-family', 'sans-serif');
        cEdit.itemTextBoxEditor.style('font-size', mItems.database[itemIndex].textBox.fontSize + 'px');
        cEdit.itemTextBoxEditor.style('margin', '0');
        cEdit.itemTextBoxEditor.style('overflow', 'hidden');
        cEdit.itemTextBoxEditor.style('padding', '0');
        cEdit.itemTextBoxEditor.style('text-transform', 'uppercase');
        cEdit.itemTextBoxEditor.elt.focus();
    }
}

function cEditItemTextBoxOn() {
    if (cEdit.active) {
        if (document.activeElement.id !== cEdit.id + '-textbox') {
            cEditItemTextBoxEnd();
        } else {
            cEditItemTextBoxUpdateValue();
            cEditItemTextBoxUpdatePositionAndDimensions();
        }
    }
}

function cEditItemTextBoxUpdateValue() {
    if (mItems.database[mItemsGetIndexOfID(cEdit.id)].textBox.value !== cEdit.itemTextBoxEditor.value) {
        mItems.database[mItemsGetIndexOfID(cEdit.id)].textBox.value = cEdit.itemTextBoxEditor.elt.value.toUpperCase();
    }
}

function cEditItemTextBoxUpdatePositionAndDimensions() {
    var itemIndex = mItemsGetIndexOfID(cEdit.id);
    var itemTextCoordinateRelative = mScreenConvertCoordinateRealToRelative(mItems.database[itemIndex].textBox.coordinate.x,
        mItems.database[itemIndex].textBox.coordinate.y);
    var textAreaTopPaddingHeight; 
    mItemsTextBoxUpdateDimensions(cEdit.id);
    textSize(mItems.database[itemIndex].textBox.fontSize);
    textAreaTopPaddingHeight = textAscent() * 0.2;
    cEdit.itemTextBoxEditor.position(itemTextCoordinateRelative.x, itemTextCoordinateRelative.y - textAreaTopPaddingHeight);
    cEdit.itemTextBoxEditor.size(mItems.database[itemIndex].textBox.dimensions.w,
                                 mItems.database[itemIndex].textBox.dimensions.h + textAreaTopPaddingHeight * 2);
}

function cEditItemTextBoxEnd() {
    cEdit.itemTextBoxEditor.remove();
    cEdit.id = undefined;
    cEdit.active = false;
}