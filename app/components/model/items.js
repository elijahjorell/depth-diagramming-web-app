var mItems = {
    database: [],
    uniqueCounter: 0,
    baseRadius: 50
}

class Item {
    constructor (x, y, r) {
        this.id = mItems.uniqueCounter;
        this.name = 'PHYSICS';
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
        this.characteristics = []; 
    }
}
