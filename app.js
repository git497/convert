/**
 * Created by Dion on 2017/1/17.
 */
const fs = require('fs');

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

if (!fs.existsSync('./db')) {
  fs.mkdirSync('./db');
}

if (!fs.existsSync('./db/files')) {
  fs.mkdirSync('./db/files');
}

const restify = require('restify');
const router = require('./src/router');

let server = restify.createServer();

server.use(restify.CORS({credentials: true}));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser({
  uploadDir: './db/files'
}));

router(server);

server.listen(3000, () => {
  console.log('server listening at', server.address());
});
