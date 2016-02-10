var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages =[{
    id: 1,
    text: "Hola soy un mensaje",
    author: "Manuel Gopar"
  }]
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.status(200).send("Helow wordl");
});

io.on('connection', function (socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('messages', messages);
    socket.on('new-message', function (data) {
        messages.push(data);

        io.socket.emit('messages', messages);
    });
});

server.listen(8080, function () {
 console.log("Servidor corriendo en localhost:8080");
});
