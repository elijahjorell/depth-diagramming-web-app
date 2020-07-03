function commandsStructureParentChildBegin(childID, parentID) {
    items[itemsGetIndexOfID(childID)].structure.parent = parentID;
    items[itemsGetIndexOfID(parentID)].structure.children.splice(items[itemsGetIndexOfID(parentID)].structure.children.indexOf(childID, 1));
}

function commandsStructureParentChildEnd(childID, parentID) {
    
}