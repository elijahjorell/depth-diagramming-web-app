var mItems = {
    IDs: [],
    uniqueCounter: 0
}

function itemsCreateNew(x, y, r) {
    mItems.IDs.push({
        id: mItems.uniqueCounter,
        name: 'PHYSICS',
        coordinate: { 
            x: x,
            y: y
        },
        dimensions: {
            r: r
        },
        structure: {
            parent: undefined,
            ancenstors: [],
            progenitor: undefined,
            children: [],
            descendants: [],
            siblings: [],
            depth: 0,
            height: undefined
        },
        process: {
            predecessors: [],
            successors: [],
            peers: [],
        },
        characteristics: [] 
    });
    mItems.uniqueCounter += 1;
}
