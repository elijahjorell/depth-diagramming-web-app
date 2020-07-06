function cCreateNewItemAtCursor() {
    mItems.database.push(new Item(mCursor.coordinates.current.x, 
                         mCursor.coordinates.current.y, 
                         mItems.baseRadius));
    mItems.uniqueCounter += 1;
}