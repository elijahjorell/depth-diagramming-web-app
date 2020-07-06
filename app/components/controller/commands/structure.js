function cStructureSetParentOfIDsTo(childIDs, parentID) {
    var i;
    var parentIndex;
    var childIndex;
    var childIndexInPreviousParentID;
    var previousParentID;
    var previousParentIndex;
    if (!Array.isArray(childIDs)) {
        childIDs = [childIDs];
    }
    
    parentIndex = cFilterGetIndexOfID(parentID);
    for (i = 0; i < childIDs.length; i++) {
        childIndex = cFilterGetIndexOfID(childIDs[i]);
        
        // if targetparent isn't already child's parent (so the following only triggers upon change)
        if (mItems.database[childIndex].structure.parent !== parentID) {
            
            // if the target parent is not a child of the childID
            if (!mItems.database[childIndex].structure.children.includes(parentID)) {
                previousParentID = mItems.database[childIndex].structure.parent;

                // if the child's previous parent is another item
                if (previousParentID !== undefined) {
                    // clear child from previous parent's children
                    previousParentIndex = cFilterGetIndexOfID(previousParentID);
                    childIndexInPreviousParentID = mItems.database[previousParentIndex].structure.children.indexOf(childIDs[i]);
                    mItems.database[previousParentIndex].structure.children.splice(childIndexInPreviousParentID, 1);
                    console.log('ID: ' + childIDs[i] + ' is no longer a child of ' + previousParentID);
                    previousParentID = undefined;
                }

                // set parent
                mItems.database[childIndex].structure.parent = parentID;
                console.log('ID: ' + childIDs[i] + `'s parent is now `  + parentID);

                // if targetparent is another item
                if (parentID !== undefined) {
                    mItems.database[parentIndex].structure.children.push(childIDs[i]);
                }
            } else {
                console.log(`A child cannot be it's own parent!`)
            }
        }     
    }
    
}