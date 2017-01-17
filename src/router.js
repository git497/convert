/**
 * Created by Dion on 2017/1/16.
 */

const job = require('./job');
const repo = require('./repo');

module.exports = server => {

    server.post('/files', (req, res) => {

        let file;
        let options;

        function save() {
        }
    });

    server.get('/files/:id/info', (req, res) => {

    });

    server.get('/files/:id', (req, res) => {

    });

    server.get('/files/:id/convert', (req, res) => {

    });
};
