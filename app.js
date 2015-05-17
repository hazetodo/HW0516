var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  //取得指令
  socket.on('kill', function(who){
    //推播所有人
    io.emit('kill', who);
    //回應單一
    console.log(socket.id + '--kill --> ' + who);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});