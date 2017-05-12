// this module might depend on other modules []
angular
    .module("TodoApp",[])
    .controller("TodoController",TodoController);

// create the controller and the instance will tie the connection between the view and the controller
// scope declared by infrastructure and passed to us when we declare it by their name
// scope of the controller is the div element
function  TodoController($scope) {
    //$scope.hello = "Hello World";
    $scope.todos = [
        {'title':'TODO 1','note':'NOTE 1'}
    ];
    $scope.createToDo = createToDo;
    $scope.deleteToDo = deleteToDo;

    // This is connected to the button event
    function createToDo(todo) {
        console.log(todo);
        var newtodo = {
            title:todo.title,
            note:todo.note
        };
        // whatever the created object todo is we push it to the array of todos which was already defined.
        // but we want to push just the copy of each object which is being created and not the object itself otherwise
        // it would point to the object always and we cannot add the same object twice into the list because as
        // it will be a duplicate.
        $scope.todos.push(newtodo);
    }
    function deleteToDo(todo) {
        console.log(todo);
    }
}