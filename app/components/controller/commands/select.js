var commandsAreaSelectReferenceCoordinate;

function commandsSelectItems(targetItems) {
    if (Array.isArray(targetItems)) {
        itemsSelected.concat(targetItems);
    } else {
        itemsSelected.push(targetItems);
    }
    commandLog.push('Selected item(s): ' + itemsSelected);
}

function commandsSelectAreaBegin() {
    commandsAreaSelectReferenceCoordinate = {
        x: cursorCoordinatesReal.x,
        y: cursorCoordinatesReal.y
    }
}

function commandsAreaSelectDetectItems() {
    for (i = 0; i < items.length; i++) {
        if (items[i].coordinates.real) {

        }
    }
}

function commandsAreaSelectForm() {

}

function commandsSelectAreaEnd() {
    commandsAreaSelectReferenceCoordinate = undefined;
}

function commandsSelectStop() {
    commandLog.push('Deselected item(s): ' + itemsSelected);
    itemsSelected = [];
}

