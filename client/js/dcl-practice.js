app.factory('Pluggable', function() {
  var Pluggable = dcl(null, {
    declaredClass: "Pluggable", 
    constructor: function(attrs) {
      this.plugged = attrs.plugged || false; 
    },
    isPlugged: function() {
      return this.plugged; 
    },
    unplug: function() {
      this.plugged = false; 
    }, 
    plug: function() {
      this.plugged = true; 
    }
  });
  return Pluggable;
});

app.factory('Comp', function(Pluggable) {
  var Comp = dcl(Pluggable, {
    declaredClass: 'Comp'
  });
  return Comp; 
});

app.run(function(Comp) {
  var comp = new Comp({
    plugged: true
  });
});

app.controller('MainCtrl', function($scope, Comp) {
  var comp = new Comp({
    plugged: true
  });
  $scope.comp = comp; 
});









