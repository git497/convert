/**
 * Created by Dion on 2017/1/17.
 */
const socketio = require('socket.io');

module.exports = server => {
    let io;

    io = socketio.listen(server);

    io.sockets.on('connection', function (socket) {
        socket.emit('news', {hello: 'world'});
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
};