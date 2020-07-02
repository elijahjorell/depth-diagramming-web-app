// selection;
var commandsGrabItemsOffsetArray = [];
var commandsAreaSelectReferenceCoordinate;

function commandsSelectItems(targetItems) {
    if (Array.isArray(targetItems)) {
        itemsSelected.concat(targetItems);
    } else {
        itemsSelected.push(targetItems);
    }
    commandLog.push('Selected item(s): ' + itemsSelected);
}

function commandsBeginAreaSelectItems() {
    commandsAreaSelectReferenceCoordinate = {
        x: cursorCoordinatesTranslated.x,
        y: cursorCoordinatesTranslated.y
    }
}

function commandsEndAreaSelectItems() {
    commandsAreaSelectReferenceCoordinate = undefined;
}

function commandsDeselectItems() {
    commandLog.push('Deselected item(s): ' + itemsSelected);
    itemsSelected = [];
}

function commandsGrabItems(targetItems) {
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
            offsetX: cursorCoordinatesTranslated.x - items[currentItemIndex].coordinates.raw.x, // change to translated
            offsetY: cursorCoordinatesTranslated.y - items[currentItemIndex].coordinates.raw.y  // change to translated
        })
    }
}

function commandsLetGoOfGrabbedItems() {
    commandLog.push('Letting go of grabbed item(s): ' + itemsGrabbed)  
    itemsGrabbed = [];
    commandsGrabItemsOffsetArray = [];
}


// relationships

function commandsFormParentChildRelationships(child, parent) {

}

function commandsRemoveParentChildRelationship(child, parent) {

}