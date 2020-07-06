function cCreateNewItemAtCursor() {
    mItems.database.push(new Item(mCursor.coordinate.current.x, 
                             mCursor.coordinate.current.y, 
                             mItems.baseRadius));
    mItems.uniqueCounter += 1;
}