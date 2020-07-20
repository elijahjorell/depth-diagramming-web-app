
function mStyleItemsUpdate() {
    var i;
    for (i = 0; i < mItems.database.length; i++) {
        // if default
        if (mItems.database[i].structure.children.length === 0) {
            
            // if grabbed + hovered
            if (cGrab.IDs.includes(mItems.database[i].id) && mCursor.IDs.front === mItems.database[i].id) {
                mItems.database[i].style = 'default-grabbed-hover';

            // if grabbed
            } else if (cGrab.IDs.includes(mItems.database[i].id)) {
                mItems.database[i].style = 'default-grabbed';

            // if selected + hovered
            } else if ((cSelectArea.IDs.includes(mItems.database[i].id) || cSelect.IDs.includes(mItems.database[i].id)) && 
                 mCursor.IDs.front === mItems.database[i].id) {
                mItems.database[i].style = 'default-selected-hover';

            // if selected
            } else if (cSelectArea.IDs.includes(mItems.database[i].id) || cSelect.IDs.includes(mItems.database[i].id)) {
                mItems.database[i].style = 'default-selected';

            // if hovered
            } else if (mCursor.IDs.front === mItems.database[i].id) {
                mItems.database[i].style = 'default-hover';

            // if no interaction    
            } else {
                mItems.database[i].style = 'default';
            }

        // if parent
        } else {

            // if grabbed + hovered
            if (cGrab.IDs.includes(mItems.database[i].id) && mCursor.IDs.front === mItems.database[i].id) {
                mItems.database[i].style = 'parent-grabbed-hover';

            // if grabbed
            } else if (cGrab.IDs.includes(mItems.database[i].id)) {
                mItems.database[i].style = 'parent-grabbed';

            // if selected + hovered
            } else if ((cSelectArea.IDs.includes(mItems.database[i].id) || cSelect.IDs.includes(mItems.database[i].id)) &&
                mCursor.IDs.front === mItems.database[i].id) {
                mItems.database[i].style = 'parent-selected-hover';

            // if selected
            } else if (cSelectArea.IDs.includes(mItems.database[i].id) || cSelect.IDs.includes(mItems.database[i].id)) {
                mItems.database[i].style = 'parent-selected';

            // if hovered
            } else if (mCursor.IDs.front === mItems.database[i].id) {
                mItems.database[i].style = 'parent-hover';

            // if no interaction    
            } else {
                mItems.database[i].style = 'parent';
            }
        }
    }
}