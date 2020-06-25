// written by Elijah Jorell Esmero

/*//////////////////////////////////////////////////////

PRINCIPLES
- MINIMISE VISUAL LOAD
- ARRANGEMENTS/SPACES
- TAGS
  - FLOW LINES TO OTHER SHAPES
  - GROUPING
  - KEYWORDS
  - INFORMATION
    - DATE TIME CREATED
    - DATE TIME LAST MODIFIED

- COMMAND LINE CAPABILITIES

- TOP-DOWN/END->BEGINNING STRUCTURING E.G. 
  - DOCUMENT > SECTION > PARAGRAPH
  - LESSON > TOPICS > SUBTOPICS
  - COMPANY > DIVISION > TOP/MIDDLE/LOWER > TEAM
  - OBJECTIVES > PREREQUISITES


NOTES
- ZETTELKASTEN LEARNING METHOD - https://www.youtube.com/watch?v=rOSZOCoqOo8
- CHANGE: NO AUTO FORMATTING, DRAG SHAPE INTO ANOTHER SHAPE AND THEN IT WILL STICK ONTO THAT SHAPE
- COLLISION DETECTION FOR THINGS IN SAME DEPTH
- CAN SEND SHAPES TO OTHER SHAPES BUT WILL BE CONSIDERED FLEETING AND NOT HAVE A SET POSITION IN THE SHAPE
  - FLEETING SHAPES TO BE REVIEWED BEFORE EXITING APP, WARNING 
- GROUP TYPE SHAPES WILL APPLY "CHILD OF: " TAG TO EVERYTHING ON IT
- 


////////////////////////////////////////////////////////

PENDING FEATURES
- CAN MAKE A SHAPE BIGGER BY HOVERING OVER EDGE WHILE HOLDING ANOTHER A SHAPE
- STATIC POSITION IN SHAPE
- CHILDREN BECOMING SMALLER RATHER THAN PARENTS BECOMING BIGGER
- ARRANGEMENTS

//////////////////////////////////////////////////////*/

var shapes = [];

// ============================================================================================================================================================================================
// ==================================================================================== DISPLAY

var displayShapesByDepthArray; // pending code
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var currentScale = 1;
var zoomFactor = 1.05;
var baseStrokeWeight = 1;
var shapeDepthSizeFactor; // PENDING CODE
var originX = canvasWidth / 2;
var originY = canvasHeight / 2;
var translatedMouseX;
var translatedMouseY;
var centreX = 0;
var centreY = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  initialiseBrowserFunctions();
}

function draw() {
  background(34, 42, 53);
  updateTranslatedMouseCoordinates();
  translate(originX, originY);
  pan();
  scale(currentScale);
  shapeIsBeingMoved();
  displayShapes();
  displayOrigin();
  displayScreenCentre();
  removeBoxTitleEditorChar();
  updatePreviousMouseCoordinates();
  // rect covering whole screen for depth-transparency styling
}

function displayBox(indexIn) {  // rename function
  // box
  fill(34, 42, 53, 180); // make transparent based on depth
  rect(shapes[indexIn].x, shapes[indexIn].y, shapes[indexIn].w, shapes[indexIn].h);
  
  // title strip
  fill(255);
  rect(shapes[indexIn].x, shapes[indexIn].y, shapes[indexIn].w, shapes[indexIn].titleH);

  // text
  noStroke();
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(shapes[indexIn].titleH * 0.7);
  text(shapes[indexIn].titleText, shapes[indexIn].x, shapes[indexIn].y, shapes[indexIn].w, shapes[indexIn].titleH);
}

function displayOrigin() {
  fill('blue');
  stroke('white');
  strokeWeight(1 / currentScale);
  ellipse(0, 0, 20 / currentScale);
}

function displayScreenCentre() {
  centreX = (canvasWidth / 2 - originX) / currentScale;
  centreY = (canvasHeight / 2 - originY) / currentScale;
  fill('green');
  stroke('white');
  strokeWeight(1 / currentScale);
  ellipse(centreX, centreY, 20 / currentScale);
}

