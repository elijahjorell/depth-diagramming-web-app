function keyPressed() {
    if (keyCode === ENTER) {
        cCreateNewItem(mCursor.coordinates.current.x, mCursor.coordinates.current.y);
    } else if (keyCode === DELETE) {
        cDeleteIDs(cSelect.IDs);
        cSelectEnd();
    } else if (keyCode === 32) {
        console.log(mItems.database);
    }
}