var items = [];
var itemsUniqueCounter = 0;
var itemsHighlighted = [];
var itemsSelected = [];
var itemsGrabbed = [];

function itemsCreateNew(x, y, r) {
    items.push({
        id: itemsUniqueCounter,
        name: 'PHYSICS',
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
            children: [],
            siblings: [],
            depth: undefined,
            height: undefined
        },
        process: {
            predecessors: [],
            successors: [],
            peers: [],
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