var commandLogProxied = [];
var commandLog = new Proxy(commandLogProxied, {
    set: function(target, property, value) {
        if (property === 'length') {
          console.log(commandLog[value - 1])
        }
        target[property] = value;
        return true;
      }
}); 