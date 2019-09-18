var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.listen(3001)

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('message', message => {
        console.log(message)
        socket.send({"name" : "assfuck"})

    })
});

