var ToDo = angular.module("ToDo", []);

ToDo.controller("TodoCtrl", [
  "$scope", "$window", function($scope, $window) {
    $scope.items = [{ text: "Get groceries from the store",
                    dueDate: new Date(),
                    completed: false }],
    $scope.alert = function(text) {
      alert(text);
    },
    $scope.printTask = function() {
      this.items.push({ text: this.textTask, date: this.textDate, completed: false })
      this.textTask = "";
      this.textDate = "";
    },
    $scope.deleteTask = function(item) {
      var i = this.items.indexOf(item);
      this.items.splice(i, 1);
    }
    $scope.clearCompleted = function() {
      console.log('hi')
      for(var i = 0; i < this.items.length; i++) {
        if (this.items[i].completed) {
          this.items.splice(i, 1);
        }
      }
    }
  }]);