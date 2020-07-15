function cCreateNewItem(x, y) {
    mItems.database.push({
        id: mItems.uniqueCounter,
        textBox: {
            value: 'ITEM ' + mItems.uniqueCounter,
            fontSize: mItems.baseTextBoxTextSize,
            coordinate: {
                x: undefined,
                y: undefined
            },
            dimensions: {
                w: undefined,
                h: undefined
            }
        },
        coordinate: { 
            x: x,
            y: y
        },
        dimensions: {
            r: mItems.baseRadius
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
        style: 'default',
        characteristics: [],
    });
    mItemsTextBoxInitialise(mItems.uniqueCounter);
    mItems.uniqueCounter += 1;
}