function displayShapes() {
  currentShape = 0;
  currentDisplayedHeight = 0;
  displayedShapes = 0;
  
  // loop to display shapes from lowest to heighest height
  while (displayedShapes < shapes.length) {
    if (shapes[currentShape].height == currentDisplayedHeight) {
      loadDefaultStyle(); // add transparency based on depth
      highlightSelectedShape(currentShape);
      updateStyleBasedOnShapeState(currentShape);
      displayBox(currentShape); // rename function
      loadDefaultStyle();
      displayedShapes += 1;
    }

    currentShape += 1;

    if (currentShape == shapes.length) {
      currentDisplayedHeight += 1;
      currentShape = 0;
    }
  }
}

function updateStyleBasedOnShapeState(indexIn) { // maybe remove this function
  // update lineWeight - UPDATE TO BE BASED ON "HEIGHT" RATHER THAN DEPTH
  strokeWeight(baseStrokeWeight * Math.pow(1.5, shapes[indexIn].height));
}

function highlightSelectedShape(indexIn) {
  if (indexIn == selectedShape) {
    stroke(255, 0, 0); // add transparency based on depth
  }
}

function loadDefaultStyle() {
  fill(255);
  stroke(180, 199, 231);
  strokeWeight(baseStrokeWeight)
}

function updatePreviousMouseCoordinates() {
  previousX = mouseX;
  previousY = mouseY;
}

function updateTranslatedMouseCoordinates() {
  translatedMouseCoordinates = convertCoordinatesRawToTranslated(mouseX, mouseY);
  translatedMouseX = translatedMouseCoordinates.x
  translatedMouseY = translatedMouseCoordinates.y
}

function convertCoordinatesRawToTranslated(xIn, yIn) {
  translatedX = (xIn - originX) / currentScale;
  translatedY = (yIn - originY) / currentScale;
  return {
    x: translatedX,
    y: translatedY
  }
}

function convertCoordinatesTranslatedToRaw(xIn, yIn) {
  rawX = xIn * currentScale + originX;
  rawY = yIn * currentScale + originY;
  return {
    x: rawX,
    y: rawY
  }
}

// POSITION AND DIMENSIONS OF SCREEN BASED ON SCALE AND PAN
// pending code

// ============================================================================================================================================================================================
// ==================================================================================== KEYBOARD/MOUSE
controlKeyIsPressed = false;
shiftKeyIsPressed = false;

function keyPressed() {
  // modifiers
  if (keyCode == CONTROL) {
    controlKeyIsPressed = true;
    console.log('Control key pressed');
  }

  if (keyCode == SHIFT) {
    shiftKeyIsPressed = true;
    console.log('Shift key pressed');
  }
  
  // keys
  if (keyCode == ENTER) { // enter
    if (titleEditorOpen == true) {
      updateBoxTitleText(editingShape);
      closeBoxTitleEditor();
    } else {
      if (controlKeyIsPressed == true) {
        createShape(); // pending change, maybe press b to make a box?
      } else if (controlKeyIsPressed == false) {
        console.log('Create note');
      }
      // if a shape is selected add a text to it
      // if nothing is selected, fleeting note in space
    } 
  } else if (keyCode == ESCAPE) { // escape key
    if (titleEditorOpen == true) {
      closeBoxTitleEditor();
    }
  } else if (keyCode == 32) { // spacebar
    if (titleEditorOpen == false) { // restructure the keyPressed funciton key to consider what elmenet is active e.g. canvas, menu, textarea
      zoomToSelectedShape(); 
      // SPACE BAR TO PREVIEW BOX CONTENTS AND NOTES
    }

  } else if (keyCode == 9) { // tab (CONTROL+TAB IS RESERVED FOR SWITCHING BETWEEN CHROME TABS)
    if (titleEditorOpen == true) { // restructure the keyPressed funciton key to consider what elmenet is active e.g. canvas, menu, textarea
      updateBoxTitleText(editingShape);
      closeBoxTitleEditor();
    }
    tabBetweenShapes();

  } else if (keyCode == 69) { // e key
    if (titleEditorOpen == false && selectedShape != undefined) {
      openBoxTitleEditor(selectedShape); // change to get getBoxIndicesTitleTextBoxOnly NEED TO FIX TO PREVENT E GETTING ADDED TO BOX TITLE VALUE
      boxTitleEditorRemoveCharToken = true;
    }

  } else if (keyCode == 65) { // a key
    // ADD AN ITEM TO CONTEXTMENU
    addItemToContextMenu();

  } else if (keyCode == 68) { // d key
    // REMOVE ITEM 1 FROM CONTEXTMENU
    deleteItemInContextMenu();

  } else if (keyCode == 73) { // i key
    if (titleEditorOpen == false) {
      logShapesArray();
    }
  }

  // arrows
  else if (keyCode == UP_ARROW) {
    if (controlKeyIsPressed == true && shiftKeyIsPressed == false) {
      tabIntoShape();
    }
  } else if (keyCode == DOWN_ARROW) {
    if (controlKeyIsPressed == true && shiftKeyIsPressed == false) {
      tabOutsideOfShape();
    }
  }
}

