var io = require('socket.io').listen(4000);

io.sockets.on('connection', function(socket) {
    socket.on('join', function(data) {
        console.log('join');
        socket.username = data.username;
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('join', {
            username: data.username,
            socket: socket.id,
            room: data.room
        });
    });
    
    socket.on('ping', function(data) {
        console.log('ping');
        socket.broadcast.to(data.room).emit('ping', {
            username: socket.username,
            room: data.room
        });
    });
    
    socket.on('privatePing', function(data) {
        console.log('privatePing');
        io.sockets.connected[data.socket].emit('ping', {
            username: socket.username,
            priv: true,
            room: data.room
        });
    });
});