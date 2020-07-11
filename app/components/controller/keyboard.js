function keyPressed() {
    if (keyCode === ENTER) {
        cCreateNewItem(mCursor.coordinates.current.x, mCursor.coordinates.current.y);
        cSelectEnd();
        cSelectBegin(mItems.database[mItems.database.length - 1].id);
        cEditItemTextBoxBegin(mItems.database[mItems.database.length - 1].id);
    } else if (keyCode === DELETE) {
        cDeleteIDs(cSelect.IDs);
        cSelectEnd();
    } else if (keyCode === 32) {
        // console.log(mItems.database);
    }
}