function keyReleased() {
  if (keyCode == CONTROL) {
    controlKeyIsPressed = false;
    console.log('Control key released');
  }

  if (keyCode == SHIFT) {
    shiftKeyIsPressed = false;
    console.log('Shift key released');
  }
}

function mouseWheel(event) {
  zoom(event);
}


function mousePressed() {
  updateBoxTitleText(editingShape);
  closeBoxTitleEditor();
  if (mouseButton == LEFT) {
    selectDeselect(getBoxIndicesTitleStripOnly().splice(-1)[0]); // change from "highest index" to "item with highest order i.e. front, back"
  } else if (mouseButton == CENTER) {
    beginPanning();
  } else if (mouseButton == RIGHT) {
    // pending code to update context menu based on what was right clicked
  }
}

function doubleClicked() {
  if (selectedShape != undefined) {
    // openBoxTitleEditor(getBoxIndicesTitleStripOnly().splice(-1)[0]); // change to get getBoxIndicesTitleTextBoxOnly
    // pending code to prevent double clicking after selecting object
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
  originX -= zoomDirection * translatedMouseX * currentScale * (zoomFactor - 1); // not 100% current, zooms less accurately when further from the origin
  originY -= zoomDirection * translatedMouseY * currentScale * (zoomFactor - 1); // not 100% current, zooms less accurately when further from the origin

  console.log(currentScale)

  updateBoxTitleEditorFontSize();
}

function zoomToSelectedShape() {
  if (selectedShape != undefined) {
    targetShapeWidth = shapes[selectedShape].w;
    targetShapeHeight = shapes[selectedShape].h;
    if (targetShapeHeight * currentScale < 0.1 * canvasHeight) {
      currentScale = canvasHeight / targetShapeHeight * 0.1;
    } 
    // else if (targetShapeHeight * currentScale > 0.05 * canvasHeight) {
    //   currentScale = canvasHeight / targetShapeHeight * 0.1;
    // }
    originX -= (shapes[selectedShape].x + targetShapeWidth / 2) * currentScale - canvasWidth / 2 + originX; // can animate this in the future
    originY -= (shapes[selectedShape].y + targetShapeHeight / 2) * currentScale - canvasHeight / 2 + originY; // can animate this in the future
  }
}

function tabBetweenShapes() {
  // add logic to tab between descendants before moving onto another shape
  if (selectedShape == undefined) {
    selectedShape = 0;
  } else if (selectedShape == shapes.length - 1) {
    selectedShape = 0;
  } else {
    selectedShape += 1;
  }

  // change to only zoom/focus to shape if out of screen
  zoomToSelectedShape();
}

function tabIntoShape() {
  if (selectedShape != undefined && shapes[selectedShape].children.length > 0) {
    selectedShape = shapes[selectedShape].children[0];
    console.log('Tabbing into shape')
  }
}

function tabOutsideOfShape() {
  if (selectedShape != undefined) {
    selectedShape = shapes[selectedShape].parent;
    console.log('Tabbing outside of shape')
  }
}

// ============================================================================================================================================================================================
// ==================================================================================== COMMANDS

var selectedShape;
var movingShape;
var movingShapeOffsetArray = [];
var editingShape;
var titleEditorOpen = false;
var boxTitleEditorRemoveCharToken = false;
let boxTitleStripHeightRatio = 0.2;
let rectWidth = 120;
let rectHeight = 80;
let rectSpacingInParent = 80; // make this scale with depth

function createShape() {
  // if object is selected, make parent the object selected
  if (selectedShape != undefined) { // refactor this later
    shapeParent = selectedShape;
  } else {
    shapeParent = undefined;
  }

  shapes.push({
    id: shapes.length,
    type: undefined, // box/note
    style: undefined, // title on top in title strip/in the middle with no title strip and in white text)
    x: translatedMouseX - rectWidth/2,
    y: translatedMouseY - rectHeight/2,
    w: rectWidth,
    h: rectHeight,
    titleText: '',
    titleW: rectWidth, 
    titleH: rectHeight / (1 + boxTitleStripHeightRatio) * boxTitleStripHeightRatio, // make this scale with depth
    parent: shapeParent,
    children: [],
    depth: 0,
    height: 0
  });

  if (selectedShape != undefined) { 
    /////////////////
    // refactor this later to function makeShapeChildOf
    shapes[shapes.length - 1].parent = shapeParent;
    shapes[shapeParent].children.push(shapes.length - 1);
    updateDepthOfDescendants(shapes.length - 1);
    updateHeightOfFamily(shapes.length - 1);
    updateDimensionsOfAncestors(shapeParent);
    updatePositionsOfFamily(shapeParent);
    zoomToSelectedShape(shapes.length - 1); // change to only if outside of the screen
    /////////////////
  }

  // pending value input

  // select newly created shape
  selectedShape = shapes.length - 1;
  openBoxTitleEditor(selectedShape);
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
  movingShapesArray = getDescendantsOfShape(movingShape);
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
  targetParent = getValidDropTargetShape(indexIn);

  // if shape has a parent shape
  if (shapes[indexIn].parent != undefined) {
    // if shape is not moved outside of parent
    if (targetParent == shapes[indexIn].parent) {
      updatePositionsOfFamily(targetParent);
      return
    }

    // if shape has a parent, clear their relationship and update the information of the parent
    clearedParent = shapes[indexIn].parent;
    clearParentOfShape(indexIn);
    updateHeightOfFamily(clearedParent);
    updateDimensionsOfAncestors(clearedParent);
    updatePositionsOfFamily(clearedParent);
  }

  // updating shape information
  if (targetParent == undefined) { // if shape is dropped onto the canvas
    updateDepthOfDescendants(indexIn);
    updateHeightOfFamily(indexIn);
    console.log('Shape ' + indexIn + ' was dropped onto the canvas');
  } else { // if shape is dropped onto another shape
    // update moved shapes parent
    shapes[indexIn].parent = targetParent;
    console.log('Shape ' + indexIn + ' now has shape ' + targetParent + ' as its parent');
    
    // update target parents children
    shapes[targetParent].children.push(indexIn);
    console.log('Shape ' + targetParent + ' now has shape ' + indexIn + ' as its child');

    updateDepthOfDescendants(indexIn); // EDIT TO CATER FOR SHAPES BECOMING SMALLER INSTEAD
    updateHeightOfFamily(indexIn); // EDIT TO CATER FOR SHAPES BECOMING SMALLER INSTEAD
    updateDimensionsOfAncestors(targetParent); // EDIT TO CATER FOR SHAPES BECOMING SMALLER INSTEAD
    updatePositionsOfFamily(targetParent); // EDIT TO CATER FOR SHAPES BECOMING SMALLER INSTEAD
  }
}

function clearParentOfShape(indexIn) {
  clearedParent = shapes[indexIn].parent;
  shapes[clearedParent].children.splice(shapes[clearedParent].children.indexOf(indexIn), 1)
  shapes[indexIn].parent = undefined;
  console.log('Shape ' + indexIn + ' no longer a child of ' + clearedParent);
}

function updateHeightOfFamily(indexIn) {
  family = getDescendantsOfShape(getGrandestParentOfShape(indexIn));
  familyDepths = [];

  // get max depth of family
  for (j = 0; j < family.length; j++) {
    familyDepths.push(shapes[family[j]].depth);
  }
  maxDepth = Math.max(...familyDepths);

  // update height of each shape in family
  for (j = 0; j < family.length; j++) {
    shapes[family[j]].height = maxDepth - shapes[family[j]].depth;
  }
}

function updateDepthOfDescendants(indexIn) {
  descendants = getDescendantsOfShape(indexIn);
  for (j = 0; j < descendants.length; j++) {
    updateDepthOfShape(descendants[j]);
  }
}

function updateDepthOfShape(indexIn) {
  if (getShapeIndices() == undefined) { // change to not be reliant on mouse input
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
  updatePositionsOfDescendants(getGrandestParentOfShape(indexIn));
}

function updatePositionsOfDescendants(indexIn) {
  // get array containing all of a shape's descendants
  descendants = getDescendantsOfShape(indexIn);

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
  currentYOffset = rectSpacingInParent + shapes[indexIn].titleH;
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
    shapes[indexIn].titleW = shapes[indexIn].w;
    shapes[indexIn].titleH = shapes[indexIn].h / (1 + boxTitleStripHeightRatio) * boxTitleStripHeightRatio; 

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

    // set width and height and add spacing
    shapes[indexIn].w = maxWidth + 2 * rectSpacingInParent;
    shapes[indexIn].titleW = shapes[indexIn].w;
    shapes[indexIn].h = (totalChildrenHeight + rectSpacingInParent + shapes[indexIn].children.length * rectSpacingInParent) * (1 + boxTitleStripHeightRatio);

    // pending code - logic to restrict textSize based on aspect ratio of title strip

    shapes[indexIn].titleH = shapes[indexIn].h / (1 + boxTitleStripHeightRatio) * boxTitleStripHeightRatio; // limit how tall the title can get
  }
}

function openBoxTitleEditor(indexIn) {
  if (selectedShape != undefined) { // change to shape who's title is being edited
    editingShape = selectedShape;
    console.log('Shape ' + selectedShape + "'s title is is being edited");
    titleEditorOpen = true;
    
    //create textarea element
    textArea = createElement("textarea");
    textArea.elt.id = 'box-title-editor';
    disableEnter('box-title-editor');
    
    // set position
    rawBoxCoordinates = convertCoordinatesTranslatedToRaw(shapes[indexIn].x, shapes[indexIn].y);
    textArea.position(rawBoxCoordinates.x, rawBoxCoordinates.y);

    // set dimensions
    textArea.style('width', shapes[editingShape].titleW * currentScale + 'px');
    textArea.style('height', shapes[editingShape].titleH * currentScale + 'px');

    // load shapes current title
    textArea.elt.value = shapes[editingShape].titleText;

    // disable resize
    textArea.style('resize', 'none');

    // set text size
    textArea.style('font-size', shapes[editingShape].titleH * 0.7 * currentScale + 'px');

    // set alignment

    // focus
    textArea.elt.focus();
  }
}

function removeBoxTitleEditorChar() {
  if (boxTitleEditorRemoveCharToken == true) {
    document.getElementById('box-title-editor').value = document.getElementById('box-title-editor').value.slice(0, -1);
    boxTitleEditorRemoveCharToken = false;
  }
}

function repositionBoxTitleEditor() {
  // add logic to hide when outside the bounds of the screen
  // make function to determine coordinates of the corners of the screen
}

function resizeBoxTitleEditor() {
  // resize based on width
  // maybe include align to centre here
}

function updateBoxTitleText(indexIn) {
  if (titleEditorOpen == true) {
    shapes[editingShape].titleText = document.getElementById('box-title-editor').value;
  }
}

function updateBoxTitleEditorFontSize() {
  if (titleEditorOpen == true) {
    // pending code
  }
}

function closeBoxTitleEditor() {
  if (titleEditorOpen == true) {
    // set box's title to box title editor value
    
    document.getElementById('box-title-editor').remove();
    titleEditorOpen = false;
    editingShape = undefined;
  }
}

function getDescendantsOfShape(indexIn) { // 0th index is the ancestor
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

function getGrandestParentOfShape(indexIn) {
  currentGrandestParent = indexIn;
  while (shapes[currentGrandestParent].parent != undefined) {
    currentGrandestParent = shapes[currentGrandestParent].parent;
  }
  console.log('Shape ' + indexIn + "'s grandest parent is shape " + currentGrandestParent);
  return currentGrandestParent;
}

function getValidDropTargetShape(indexIn) {
  targetIndices = getShapeIndices();
  flaggedIndices = getDescendantsOfShape(indexIn); 

  // remove flagged shapes from indices array
  flaggedIndices = flaggedIndices.sort(function(a, b){return b-a}); // sort flagged indices in descending order to prevent index misalignment
  for (i = 0; i < flaggedIndices.length; i++) {
    if (targetIndices.includes(flaggedIndices[i])) { // only if flagged indice is in targetIndices
      targetIndices.splice(targetIndices.indexOf(flaggedIndices[i]), 1); // find index of flagged shapes and remove
    }
  }
  validTargetShape = targetIndices.splice(-1)[0];
  return validTargetShape; // change from "highest index" to "item with highest order i.e. front, back"
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

function getBoxIndicesTitleStripOnly() {
  shapeIndexArray = [];
  for (i = 0; i < shapes.length; i++) {
    if (translatedMouseX > shapes[i].x &&
        translatedMouseX < shapes[i].x + shapes[i].titleW &&
        translatedMouseY > shapes[i].y &&
        translatedMouseY < shapes[i].y + shapes[i].titleH) {
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
const contextMenu = document.querySelector('.custom-cm');
var cmCommand;
var contextMenuItem; // REMOVE

function initialiseBrowserFunctions() {
  disableTabKey();
  disableAutoscroll('defaultCanvas0');
  disableAutoscroll('custom-cm');
  disableDefaultContextMenu('defaultCanvas0')
  disableDefaultContextMenu('custom-cm')
  addCustomContextMenu('defaultCanvas0');
  closeContextMenu('defaultCanvas0');
}

// disable tab key in document
function disableTabKey() {
  document.addEventListener('keydown', (e) => {
    if (e.which == 9) {
      e.preventDefault();
    }
  })
}

// disable browser middle button autoscroll event in element ID
function disableAutoscroll(element) {
  document.getElementById(element).addEventListener('mousedown', (e) => {
    if (e.button == 1) {
      e.preventDefault();
    }
  });
}

// disable default context menu in element ID
function disableDefaultContextMenu(element) {
  document.getElementById(element).addEventListener('contextmenu', (e) => {
    e.preventDefault();
  })
}

// disable enter key press event
function disableEnter(element) {
  document.getElementById(element).addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  });
}

// add custom context menu in element ID
function addCustomContextMenu(element) {
  document.getElementById(element).addEventListener('contextmenu', (e) => {
    showContextMenu(show = true);
    
    // set y position of contextmenu, ensuring it doesnt go off screen
    if (e.y + contextMenu.offsetHeight > window.innerHeight) {
      contextMenu.style.top = window.innerHeight - contextMenu.offsetHeight + 'px';
    } else {
      contextMenu.style.top = e.y + 'px';
    }

    // set x position of contextmenu, ensuring it doesnt go off screen
    if (e.x + contextMenu.offsetWidth > window.innerWidth) {
      contextMenu.style.left = window.innerWidth - contextMenu.offsetWidth + 'px';
    } else {
      contextMenu.style.left = e.x + 'px';
    }
  });
}

// close context menu when clicking outside of it
function closeContextMenu(element) {
  document.getElementById(element).addEventListener('click', () => {
    showContextMenu(false);
  });
}

// show/hide context menu
function showContextMenu(show = true) {
  if (show == true) {
    contextMenu.style.display = 'block'
  } else {
    contextMenu.style.display = 'none'
  }
}

function openContextMenu() {

}

function customiseContextMenu() {

}

function addItemToContextMenu() {
  contextMenuItem = document.createElement('div'); 
    contextMenuItem.className = 'custom-cm__item';
    contextMenuItem.innerHTML = "Item #";
    contextMenu.appendChild(contextMenuItem);
}

function deleteItemInContextMenu() {
  contextMenu.firstElementChild.remove();
}

function addListenerToContextMenuItem() {
  document.getElementById()
}

function contextMenuItemIsPressed() {
  
}

// written by Elijah Jorell Esmero