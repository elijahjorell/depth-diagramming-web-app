function cSaveNew() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    mSaves.local.push({
        dateTime: date + ' ' + time,
        itemsDatabase: Object.assign({}, mItems.database),
        originCoordinate: mOrigin.coordinate
    });
    mSaves.cloud.collection("saves").add({
        dateTime: date + ' ' + time,
        itemsDatabase: Object.assign({}, mItems.database),
        originCoordinate: mOrigin.coordinate
    });
    console.log('Saved to cloud')
}



