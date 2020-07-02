function mousePressed() {
    if (mouseButton === LEFT) {
        // while items are grabbed
        if (itemsGrabbed.length > 0) { 
                commandsGrabStop();

        // while items are selected
        } else if (itemsSelected.length > 0) { 

            // click on canvas
            if (cursorDetectedItemID === undefined) {
                commandsSelectStop();
                commandsSelectAreaBegin();

            // click on a selected item
            } else if (itemsSelected.includes(cursorDetectedItemID)) {
                commandsGrabBegin(cursorDetectedItemID);

            // click on a non-selected item
            } else {
                commandsSelectStop();
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
        if (commandsAreaSelectReferenceCoordinate !== undefined) {
            commandsSelectAreaEnd();
        }
    }
}

