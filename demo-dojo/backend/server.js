/**
 * Serving some static files
 * https://github.com/cloudhead/node-static
 *
 * Startup a socket.io channel
 * http://socket.io/
 */
var http = require('http'),
    static = require('node-static'),
    socket = require('socket.io');


// Create a node-static server instance to serve the './frontend' folder
var file = new(static.Server)('./frontend');

var app = http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    });
}).listen(8080);
console.log("Static server started");



// Create a socket listener
var users = {};
var global_content = "";
var io = socket.listen(app);

io.sockets.on('connection', function(socket) {

    function log(eventStr) {
        console.log("Event: " + eventStr + " from " + users[socket.id] + " (" + socket.id + ")")
    }

    /**
     * Register a new user and broadcast this happy news
     */
    socket.on("register", function(data){
        log("register");

        var name = data["name"];
        if(!name) {
            name = socket.id;
        }

        users[socket.id] = name;
        var newData = {list: users};
        socket.emit("dudes", newData);
        socket.emit("change", {content: global_content});

        socket.broadcast.emit("dudes", newData);
    });

    /**
     * Event when a user issued a change. The broadcast emits messages to all connected clients except to the one
     * that issued the change.
     */
    socket.on('change', function (data) {
        log("change");

        global_content = data["content"];
        var data = {content: global_content};
        socket.broadcast.emit('change', data);
    });

    /**
     * Event when the user disconnects
     */
    socket.on('disconnect', function(){
        log("disconnect");

        delete users[socket.id];
        var newData = {list: users};
        socket.broadcast.emit("dudes", newData);
    });
});
console.log("Socket.io started");


