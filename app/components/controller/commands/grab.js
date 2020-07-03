var commandsGrabItemsOffsetArray = [];

function commandsGrabBegin(targetItems) {
    commandLog.push('Grabbed item(s): ' + itemsSelected) 
    if (Array.isArray(targetItems)) {
        itemsGrabbed = itemsGrabbed.concat(targetItems);
    } else {
        itemsGrabbed.push(targetItems);
    }

    for (j = 0; j < itemsGrabbed.length; j++) { // minimise for loops
        currentItemIndex = commandsFilterGetIndexOfID(itemsGrabbed[j]);
        commandsGrabItemsOffsetArray.push({
            id: itemsGrabbed[j],
            offsetX: cursorCoordinateReal.x - items[currentItemIndex].coordinates.real.x,
            offsetY: cursorCoordinateReal.y - items[currentItemIndex].coordinates.real.y
        })
    }
}

function commandsGrabOn() {
    if (itemsGrabbed.length > 0) {
        for (i = 0; i < commandsGrabItemsOffsetArray.length; i++) {
            items[commandsGrabItemsOffsetArray[i].id].coordinates.real.x = cursorCoordinateReal.x - commandsGrabItemsOffsetArray[i].offsetX;
            items[commandsGrabItemsOffsetArray[i].id].coordinates.real.y = cursorCoordinateReal.y - commandsGrabItemsOffsetArray[i].offsetY;
        }
    }
}

function commandsGrabEnd() {
    commandLog.push('Letting go of grabbed item(s): ' + itemsGrabbed)  
    itemsGrabbed = [];
    commandsGrabItemsOffsetArray = [];
}

