var cLogProxied = [];
var cLog = new Proxy(cLogProxied, {
    set: function(target, property, value) {
        if (property === 'length') {
          console.log(cLog[value - 1])
        }
        target[property] = value;
        return true;
      }
}); 