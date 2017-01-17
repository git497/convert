/**
 * Created by Dion on 2017/1/17.
 */

const fs = require('fs');
const restify = require('restify');
const ws = require('./src/websocket');
const router = require('./src/router');

let server = restify.createServer();

ws(server);
router(server);

if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}

if (!fs.existsSync('./db')) {
    fs.mkdirSync('./db');
}

server.listen(3000, () => {
    console.log('socket.io server listening at %s', server.url);
});
