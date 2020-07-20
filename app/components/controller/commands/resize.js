function cResizeIDBasedOnChildren(itemID) {
    var itemIndex = mItemsGetIndexOfID(itemID);
    // mItems.database[itemIndex].dimensions.r = mItems.baseRadius + mItems.baseRadius * (mItems.database[itemIndex].structure.children.length);
}

function cResizeShrink(itemID) {
    var itemIndex = mItemsGetIndexOfID(itemID);
    mItems.database[itemIndex].dimensions.r = mItems.baseRadius/(Math.pow(4, mItems.database[itemIndex].structure.depth));
}