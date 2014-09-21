var app = angular.module('app', ['ngResource']);

app.constant('ENV', {
  apiUrl: 'http://localhost:3000'
});

app.constant('Models', {
  list: ['Account']
});

app.factory('AccountModel', function($resource) {
  return function AccountModel(props) {
    var resource = $resource('/account', {}, {});
    return new resource(props);
  }
});

app.factory('ModelBuilder', function(Models, $injector) {
  var models = {};
  Models.list.forEach(function(model) {
    models[model] = $injector.get(model + 'Model');
  });
  return {
    getModel: function(name) {
      return models[name];
    }
  }
});


app.config(function($provide) {
  console.log('config');
});

app.controller('MainCtrl', function(ModelBuilder) {
  console.log('controller');
  var Account = ModelBuilder.getModel('Account');
  var account = new Account({id: 1});
  account.$save().then(function(account) {
    account.name = "New Name"; 
    account.$save().then(function(account) {
      console.log(account);
    });
  });
});