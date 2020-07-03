function commandsFilterGetIndexOfID(itemID) {
    for (i = 0; i < items.length; i++) {
        if (itemID === items[i].id) {
            return i;
        }
    }
}

function commandsFilterGetFrontItemID(itemsID) {
    return itemsID[0];
}

function commandsFilterGetIndex() {

}