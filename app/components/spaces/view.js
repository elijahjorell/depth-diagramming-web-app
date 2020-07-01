function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220)
}

function draw() {
    displayItemsInActiveSpace();
    activeCursor.updateCoordinates(mouseX, mouseY);
}

function displayItemsInActiveSpace() {
    for (i = 0; i < activeSpace.state.items.length; i++) {
        ellipse(activeSpace.state.items[i].form.dimensions.x,
                activeSpace.state.items[i].form.dimensions.y,
                activeSpace.state.items[i].form.dimensions.r);
    }
}