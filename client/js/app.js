Function.prototype.inherits = function(baseclass) {
  baseclass.apply(this);
}


var app = angular.module('app', [
  'ngResource',
  'BaseModule',
  'ui.router'
]);

app.factory('Cache', function() {
  function Cache() {
    this.cached = [];
    this.cacheInstance = function(primaryKey, instance) {
      this.cached[instance[primaryKey]] = instance; 
    }
    this.isCached = function(key) {
      return this.cached[key];
    }    
  }
  return Cache; 
});

app.factory('BaseClass', function(Cache, $http) {
  function Base(){
    var _constructor = this; 
    var _proto = _constructor.prototype;
    var primaryKey = _constructor.primaryKey || 'id';
    
    _constructor.new = function(attrs) {
      var instance = _constructor.cache.isCached(attrs[primaryKey]);
      if(instance) {
        return instance; 
      } else {
        instance = new _constructor(attrs);
        _constructor.cache.cacheInstance(primaryKey, instance);
        return instance;
      }
    }

    _constructor.cache = new Cache();
    
    _proto.$save = function() {
      console.log('saving model');
    }

    _proto.refresh = function() {
      return $http.get('/model');
    }
  } 
  return Base; 
});

app.factory('Post', function(BaseClass) {
  function Post(attrs) {
    angular.extend(this, attrs);  
  }
  Post.inherits(BaseClass);
  Post.primaryKey = 'name';
  return Post; 
});

app.factory('Comment', function(BaseClass) {
  function Comment(attrs) {
    angular.extend(this, attrs);
    this.addComment = function() {
      console.log('adding comment');
    }
  }
  Comment.inherits(BaseClass);
  return Comment;
});


app.controller('MainCtrl', function($scope, Post, Comment) {
  $scope.post = Post.new({id: 1, commentId: 45});
  $scope.cache = Post.cache;
});










