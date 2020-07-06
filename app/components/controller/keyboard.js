function keyPressed() {
    if (keyCode === ENTER) {
        cCreateNewItemAtCursor();
    } else if (keyCode === DELETE) {
        cDeleteIDs(cSelect.IDs);
        cSelectEnd();
    } else if (keyCode === 32) {
        console.log(mItems.database);
    }
}