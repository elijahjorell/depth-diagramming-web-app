var mItems = {
    database: [],
    uniqueCounter: 0,
    baseRadius: 50,
    basePaddingRatio: 0.1
}

class Item {
    constructor (x, y, r) {
        this.id = mItems.uniqueCounter;
        this.textBox = {
            value: 'SCIENCE',
            fontSize: 20,
            coordinate: {
                x: undefined,
                y: undefined
            },
            dimensions: {
                w: undefined,
                h: undefined
            }
        };
        this.coordinate = { 
            x: x,
            y: y
        };
        this.dimensions = {
            r: r
        };
        this.structure = {
            parent: undefined,
            ancenstors: [],
            progenitor: undefined,
            children: [],
            descendants: [],
            siblings: [],
            depth: 0,
            height: undefined
        };
        this.process = {
            predecessors: [],
            successors: [],
            peers: [],
        };
        this.style = 'default';
        this.characteristics = []; 
    }
}

function mItemsTextBoxInitialise(itemID) {
    var itemIndex = mItemsGetIndexOfID(itemID)
    console.log('Updating textbox of ID: ' + itemID);
    textSize(mItems.database[itemIndex].textBox.fontSize);
    mItems.database[itemIndex].textBox.dimensions.w = textWidth(mItems.database[itemIndex].textBox.value);
    mItems.database[itemIndex].textBox.dimensions.h = textAscent() * 0.8;
    
    // loop to reduce font size til within bounds of circle including padding
}

function mItemsTextBoxUpdateCoordinates() {
    var i;
    for (i = 0; i < mItems.database.length; i++) {
        mItems.database[i].textBox.coordinate.x = mItems.database[i].coordinate.x - mItems.database[i].textBox.dimensions.w / 2;
        mItems.database[i].textBox.coordinate.y = mItems.database[i].coordinate.y - mItems.database[i].textBox.dimensions.h / 2;
    }   
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