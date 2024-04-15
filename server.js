const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('Usuario conectado');

    socket.on('chat message 1', function(msg, name){
        console.log(`Usuario 1 => { name: "${name}" , msg: "${msg}"}`);
        io.emit('chat message 1', name, msg);
    });

    socket.on('chat message 2', function(msg, name){
        console.log(`Usuario 2 => { name: "${name}" , msg: "${msg}"}`);
        io.emit('chat message 2', name, msg);
    });

    socket.on('disconnect', function(){
        console.log('Usuario desconectado');
    });
});

http.listen(3000, function(){
    console.log('Servidor escuchando en http://localhost:3000');
});