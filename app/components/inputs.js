function mousePressed() {
    // something grabbed
        // click on an item -> make grabbed item a child of that item
        // click on canvas -> let go of grabbed item
    
    // something (1 or more) selected
        // click on canvas -> deselect old item
        // click on a selected item -> grab all item 
        // click on a non-selected item -> deselect old item, select new item

    // nothing selected
        // click on an item -> selected
        // click on canvas -> area select

    // might have to move these to released
    if (mouseButton === LEFT) {
        if (itemsGrabbed.length > 0) {
            commandsLetGoOfGrabbedItems();
        } else if (itemsSelected.length > 0) {
            if (cursorDetectedItemID === undefined) {
                commandsDeselectItems();
                commandsBeginAreaSelectItems();
            } else if (itemsSelected.includes(cursorDetectedItemID)) {
                commandsGrabItems(cursorDetectedItemID);
            } else {
                commandsDeselectItems();
                commandsSelectItems(cursorDetectedItemID);
            }
        } else {
            if (cursorDetectedItemID !== undefined) {
                commandsSelectItems(cursorDetectedItemID);
            } else {
                commandsBeginAreaSelectItems();
            }
        }
    }
}

function mouseReleased() {
    if (mouseButton === LEFT) {
        if (commandsAreaSelectReferenceCoordinate !== undefined) {
            commandsEndAreaSelectItems();
        }
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        itemsCreateNew(cursorCoordinatesTranslated.x, 
                       cursorCoordinatesTranslated.y, 
                       50);
    }
    if (keyCode === 32) {

    }
}