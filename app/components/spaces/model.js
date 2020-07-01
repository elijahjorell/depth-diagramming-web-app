class Space {
    constructor(state) {
        this.state = state;
    }
    createNewItem() {
        this.state.items.push(new Item());
    }
    convertCoordinateRawToTranslated(xRaw, yRaw) {

    }
    convertCoordinateTranslatedToRaw(xTranslated, yTranslated) {
    
    }
    convertCoordinateTranslatedToRelativeToScreen(xTranslated, yTranslated) {
    
    }
}

class Screen {
    constructor(state) {
        this.state = state;
    }
    pan() {

    }
    zoom() {

    }
    getItemsShownOnScreen() {

    }
    updateCoordinates() {

    }
}

class Cursor {
    constructor() {
        this.form = undefined;
        this.coordinates = undefined;
    }
    getDetectedItem() {

    }
    updateCoordinates() {

    }
    updateCursorForm(cursorForm) {
        
    }
}

class Item {
    constructor(x, y, r) {
        this.coordinates = { 
            raw: {
                x: undefined,
                y: undefined
            },
            translated: {
                x: undefined,
                y: undefined
            },
            relativeToScreen: {
                x: undefined,
                y: undefined
            }
        };
        this.form = {
            shape: undefined,
            dimensions: {
                r: undefined;
                misc: []
            }
        };
        this.relationships = { 
            structure: {
                parent: undefined,
                child: [],
                sibling: []
            },
            process: {
                predecessor: undefined,
                successor: [],
                peer: [],
            }
        };
        this.characteristics = [],
        this.visible = undefined;
        this.state = {
            deleted: undefined,
            visible: undefined,
            visibleOnScreen: undefined,
            hoveredOver: undefined,
            selected: undefined,
            grabbed: undefined
        }
    }
}