function keyPressed() {
    if (keyCode === ENTER) {
        itemsCreateNew(mCursor.coordinate.current.x, 
                       mCursor.coordinate.current.y, 
                       BASE_ITEM_RADIUS);
    }

    if (keyCode === 32) {
        console.log(mItems.IDs);
    }
}