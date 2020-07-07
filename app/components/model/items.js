var mItems = {
    database: [],
    uniqueCounter: 0,
    baseRadius: 50
}

class Item {
    constructor (x, y, r) {
        this.id = mItems.uniqueCounter;
        this.name = 'PHYSICS'; // textbox.value + textbox.font etc.etc.
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

function mItemsGetIndexOfID(itemID) {
    var i;
    for (i = 0; i < mItems.database.length; i++) {
        if (itemID === mItems.database[i].id) {
            return i;
        }
    }
}

function mItemsGetFrontIDFromIDs(itemIDs) {
    return itemIDs[0];
}