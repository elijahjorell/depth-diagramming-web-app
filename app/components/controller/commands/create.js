function cCreateNewItem(x, y) {
    mItems.database.push(new Item(x, y, mItems.baseRadius));
    mItemsTextBoxInitialise(mItems.uniqueCounter);
    mItems.uniqueCounter += 1;
}