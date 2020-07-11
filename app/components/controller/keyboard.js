function keyPressed() {
    // if clicked on canvas
    if (document.activeElement.tagName === 'BODY') {
        if (keyCode === ENTER) {
            cCreateNewItem(mCursor.coordinates.current.x, mCursor.coordinates.current.y);
            cSelectEnd();
            cSelectBegin(mItems.database[mItems.database.length - 1].id);
            cEditItemTextBoxBegin(mItems.database[mItems.database.length - 1].id);
            cGrabBegin(mItems.database[mItems.database.length - 1].id);
        } else if (keyCode === DELETE) {
            cDeleteIDs(cSelect.IDs);
            cSelectEnd();
        } else if (keyCode === 32) {
            console.log(mItems.database);
        } else if (keyCode === UP_ARROW) {
            cMoveArrowKeysStart();
        } else if (keyCode === DOWN_ARROW) {
            cMoveArrowKeysStart();
        } else if (keyCode === LEFT_ARROW) {
            cMoveArrowKeysStart();
        } else if (keyCode === RIGHT_ARROW) {
            cMoveArrowKeysStart();
        }
    
    // if clicked on item textbox editor
    } else if (document.activeElement.tagName === 'TEXTAREA') {
        if (keyCode === ENTER) {
            cGrabEnd();
            cEditItemTextBoxEnd();
        }
    }
}