var shapes = [];
var parentShapes = [];

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
  // loop to display shapes
  for (i = 0; i < shapes.length; i++) {
    loadDefaultStyle();
    highlightSelectedShape(i);
    updateFillBasedOnDepth(i);

    // display rectangles
    // pending code to display parents first (so children will seem like they're within parent shapes)
    rect(shapes[i].x, shapes[i].y, shapes[i].w, shapes[i].h);
    loadDefaultStyle();
  }
}

function updateFillBasedOnDepth(indexIn) {
  fill(255, 200);
}

function highlightSelectedShape(indexIn) {
  if (indexIn == selectedShape) {
    stroke('red');
  }
}

function loadDefaultStyle() {
  fill(255);
  stroke(150);
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
  } else if (keyCode == 32) { // spacebar
    logShapesArray();
  }
}

function mouseWheel(event) {
  zoom(event);
}

function mousePressed() {
  if (mouseButton == LEFT) {
    selectDeselect(getShapeIndices().splice(-1)[0]); // change from "highest index" to "item with highest order i.e. front, back"
  } else if (mouseButton == CENTER) {
    beginPanning();
  }
}

function doubleClicked() {
  if (getShapeIndices[0] == undefined) {
    // empty
  } else {
    editShape(getShapeIndices().splice(-1)[0]); // change from "highest index" to "item with highest order i.e. front, back"
  }
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
var rectSpacingInParent = 10;

function createShape() {
  shapes.push({
    id: shapes.length,
    x: translatedMouseX - rectWidth/2,
    y: translatedMouseY - rectHeight/2,
    w: rectWidth,
    h: rectHeight,
    parent: undefined,
    children: [],
    depth: 0,
  });
}

function selectDeselect(indexIn) {
  if (selectedShape == undefined) {
    if (indexIn == undefined) {
      // do nothing
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

function sendShapeToFront(indexIn) { // which one is shown on top i.e send to front, send backwards etc etc
  console.log("Index of shape " + indexIn + " is " + shapes.indexOf(indexIn));
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
  
    // move children shape of shape being moved too
    // CHANGE TO MOVE ALL DESCENDANTS
    if (shapes[movingShape].children.length != 0) {
      updateChildrenShapePosition(movingShape);
    }
  }
}

function cancelMovingShape() {
  if (movingShape != undefined) {
    console.log('Shape ' + movingShape + ' has stopped being moved');
    updateShapeParentChildrenAndDepth(movingShape); // when moving shape is "dropped" into another shape
    movingShape = undefined;
    movingShapeCursorOffsetX = undefined;
    movingShapeCursorOffsetY = undefined;
  }
}

function updateShapeParentChildrenAndDepth(indexIn) {
  targetIndices = getShapeIndices();
  flaggedIndices = [];

  // processing target indices
  if (targetIndices.length > 0) { 
    for (i = 0; i < targetIndices.length; i++) {

      // flag shape being moved from indices array
      if (targetIndices[i] == movingShape) {
        flaggedIndices.push(targetIndices[i]);
      }

      // flag children of moving shape from indices array
      for (j = 0; j < shapes[movingShape].children.length; j++) {
        if (targetIndices[i] == shapes[movingShape].children[j]) {
          flaggedIndices.push(targetIndices[i]);
        }
      }

      // if not moved outside of parent, reset position and shape
      if (targetIndices[i] == shapes[movingShape].parent) {
        updateParentDimensions(shapes[movingShape].parent);
        updateChildrenShapePosition(shapes[movingShape].parent);
        return
      }
    }
    
    // sort flagged indices in descending order to prevent index misalignment when a index is removed before an index that proceeds it
    flaggedIndices = flaggedIndices.sort(function(a, b){return b-a}); 

    // remove flagged shapes from indices array
    for (i = 0; i < flaggedIndices.length; i++) {
      targetIndices.splice(targetIndices.indexOf(flaggedIndices[i]), 1); // find index of flagged shape and remove
    }
    
    if (targetIndices.length == 0) { // when shape is not dropped onto any other shape
      console.log('No valid target parent');
      
      // if not dropped into any shape, remove parent and end function
      if (shapes[indexIn].parent != undefined) {
        console.log('Shape ' + indexIn + ' no longer a child of ' + shapes[indexIn].parent);
        clearedParent = shapes[indexIn].parent;
        shapes[clearedParent].children.splice(shapes[clearedParent].children.indexOf(indexIn), 1)
        shapes[indexIn].parent = undefined;
        updateAncestryDimensionsAndPosition(clearedParent)
      }
  
      return;
    }

    targetParent = targetIndices.splice(-1)[0]; // change from "highest index" to "item with highest order i.e. front, back"
  } else {
    targetParent = getShapeIndices()[0];
  }

  // update moved shapes parent
  if (targetParent != indexIn) {
    shapes[indexIn].parent = targetParent;
    console.log('Shape ' + indexIn + ' now has shape ' + targetParent + ' as its parent');
    
    // update target parents children
    shapes[targetParent].children.push(indexIn);
    console.log('Shape ' + targetParent + ' now has shape ' + indexIn + ' as its child');
    
    //// update moved shapes depth, iterate through the parents of parents, adding 1 to depth each loop
    // currentParent = targetParent;
    // currentDepth = 0;
    // while (currentParent != undefined) { // THIS IS CAUSING A OVERFLOW ERROR, HAPPENS WHEN AN SHAPE WITH ANOTHER SHAPE INSIDE BUT BEHIND IS SELECTED
    //   currentParent = shapes[currentParent].parent;
    //   currentDepth += 1;
    // }
    // shapes[indexIn].depth = currentDepth;
    // console.log('Shape ' + indexIn + ' now has a depth of ' + currentDepth);

    updateAncestryDimensionsAndPosition(targetParent)
  }
}

function updateAncestryDimensionsAndPosition(indexIn) {
  currentParent = indexIn;
  while (currentParent != undefined) { // THIS IS CAUSING A OVERFLOW ERROR, HAPPENS WHEN AN SHAPE WITH ANOTHER SHAPE INSIDE BUT BEHIND IS SELECTED
    updateParentDimensions(currentParent); // update parents of parents dimensions
    updateChildrenShapePosition(currentParent); // update parents of parents children positions
    currentParent = shapes[currentParent].parent;
  }
}

function updateDescendantsPosition() {

}

function updateChildrenShapePosition(indexIn) {
  for (i = 0; i < shapes[indexIn].children.length; i++) {
    currentChild = shapes[indexIn].children[i];
    shapes[currentChild].x = shapes[indexIn].x + rectSpacingInParent;
    shapes[currentChild].y = shapes[indexIn].y + rectSpacingInParent + i * (rectHeight + rectSpacingInParent);
  }
}

function updateParentDimensions(indexIn) {
  if (shapes[indexIn].children.length == 0) {
    shapes[indexIn].w = rectWidth;
    shapes[indexIn].h = rectHeight;
  } else if (shapes[indexIn].children.length >= 1) { 
    maxWidth = rectWidth;
    totalChildrenHeight = 0;
    for (i = 0; i < shapes[indexIn].children.length; i++) {
      if (shapes[shapes[indexIn].children[i]].w > maxWidth) {
        maxWidth = shapes[shapes[indexIn].children[i]].w;
      }
      totalChildrenHeight += shapes[shapes[indexIn].children[i]].h;
    }
    shapes[indexIn].w = maxWidth + 2 * rectSpacingInParent;
    shapes[indexIn].h = totalChildrenHeight + rectSpacingInParent + shapes[indexIn].children.length * rectSpacingInParent;
  }

  // move "update target parents dimensions based on number of children" section from updateShapeParentChildrenAndDepth function here
  // rename updateShapeParentChildrenAndDepth function
}

function editShape(indexIn) {
  if (selectedShape != undefined) {
    console.log('Shape ' + indexIn + ' is being edited');
    // pending code
  }
}

function getShapeIndices() {
  shapeIndexArray = [];
  for (i = 0; i < shapes.length; i++) {
    if (translatedMouseX > shapes[i].x &&
        translatedMouseX < shapes[i].x + shapes[i].w &&
        translatedMouseY > shapes[i].y &&
        translatedMouseY < shapes[i].y + shapes[i].h) {
        shapeIndexArray.push(i);
      }
  }
  if (shapeIndexArray.length == 0) {
    shapeIndexArray.push(undefined);
  }
  return shapeIndexArray;
}

// =================================================================================================
// ====== TESTING

function logShapesArray() {
  console.log(shapes);
}

// =================================================================================================
// ====== BROWSER

// disable browser middle button autoscroll event 
document.addEventListener('mousedown', (e) => {
  if (e.button == 1) {
    e.preventDefault();
  }
});