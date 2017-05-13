// this module might depend on other modules []
// this js file is executed on the browser
angular
    .module("TodoApp",[])
    .controller("TodoController",TodoController);

// create the controller and the instance will tie the connection between the view and the controller
// scope declared by infrastructure and passed to us when we declare it by their name
// scope of the controller is the div element
function TodoController($scope, $http) {
    //$scope.hello = "Hello World";
    $scope.todos = [];
    // browser has only one thread, so it does and async call to the server
    // fetch the todos from the server and this is an async call
    $http.get('/lectures/todo').then(function (response) {
        // when the server responds, it passes the response to this function
        console.log(response);

        // Not able to produce the response before the server
        $scope.todos = response.data;
    });
    $scope.createToDo = createToDo;
    $scope.deleteTodo = deleteTodo;
    $scope.selectTodo = selectTodo;
    $scope.updateTodo = updateTodo;
    $scope.selecteIndex = -1;

    function updateTodo(todo) {
        $scope.todos[$scope.selecteIndex].title = todo.title;
        $scope.todos[$scope.selecteIndex].note = todo.note;
        $scope.todo = {}
    }

    // This is connected to the button event
    function createToDo(todo) {
        //console.log(todo);
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

    function deleteTodo(todo) {
        //console.log(todo);
        // once we get the index of the element that is to be deleted, we can delete it using splice
        var index = $scope.todos.indexOf(todo);
        // if it is 1 it is remove, if it is 0 we have to add element to the array
        // so the syntax would be splice(index,0,[things to add]);
        $scope.todos.splice(index, 1);
    }

    function selectTodo(todo) {
        // clear out the current text and note in the input and textarea and then add the selected list
        // to be added to the area
        $scope.todo = {};
        $scope.selecteIndex = $scope.todos.indexOf(todo);
        // we select the title and bind it to the "title" scope of input and "note" scope of textarea
        $scope.todo.title = todo.title;
        $scope.todo.note = todo.note;
    }
}