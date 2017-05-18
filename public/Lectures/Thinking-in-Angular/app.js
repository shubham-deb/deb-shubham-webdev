<!-- Angular js declares a global variable called angular-->
//console.log(angular)
// returns a module object by creating the module using the globl variable angular which is an angular object
// which was created when we imported the js file.
var module = angular.module("myApp",[]);
// here we register the controller with the module and the main function is going to be executed
module.controller("MainController",Main);

// this will be executed when it encounters ng-controller in the dom tree
// before calling the main it gets the scope object from the DOM an passes it to the function.
function Main($scope){
    $scope.hourOfDay = 9;
    $scope.updateTime = updateTime;
    function updateTime() {
        var currentDate = new Date();
        $scope.timeString = currentDate.toTimeString();
    }
}
