var shapes = [];
var parentShapes = [];

// ============================================================================================================================================================================================
// ==================================================================================== DISPLAY

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
  background(34, 42, 53);
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
    updateStyleBasedShapeState(i);

    // display rectangles
    // pending code to display parents first (so children will seem like they're within parent shapes)
    rect(shapes[i].x, shapes[i].y, shapes[i].w, shapes[i].h);
    loadDefaultStyle();
  }
}

function updateStyleBasedShapeState(indexIn) {
  // update fill and alpha
  if (shapes[indexIn].children.length > 0) {
    fill(34, 42, 53, 25);
  }

  // update stroke
  
  // update text size
  
  
}

function highlightSelectedShape(indexIn) {
  if (indexIn == selectedShape) {
    stroke('red');
  }
}

function loadDefaultStyle() {
  fill(255);
  stroke(180, 199, 231);
  strokeWeight(1)
}

function updatePreviousMouseCoordinates() {
  previousX = mouseX;
  previousY = mouseY;
}

function updateTranslatedMouseCoordinates() {
  translatedMouseX = (mouseX - originX) / currentScale;
  translatedMouseY = (mouseY - originY) / currentScale;
}

// ============================================================================================================================================================================================
// ==================================================================================== KEYBOARD/MOUSE

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

// ============================================================================================================================================================================================
// ==================================================================================== NAVIGATION

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

// ============================================================================================================================================================================================
// ==================================================================================== COMMANDS

var selectedShape;
var movingShape;
var movingShapeOffsetArray = [];
let rectWidth = 120;
let rectHeight = 80;
let rectSpacingInParent = 40;

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

  // pending value input

  // select newly created shape
  selectedShape = shapes.length - 1;
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
  movingShape = selectedShape;
  console.log('Shape ' + movingShape + ' is being moved');

  // create to array containing all descendants for all descendants + offset x + offset y
  movingShapesArray = getShapesDescendants(movingShape);
  for (i = 0; i < movingShapesArray.length; i++) {
    movingShapeOffsetArray.push({
      id: movingShapesArray[i],
      offsetX: translatedMouseX - shapes[movingShapesArray[i]].x,
      offsetY: translatedMouseY - shapes[movingShapesArray[i]].y
    })
  }
}

function shapeIsBeingMoved() {
  if (movingShape != undefined) {
    // move all shapes in movingShapeOffsetArray
    for (i = 0; i < movingShapeOffsetArray.length; i++) {
      shapes[movingShapeOffsetArray[i].id].x = translatedMouseX - movingShapeOffsetArray[i].offsetX;
      shapes[movingShapeOffsetArray[i].id].y = translatedMouseY - movingShapeOffsetArray[i].offsetY;
    }
  }
}

function cancelMovingShape() {
  if (movingShape != undefined) {
    console.log('Shape ' + movingShape + ' has stopped being moved');
    shapeIsDropped(movingShape); // when moving shape is "dropped" into another shape
    movingShapeOffsetArray = [];
    movingShape = undefined;
  }
}

function shapeIsDropped(indexIn) {
  targetIndices = getShapeIndices(); // ERROR STILL, CANNOT DRAG BIG SHAPE INTO SMALL SHAPE STILL NOT GRABBING
  flaggedIndices = [];

  // if not moved outside of parent, reset position and shape
  for (i = 0; i < targetIndices.length; i++) {
    if (targetIndices[i] == shapes[movingShape].parent) {
      updateDimensionsOfShape(shapes[movingShape].parent);
      updatePositionsOfChildren(shapes[movingShape].parent);
      return
    }
  }

  // flag descendants
  flaggedIndices = flaggedIndices.concat(getShapesDescendants(indexIn)); 

  // remove flagged shapes from indices array
  flaggedIndices = flaggedIndices.sort(function(a, b){return b-a}); // sort flagged indices in descending order to prevent index misalignment
  for (i = 0; i < flaggedIndices.length; i++) {
    if (targetIndices.includes(flaggedIndices[i])) { // only if flagged indice is in targetIndices
      targetIndices.splice(targetIndices.indexOf(flaggedIndices[i]), 1); // find index of flagged shapes and remove
    }
  }
  
  // set targetParent
  targetParent = targetIndices.splice(-1)[0]; // change from "highest index" to "item with highest order i.e. front, back"

  // if shape has a parent, clear their relationship
  if (shapes[indexIn].parent != undefined) {
    clearParentOfShape(indexIn);
    updateDimensionsOfAncestors(clearedParent);
    updatePositionsOfFamily(clearedParent);
  }

  // updating shape information
  if (targetParent == undefined) { // if shape is dropped onto the canvas
    updateDepthOfDescendants(indexIn);
    console.log('Shape ' + indexIn + ' was dropped onto the canvas');
    return;
  } else { // if shape is dropped onto another shape
    // update moved shapes parent
    shapes[indexIn].parent = targetParent;
    console.log('Shape ' + indexIn + ' now has shape ' + targetParent + ' as its parent');
    
    // update target parents children
    shapes[targetParent].children.push(indexIn);
    console.log('Shape ' + targetParent + ' now has shape ' + indexIn + ' as its child');

    // !!! ERROR OCCURS AROUND HERE !!!
    // WHEN SHAPE WITH SHAPES "BELOW IT" ARE MOVED AND CURSOR IS OVER DESCENDANTS
    // CANNOT HAVE THE PARENT OF YOUR PARENT AS A PARENT
    updateDepthOfDescendants(indexIn);
    updateDimensionsOfAncestors(targetParent);
    updatePositionsOfFamily(targetParent);
  }
}

