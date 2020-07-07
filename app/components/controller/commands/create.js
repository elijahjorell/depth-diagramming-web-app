function cCreateNewItem(x, y) {
    mItems.database.push(new Item(x, y, mItems.baseRadius));
    mItemsUpdateTextBox(mItems.uniqueCounter);
    mItems.uniqueCounter += 1;
}