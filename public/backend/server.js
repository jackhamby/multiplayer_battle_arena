var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.listen(3001)

io.on('connection', function(socket){
    socket.on('message', message => {
        socket.send({"name" : "assfuck"})

    })
});

