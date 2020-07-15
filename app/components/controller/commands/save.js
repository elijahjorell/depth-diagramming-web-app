function cSaveNew() {
    var i;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var objectifiedDatabase = JSON.parse(JSON.stringify(mItems.database));

    for (i = 0; i < objectifiedDatabase.length; i++) {
        objectifiedDatabase[i].structure.ancestors = Object.assign({}, objectifiedDatabase[i].structure.ancestors)
        objectifiedDatabase[i].structure.children = Object.assign({}, objectifiedDatabase[i].structure.children)
        objectifiedDatabase[i].structure.descendants = Object.assign({}, objectifiedDatabase[i].structure.descendants)
        objectifiedDatabase[i].structure.siblings = Object.assign({}, objectifiedDatabase[i].structure.siblings)
        objectifiedDatabase[i].process.predecessors = Object.assign({}, objectifiedDatabase[i].process.predecessors)
        objectifiedDatabase[i].process.successors = Object.assign({}, objectifiedDatabase[i].process.successors)
        objectifiedDatabase[i].process.peers = Object.assign({}, objectifiedDatabase[i].process.peers)
        objectifiedDatabase[i].characteristics = Object.assign({}, objectifiedDatabase[i].characteristics)
    }

    mSaves.cloud.collection("saves").add({
        dateTime: date + ' ' + time,
        itemsDatabase: Object.assign({}, objectifiedDatabase),
        originCoordinate: mOrigin.coordinate
    });
    console.log('Saved to cloud')
}



