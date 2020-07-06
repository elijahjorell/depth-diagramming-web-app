function cDeleteIDs(IDsToBeDelete) {
    var i;
    if (IDsToBeDelete.length > 0) {
        for (i = 0; i < IDsToBeDelete.length; i++) {
            mItems.database.splice(cFilterGetIndexOfID(IDsToBeDelete[i]), 1);
        }
    }
}