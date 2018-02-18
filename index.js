var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('Un usuario conectado O.o');
  socket.on('disconnect', function() {
    console.log('Usuario desconectado T_T');
  });

  io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
  });

});

io.emit('some event', {
  for: 'everyone'
});


http.listen(3000, function() {
  console.log('Listening on *:3000');
});