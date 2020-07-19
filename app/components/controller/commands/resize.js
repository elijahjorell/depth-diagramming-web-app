function cResizeIDBasedOnChildren(itemID) {
    var itemIndex = mItemsGetIndexOfID(itemID);
    mItems.database[itemIndex].dimensions.r = mItems.baseRadius + mItems.baseRadius * (mItems.database[itemIndex].structure.children.length);
}