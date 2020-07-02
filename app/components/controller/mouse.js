function mousePressed() {
    if (mouseButton === LEFT) {
        // while items are grabbed
        if (itemsGrabbed.length > 0) { 
                commandsGrabEnd();
        // while items are selected
        } else if (itemsSelected.length > 0) { 
            // click on canvas
            if (cursorDetectedItemID === undefined) {
                commandsSelectEnd();
                commandsSelectAreaBegin();
            // click on a selected item
            } else if (itemsSelected.includes(cursorDetectedItemID)) {
                commandsGrabBegin(itemsSelected);
            // click on a non-selected item
            } else {
                commandsSelectEnd();
                commandsSelectItems(cursorDetectedItemID);
            }
        // while nothing is grabbed or selected
        } else { 
            // click on the canvas
            if (cursorDetectedItemID === undefined) {
                commandsSelectAreaBegin();
            // click on canvas
            } else {
                commandsSelectItems(cursorDetectedItemID);
            }
        }
    }
}

function mouseReleased() {
    if (mouseButton === LEFT) {
        if (commandsSelectAreaOriginCoordinate !== undefined) {
            commandsSelectItems(commandsSelectAreaDetectedItems);
            commandsSelectAreaEnd();
        }
    }
}

