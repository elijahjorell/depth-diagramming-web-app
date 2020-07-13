cMove = {
    active: false,
    speed: 5 // multiply by 60 to get px moved per second
}

// move up while holding the selected elements in place

function cMoveArrowKeysStart() {
    if (!cMove.active && cSelect.active && !cGrab.active) {      
        cMove.active = true;
        mItemsMoveIDsToEndOfDatabase(cSelect.IDs);
        console.log(mItems.database);
    }
}

function cMoveArrowKeysOn() {
    var i;
    var itemIndex;
    if (cMove.active) {
        if (cSelect.active && !cGrab.active) {
            // if all arrow keys are released end move command
            if (!keyIsDown(UP_ARROW) &&
                !keyIsDown(DOWN_ARROW) &&
                !keyIsDown(LEFT_ARROW) &&
                !keyIsDown(RIGHT_ARROW)) {
                cMoveArrowKeysEnd();
            }

            // update item coordinates
            for (i = 0; i < cSelect.IDs.length; i++) {
                itemIndex = mItemsGetIndexOfID(cSelect.IDs[i]);
                if (keyIsDown(UP_ARROW)) {
                    mItems.database[itemIndex].coordinate.y -= cMove.speed;
                }
                if (keyIsDown(DOWN_ARROW)) {
                    mItems.database[itemIndex].coordinate.y += cMove.speed;
                }
                if (keyIsDown(LEFT_ARROW)) {
                    mItems.database[itemIndex].coordinate.x -= cMove.speed;
                }
                if (keyIsDown(RIGHT_ARROW)) {
                    mItems.database[itemIndex].coordinate.x += cMove.speed;
                }
            }
        } else {
            cMoveArrowKeysEnd();
        }
    }
}

function cMoveArrowKeysEnd() {
    if (cMove.active) {
        cMove.active = false;
        console.log(mItems.database);
    }
}