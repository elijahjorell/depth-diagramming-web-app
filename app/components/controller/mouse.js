function mousePressed() {
    if (mouseButton === LEFT) {
        // while mItems.IDs are selected
        if (cSelectItemsArray.length > 0) { 
            // click on canvas
            if (mCursor.IDs.front === undefined) {
                cSelectEnd();
                cSelectAreaBegin();
            // click on a selected item
            } else if (cSelectItemsArray.includes(mCursor.IDs.front)) {
                cGrabBegin(cSelectItemsArray);
            // click on a non-selected item
            } else {
                cSelectEnd();
                cSelectItems(mCursor.IDs.front);
                cGrabBegin(cSelectItemsArray);
            }
        // while nothing is grabbed or selected
        } else { 
            // click on the canvas
            if (mCursor.IDs.front === undefined) {
                cSelectAreaBegin();
            // click on item
            } else {
                cSelectItems(mCursor.IDs.front);
                cGrabBegin(cSelectItemsArray);
            }
        }
    } else if (mouseButton === CENTER) {
        cPanBegin();
    }
}

function mouseReleased() {
    if (mouseButton === LEFT) {
        if (cSelectAreaOriginCoordinate !== undefined) {
            cSelectItems(cSelectAreaDetectedItems);
            cSelectAreaEnd();
        } else {
            cGrabEnd();
        }
    } else if (mouseButton === CENTER) {
        cPanEnd();
    }
}

function mouseDisableAutoscroll() {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 1) {
        e.preventDefault();
      }
    });
}

mouseDisableAutoscroll();