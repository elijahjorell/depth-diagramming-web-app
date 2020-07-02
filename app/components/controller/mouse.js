function mousePressed() {
    if (mouseButton === LEFT) {
        // while items are selected
        if (itemsSelected.length > 0) { 
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
                commandsGrabBegin(itemsSelected);
            }
        // while nothing is grabbed or selected
        } else { 
            // click on the canvas
            if (cursorDetectedItemID === undefined) {
                commandsSelectAreaBegin();
            // click on item
            } else {
                commandsSelectItems(cursorDetectedItemID);
                commandsGrabBegin(itemsSelected);
            }
        }
    } else if (mouseButton === CENTER) {
        panBegin();
    }
}

function mouseReleased() {
    if (mouseButton === LEFT) {
        if (commandsSelectAreaOriginCoordinate !== undefined) {
            commandsSelectItems(commandsSelectAreaDetectedItems);
            commandsSelectAreaEnd();
        } else {
            commandsGrabEnd();
        }
    } else if (mouseButton === CENTER) {
        panEnd();
    }
}

function mouseDisableAutoscroll() {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 1) {
        e.preventDefault();
      }
    });
}

mouseDisableAutoscroll();