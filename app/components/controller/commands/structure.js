function commandsStructureParentChildBegin(childID, parentID) {
    items[commandsFilterGetIndexOfID(childID)].structure.parent = parentID;
    items[commandsFilterGetIndexOfID(parentID)].structure.children.push(childID);
}

function commandsStructureParentChildEnd(childID, parentID) {
    items[commandsFilterGetIndexOfID(childID)].structure.parent = undefined;
    items[commandsFilterGetIndexOfID(parentID)].structure.children.splice(items[commandsFilterGetIndexOfID(parentID)].structure.children.indexOf(childID, 1));
}

function commandsStructureGetAncestorsID(itemID) {
    var currentParentID = items[commandsFilterGetIndexOfID(itemID)].structure.parent;
    var ancestorsID = [];
    while (currentParentID !== undefined) {
        currentParentID = items[commandsFilterGetIndexOfID(currentParentID)].structure.parent
        ancestorsID.push(currentParentID);
    }
    return ancestorsID;
}

function commandsStructureGetDescendantsID(itemID) {
    var currentParentID = itemID;
    var descendantsID = items[commandsFilterGetIndexOfID(currentParentID)].structure.children;
    var currentDescendantIndex = 0;
    var currentDescendantChildrenID = [];
    while (currentDescendantIndex < descendantsID.length) {
        currentDescendantChildrenID = items[commandsFilterGetIndexOfID(currentParentID)].structure.children
        if (currentDescendantChildrenID.length > 0) {
            descendantsID = descendantsID.concat(currentDescendantChildrenID)
        }
        currentDescendantIndex += 1;
    }
    return descendantsID;
}

function commandsStructureUpdateDepth(itemID) {
    items[commandsFilterGetIndexOfID(itemID)].structure.depth = commandsStructureGetAncestors(itemID).length;
}