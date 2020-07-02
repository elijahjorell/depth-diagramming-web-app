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
                scaled: {
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

function itemsUpdateGrabbedItemsCoordinates() {
    if (itemsGrabbed.length > 0) {
        for (i = 0; i < commandsGrabItemsOffsetArray.length; i++) {
            items[commandsGrabItemsOffsetArray[i].id].coordinates.real.x = cursorCoordinatesReal.x - commandsGrabItemsOffsetArray[i].offsetX;
            items[commandsGrabItemsOffsetArray[i].id].coordinates.real.y = cursorCoordinatesReal.y - commandsGrabItemsOffsetArray[i].offsetY;
        }
    }
}

function itemsGetIndexOfID(itemID) {
    for (i = 0; i < items.length; i++) {
        if (itemID === items[i].id) {
            return i;
        }
    }
}