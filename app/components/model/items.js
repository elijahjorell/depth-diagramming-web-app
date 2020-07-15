var mItems = {
    database: [],
    uniqueCounter: 0,
    baseRadius: 50,
    basePaddingRatio: 0.1, 
    baseTextBoxTextSize: 20
}

function mItemsGetIndexOfID(itemID) {
    var i;
    for (i = 0; i < mItems.database.length; i++) {
        if (itemID === mItems.database[i].id) {
            return i;
        }
    }
}

function mItemsGetFrontIDFromIDs(itemIDs) {
    var i;
    var highestIndex = -1;
    var highestIndexID;
    var currentIndex;
    for (i = 0; i < itemIDs.length; i++) {
        currentIndex = mItemsGetIndexOfID(itemIDs[i]);
        if (currentIndex > highestIndex) {
            highestIndex = currentIndex;
            highestIndexID = itemIDs[i];
        } 
    }
    return highestIndexID;
}

function mItemsMoveIDsToEndOfDatabase(itemIDs) {
    var i;
    var itemIndex;
    for (i = 0; i < itemIDs.length; i++) {
        itemIndex = mItemsGetIndexOfID(itemIDs[i]);
        mItems.database.push(mItems.database.splice(itemIndex, 1)[0]);
    }
}

function mItemsTextBoxInitialise(itemID) {
    console.log('Updating textbox of ID: ' + itemID);
    mItemsTextBoxUpdateDimensions(itemID);
}

function mItemsTextBoxUpdateDimensions(itemID) {
    var itemIndex = mItemsGetIndexOfID(itemID)
    textSize(mItems.database[itemIndex].textBox.fontSize);
    mItems.database[itemIndex].textBox.dimensions.w = textWidth(mItems.database[itemIndex].textBox.value);
    mItems.database[itemIndex].textBox.dimensions.h = textAscent() * 0.8;
}

function mItemsTextBoxUpdateCoordinate() {
    var i;
    for (i = 0; i < mItems.database.length; i++) {
        mItems.database[i].textBox.coordinate.x = mItems.database[i].coordinate.x - mItems.database[i].textBox.dimensions.w / 2;
        mItems.database[i].textBox.coordinate.y = mItems.database[i].coordinate.y - mItems.database[i].textBox.dimensions.h / 2;
    }   
}