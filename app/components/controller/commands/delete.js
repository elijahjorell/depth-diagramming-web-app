function cDeleteIDs(IDsToBeDelete) {
    var i;
    console.log('Deleted IDs: ' + IDsToBeDelete)
    if (IDsToBeDelete.length > 0) {
        for (i = 0; i < IDsToBeDelete.length; i++) {
            mItems.database.splice(mItemsGetIndexOfID(IDsToBeDelete[i]), 1);
        }
    }

    // delete any children

    // remove as child from it's parent
}