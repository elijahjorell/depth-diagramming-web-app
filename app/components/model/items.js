var items = [];
var itemsUniqueCounter = 0;
var itemsHighlighted = [];
var itemsSelected = [];
var itemsGrabbed = [];

function itemsCreateNew(x, y, r) {
    items.push({
        id: itemsUniqueCounter,
        coordinates: { 
            real: {
                x: x,
                y: y
            },
            relativeToScreen: {
                x: undefined,
                y: undefined
            },
        },
        dimensions: {
                real: {
                    r: r
                },
                relativeToScreen: {
                    r: undefined
                }
        },
        structure: {
            parent: undefined,
            child: [],
            sibling: [],
            depth: undefined,
            height: undefined
        },
        process: {
            predecessor: undefined,
            successor: [],
            peer: [],
        },
        characteristics: [] 
    });
    itemsUniqueCounter += 1;
}

function itemsGetIndexOfID(itemID) {
    for (i = 0; i < items.length; i++) {
        if (itemID === items[i].id) {
            return i;
        }
    }
}