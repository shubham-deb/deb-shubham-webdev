/**
 * Created by debsh on 12-05-2017.
 */
// this js is going to be run on the server and is different from the app.js file
// that we have defined in the browser
//console.log("server side todo");

// equivalent of creating a new package for the server
// this is a module for nodejs
module.exports = function (app) {
    //console.log(app);
    // listens for get request from /hello "path"
    //app.get('/hello/:name', sayHello);
    app.get('/lectures/todo', readAllTodos);

    var todos = [
        {'title': 'TODO 1', 'note': 'NOTE 1'},
        {'title': 'TODO 2', 'note': 'NOTE 2'}
    ];

    function readAllTodos(req, res) {
        // sends the data in JSON format
        // eg:[{"title":"TODO 1","note":"NOTE 1"}]
        res.send(todos);
        //res.json(todos);
    }

    function sayHello(req, res) {
        // runs with /hello/shubham
        var name = req.params.name;
        // starts with ?age={num}
        var age = req.query.age;
        res.send("hello " + name + " age: " + age);
    }
};
