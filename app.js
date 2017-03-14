var ToDo = angular.module("ToDo", []);

ToDo.factory("todoService", function() {
  var tasks = {};

  var _items = [{ text: "Get groceries from the store",
                    dueDate: new Date(),
                    completed: false }];

  tasks.getItems = function() {
    return _items;
  };

  tasks.printTask = function(item) {
    _items.push(item)
  };
  tasks.deleteTask = function(item) {
      var i = _items.indexOf(item);
      _items.splice(i, 1);
  };
  tasks.clearCompleted = function() {
    for(var i = 0; i < _items.length; i++) {
      if (_items[i].completed) {
        _items.splice(i, 1);
      }
    }
  };

  return tasks;
});

ToDo.controller("TodoCtrl", [
  "$scope", "todoService", function($scope, todoService) {
    $scope.showCompleted = true;
    $scope.changeCompleted = function(){
      $scope.showCompleted = !$scope.showCompleted;
    };
    $scope.items = todoService.getItems();
    $scope.printTask = function() {
      var item = { text: this.textTask, date: this.textDate, completed: false };
      todoService.printTask(item);
      this.textTask = "";
      this.textDate = "";
    },
    $scope.deleteTask = function(item) {
      todoService.deleteTask(item);
    },
    $scope.clearCompleted = function() {
      todoService.clearCompleted();
    }    
  }]);

ToDo.filter('completedFilter', function() {
  return function(collection, showCompleted) {
    if (showCompleted) { return collection }
    var filteredCollection = [];
    collection.forEach( function(item) {
      if (!item.completed) {
        filteredCollection.push(item);
      }
    });
    return filteredCollection;
  }
});

ToDo.directive('todoItem', function() {
  return {
    templateUrl: "todo.html",
    restrict: 'E',
    scope: true
  }
})