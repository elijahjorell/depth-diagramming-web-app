function commandsSelectItems(targetItems) {
    if (Array.isArray(targetItems)) {
        itemsSelected = itemsSelected.concat(targetItems);
        commandLog.push('Selected items: ' + itemsSelected);
    } else {
        itemsSelected.push(targetItems);
        commandLog.push('Selected item: ' + itemsSelected);
    }
    
}

function commandsSelectEnd() {
    commandLog.push('Deselected item(s): ' + itemsSelected);
    itemsSelected = [];
}