function clearParentOfShape(indexIn) {
  clearedParent = shapes[indexIn].parent;
  shapes[clearedParent].children.splice(shapes[clearedParent].children.indexOf(indexIn), 1)
  shapes[indexIn].parent = undefined;
  console.log('Shape ' + indexIn + ' no longer a child of ' + clearedParent);
}

function updateDepthOfDescendants(indexIn) {
  descendants = getShapesDescendants(indexIn);
  for (j = 0; j < descendants.length; j++) {
    updateDepthOfShape(descendants[j]);
  }
}

function updateDepthOfShape(indexIn) {
  if (getShapeIndices() == undefined) {
    shapes[indexIn].depth = 0;
  } else {
    currentParent = shapes[indexIn].parent;
    currentDepth = 0;
    while (currentParent != undefined) {
      currentParent = shapes[currentParent].parent;
      currentDepth += 1;
    }
    shapes[indexIn].depth = currentDepth;
  }
  console.log('Shape ' + indexIn + ' now has a depth of ' + shapes[indexIn].depth);
}

function updatePositionsOfFamily(indexIn) {
  updatePositionsOfDescendants(getShapesGrandestParent(indexIn));
}

function updatePositionsOfDescendants(indexIn) {
  // get array containing all of a shape's descendants
  descendants = getShapesDescendants(indexIn);

  // apply updatePositionsOfChildren starting from the grandest person
  currentDepth = 0; // start from 0, maybe can change to depth of the ancenstor the function is running for
  currentDescendant = -1;
  descendantsUpdated = 0;
  while (descendantsUpdated < descendants.length) {
    currentDescendant += 1;
    
    if (shapes[descendants[currentDescendant]].depth == currentDepth) {
      updatePositionsOfChildren(descendants[currentDescendant]);
      descendantsUpdated += 1;
    }
    
    if (currentDescendant == descendants.length - 1) {
      currentDescendant = 0;
      currentDepth += 1;
    }
  }
}

function updatePositionsOfChildren(indexIn) { // EXPERIENCING ISSUES, MISALIGNED X
  currentYOffset = rectSpacingInParent;
  currentXOffset = undefined;

  for (i = 0; i < shapes[indexIn].children.length; i++) {
    currentChild = shapes[indexIn].children[i];
    previousChild = shapes[indexIn].children[i - 1];
    
    // X offset - align to centre of parent
    shapes[currentChild].x = shapes[indexIn].x + shapes[indexIn].w/2 - shapes[currentChild].w/2;
    
    // Y offset
    if (i > 0) {
      currentYOffset += shapes[previousChild].h + rectSpacingInParent;
    }
    shapes[currentChild].y = shapes[indexIn].y + currentYOffset;
  }
}

function updateDimensionsOfAncestors(indexIn) {
  currentParent = indexIn;
  while (currentParent != undefined) { // THIS IS CAUSING A OVERFLOW ERROR, HAPPENS WHEN AN SHAPE WITH ANOTHER SHAPE INSIDE BUT BEHIND IS SELECTED
    updateDimensionsOfShape(currentParent); // update parents of parents dimensions
    currentParent = shapes[currentParent].parent;
  }
}
function updateDimensionsOfShape(indexIn) {
  // ADD CODE TO "CENTRE" SHAPE AFTER SIZE CHANGE
  
  if (shapes[indexIn].children.length == 0) {
    shapes[indexIn].w = rectWidth;
    shapes[indexIn].h = rectHeight;
  } else if (shapes[indexIn].children.length >= 1) { 
    maxWidth = rectWidth;
    totalChildrenHeight = 0;

    // sum the total dimensions of children
    for (i = 0; i < shapes[indexIn].children.length; i++) {
      if (shapes[shapes[indexIn].children[i]].w > maxWidth) {
        maxWidth = shapes[shapes[indexIn].children[i]].w;
      }
      totalChildrenHeight += shapes[shapes[indexIn].children[i]].h;
    }

    // add spacing
    shapes[indexIn].w = maxWidth + 2 * rectSpacingInParent;
    shapes[indexIn].h = totalChildrenHeight + rectSpacingInParent + shapes[indexIn].children.length * rectSpacingInParent;
  }
}

function editShape(indexIn) {
  if (selectedShape != undefined) {
    console.log('Shape ' + indexIn + ' is being edited');
    // pending code
  }
}

function getShapesDescendants(indexIn) { // 0th index is the ancestor
  descendants = [indexIn];
  i = 0;
  while (i < descendants.length) {
    // add current descendants children if it has any
    if (shapes[descendants[i]].children.length > 0) {
      descendants = descendants.concat(shapes[descendants[i]].children);
    }
    i += 1;
  }
  console.log('Starting from index 1, the descendants of ' + indexIn + ' are: ' + descendants);
  return descendants;
}

function getShapesGrandestParent(indexIn) {
  currentGrandestParent = indexIn;
  while (shapes[currentGrandestParent].parent != undefined) {
    currentGrandestParent = shapes[currentGrandestParent].parent;
  }
  console.log('Shape ' + indexIn + "'s grandest parent is shape " + currentGrandestParent);
  return currentGrandestParent;
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
  return shapeIndexArray;
}

// ============================================================================================================================================================================================
// ==================================================================================== TESTING

function logShapesArray() {
  if (selectedShape == undefined) {
    console.log(shapes);
  } else {
    console.log(shapes[selectedShape]);
  }
}

// ============================================================================================================================================================================================
// ==================================================================================== BROWSER

// disable browser middle button autoscroll event 
document.addEventListener('mousedown', (e) => {
  if (e.button == 1) {
    e.preventDefault();
  }
});