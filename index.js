var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// Routing
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected!');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(5000, function(){
    console.log('listening on *:5000');
});
