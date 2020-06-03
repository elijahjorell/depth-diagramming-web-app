var shapes = [];

// =================================================================================================
// ====== DISPLAY

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var currentScale = 1;
var zoomFactor = 1.05;
var originX = canvasWidth / 2;
var originY = canvasHeight / 2;
var translatedMouseX;
var translatedMouseY;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(220);
  updateTranslatedMouseCoordinates();
  translate(originX, originY);
  pan();
  scale(currentScale);
  shapeIsBeingMoved();
  displayShapes();
  updatePreviousMouseCoordinates();
}

function displayShapes() {
  for (i = 0; i < shapes.length; i++) {
    loadDefaultStyle();
    highlightSelectedShape(i);
    rect(shapes[i].x, shapes[i].y, shapes[i].w, shapes[i].h);
    loadDefaultStyle();
  }
}

function highlightSelectedShape(indexIn) {
  if (indexIn == selectedShape) {
    stroke('red');
  }
}

function loadDefaultStyle() {
  stroke(255);
}

function updatePreviousMouseCoordinates() {
  previousX = mouseX;
  previousY = mouseY;
}

function updateTranslatedMouseCoordinates() {
  translatedMouseX = (mouseX - originX) / currentScale;
  translatedMouseY = (mouseY - originY) / currentScale;
}

// =================================================================================================
// ====== KEYBOARD/MOUSE

function keyPressed() {
  if (keyCode == ENTER) {
    createShape();
  }
}

function mouseWheel(event) {
  zoom(event);
}

function mousePressed() {
  if (mouseButton == LEFT) {
    selectDeselect(getShapeIndex());
  } else if (mouseButton == CENTER) {
    beginPanning();
  }
}

function doubleClicked() {
  focusOnShape();
  editShape(getShapeIndex());
}

function mouseReleased() {
  cancelPan();
  cancelMovingShape();
}

// =================================================================================================
// ====== NAVIGATION

var panning = "off";
var panRefX;
var panRefY;
var previousX;
var previousY;

function beginPanning() {
  panning = 'on';
}

function pan() {
  if (panning == 'on') {
    originX -= 0.7 * (previousX - mouseX);
    originY -= 0.7 * (previousY - mouseY);
  }
}

function cancelPan() {
  if (panning == 'on') {
    panning = 'off';
  }
}

function zoom(event) {
  if (event.deltaY > 0) {
    currentScale /= zoomFactor;
    zoomDirection = -1;
  } else if (event.deltaY < 0) {
    currentScale *= zoomFactor;
    zoomDirection = 1;
  }
  originX -= zoomDirection * translatedMouseX * currentScale * (zoomFactor - 1);
  originY -= zoomDirection * translatedMouseY * currentScale * (zoomFactor - 1);
}

// =================================================================================================
// ====== COMMANDS

var selectedShape;
var movingShape;
var movingShapeCursorOffsetX;
var movingShapeCursorOffsetY;
var rectWidth = 120;
var rectHeight = 80;

function createShape() {
  shapes.push({
    x: translatedMouseX - rectWidth/2,
    y: translatedMouseY - rectHeight/2,
    w: rectWidth,
    h: rectHeight
  });
}

function selectDeselect(indexIn) {
  if (selectedShape == undefined) {
    if (indexIn == undefined) {
      
    } else {
      selectedShape = indexIn;
      console.log('Shape ' + selectedShape + ' has been selected');
    }
  } else {
    if (indexIn == undefined) {
      console.log('Shape ' + selectedShape + ' has been unselected');
      selectedShape = undefined;
    } else {
      if (indexIn == selectedShape) {
        beginMovingShape();
      } else {
        previousSelectedShape = selectedShape;
        selectedShape = indexIn;
        console.log('Selection has been changed from shape ' + previousSelectedShape + ' to shape ' + selectedShape);
      }
    }
  }
}

function beginMovingShape() {
  movingShapeCursorOffsetX = translatedMouseX - shapes[selectedShape].x;
  movingShapeCursorOffsetY = translatedMouseY - shapes[selectedShape].y;
  movingShape = selectedShape;
  console.log('Shape ' + movingShape + ' is being moved');
}

function shapeIsBeingMoved() {
  if (movingShape != undefined) {
    shapes[movingShape].x = translatedMouseX - movingShapeCursorOffsetX;
    shapes[movingShape].y = translatedMouseY - movingShapeCursorOffsetY;
  }
}

function cancelMovingShape() {
  if (movingShape != undefined) {
    console.log('Shape ' + movingShape + ' has stopped being moved');
    movingShape = undefined;
    movingShapeCursorOffsetX = undefined;
    movingShapeCursorOffsetY = undefined;
  }
}

function editShape(indexIn) {
  if (selectedShape != undefined) {
    console.log('Shape ' + indexIn + ' is being edited');
    // shapeDescription = createElement("textarea")
    // shapeDescription.elt.id = "shape-description"
    // shapeDescription.position(0.1 * canvasWidth, 0.2 * canvasHeight);
    // shapeDescription.size(0.3 * canvasWidth, 0.5 * canvasHeight);
    // shapeDescription.elt.focus();
    // pending code
  }
}

function focusOnShape() {
  if (selectedShape != undefined) {
    // pending code
  }
}

function getShapeIndex() {
  for (i = 0; i < shapes.length; i++) {
    if (translatedMouseX > shapes[i].x &&
        translatedMouseX < shapes[i].x + shapes[i].w &&
        translatedMouseY > shapes[i].y &&
        translatedMouseY < shapes[i].y + shapes[i].h) {
          return i;
      }
  }
}

// =================================================================================================
// ====== BROWSER

// disable browser middle button autoscroll event 
document.addEventListener('mousedown', (e) => {
  if (e.button == 1) {
    e.preventDefault();
  }
});