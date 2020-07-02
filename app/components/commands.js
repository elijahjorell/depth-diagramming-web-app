// selection
var commandsGrabItemReferenceCoordinate;

function commandsSelectItems(targetItems) {
    if (Array.isArray(targetItems)) {
        itemsSelected.concat(targetItems);
    } else {
        itemsSelected.push(targetItems);
    }
    commandLog.push('Selected item(s) ' + itemsSelected);
}

function commandsAreaSelectItems() {
    
}

function commandsDeselectItems() {
    commandLog.push('Deselected item(s) ' + itemsSelected);
    itemsSelected = [];
}

function commandsGrabItems(targetItems) {
    if (Array.isArray(targetItems)) {
        itemsGrabbed.concat(targetItems);
    } else {
        itemsGrabbed.push(targetItems);
    }
    commandLog.push('Grabbed item(s) ' + itemsSelected) 
    commandsGrabItemReferenceCoordinate = {
        x: cursorCoordinatesTranslated.x,
        y: cursorCoordinatesTranslated.y
    }
}

function commandsMoveGrabbedItems() {
    
}

function commandsLetGoOfGrabbedItems() {
    commandLog.push('Letting go of grabbed item(s) ' + itemsGrabbed)  
    itemsGrabbed = [];
    commandsGrabItemReferenceCoordinate = undefined;
}


// relationships

function commandsFormParentChildRelationships(child, parent) {

}

function commandsRemoveParentChildRelationship(child, parent) {

}