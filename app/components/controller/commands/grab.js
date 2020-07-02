var commandsGrabItemsOffsetArray = [];

function commandsGrabBegin(targetItems) {
    commandLog.push('Grabbed item(s): ' + itemsSelected) 
    if (Array.isArray(targetItems)) {
        itemsGrabbed.concat(targetItems);
    } else {
        itemsGrabbed.push(targetItems);
    }

    for (j = 0; j < itemsGrabbed.length; j++) { // minimise for loops
        currentItemIndex = itemsGetIndexOfID(itemsGrabbed[j]);
        commandsGrabItemsOffsetArray.push({
            id: itemsGrabbed[j],
            offsetX: cursorCoordinatesReal.x - items[currentItemIndex].coordinates.real.x,
            offsetY: cursorCoordinatesReal.y - items[currentItemIndex].coordinates.real.y
        })
    }
}

function commandsGrabStop() {
    commandLog.push('Letting go of grabbed item(s): ' + itemsGrabbed)  
    itemsGrabbed = [];
    commandsGrabItemsOffsetArray = [];
}

