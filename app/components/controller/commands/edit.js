var cEdit = {
    active: false
}

function cEditItemTextBox(itemID) {
    var itemIndex = mItemsGetIndexOfID(itemID);
    var itemTextBoxEditor = createElement('textarea');
    var itemTextCoordinateRelative = mScreenConvertCoordinateRealToRelative(mItems.database[itemIndex].textBox.coordinate.x,
                                                                            mItems.database[itemIndex].textBox.coordinate.y);
    itemTextBoxEditor.position(itemTextCoordinateRelative.x, itemTextCoordinateRelative.y);
}

