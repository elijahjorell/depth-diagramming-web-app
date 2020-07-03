const COMMANDS_STYLE_BASE_ITEM_R = 50;
const COMMANDS_STYLE_DEPTH_ITEM_SCALE_FACTOR = 0.7;

function commandsStyleUpdate(itemID) {
    // depth
    items[commandsFilterGetIndexOfID(itemID)].dimensions.real.r = COMMANDS_STYLE_BASE_ITEM_R * Math.pow(COMMANDS_STYLE_DEPTH_ITEM_SCALE_FACTOR, 
                                                                                                        items[commandsFilterGetIndexOfID(itemID)].structure.depth);
    
}