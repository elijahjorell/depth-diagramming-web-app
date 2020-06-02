var shapes = [];

// DISPLAY
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
  displayShapes();
  updatePreviousMouseCoordinates();
}

function displayShapes() {
  for (i = 0; i < shapes.length; i++) {
    ellipse(shapes[i].x, shapes[i].y, shapes[i].r);
  }
}

function updatePreviousMouseCoordinates() {
  previousX = mouseX;
  previousY = mouseY;
}

function updateTranslatedMouseCoordinates() {
  translatedMouseX = (mouseX - originX) / currentScale;
  translatedMouseY = (mouseY - originY) / currentScale;
}

// KEYBOARD/MOUSE

function keyPressed() {
  if (keyCode == ENTER) {
    shapes.push({
      x: translatedMouseX,
      y: translatedMouseY,
      r: 50
    });
  }
}

function mouseWheel(event) {
  zoom(event);
}

function mousePressed() {
  if (mouseButton == LEFT) {
    selectObject(getShapeID());
  } else if (mouseButton == CENTER) {
    panning = "on";
  }
}

function mouseReleased() {
  if (panning == "on") {
    panning = "off";
  }
}

// NAVIGATION
var panning = "off";
var panRefX;
var panRefY;
var previousX;
var previousY;

function pan() {
  if (panning == "on") {
    originX -= 0.7 * (previousX - mouseX);
    originY -= 0.7 * (previousY - mouseY);
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

// COMMANDS
function selectObject() {
  
}

function getShapeID() {
  for (i = 0; i < shapes.length; i++) {
    distanceToShape = dist(translatedMouseX,
                           translatedMouseY,
                           shapes[i].x,
                           shapes[i].y)
    if (distanceToShape < shapes[i].r) {
      return i;
    }
  }
}
