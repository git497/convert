/**
 * Created by Dion on 2017/1/17.
 */

const restify = require('restify');
const ws = require('./src/websocket');
const router = require('./src/router');

let server = restify.createServer();

ws(server);
router(server);

server.listen(3000, () => {
    console.log('socket.io server listening at %s', server.url);
});
