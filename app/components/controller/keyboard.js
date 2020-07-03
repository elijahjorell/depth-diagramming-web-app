function keyPressed() {
    if (keyCode === ENTER) {
        itemsCreateNew(cursorCoordinateReal.x, 
                       cursorCoordinateReal.y, 
                       COMMANDS_STYLE_BASE_ITEM_R);
    }
}