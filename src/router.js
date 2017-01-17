/**
 * Created by Dion on 2017/1/16.
 */

const _ = require('lodash');
const job = require('./job');
const repo = require('./repo');
const uuid = require('./uuid');

module.exports = server => {

    server.post('/files', (req, res) => {

        let data = req.body;
        let file = req.files.file;
        let key = uuid();

        _.extend(data, {
            key: key,
            createdAt: new Date(),
            name: file.name,
            size: file.size,
            type: file.type,
            path: file.path
        });

        return repo.put(`${key}_info`, data)
            .then(() => job.push(data))
            .then(() => res.send(data))
            .catch(err => res.send(400, err));
    });

    server.get('/files/:id/info', (req, res) => {

        let id = req.id;
        return repo.get(`${id}_info`)
            .then(value => res.send(value))
            .catch(err => res.send(400, err));
    });

    server.get('/files/:id', (req, res) => {
        let id = req.id;
        return repo.get(`${id}_info`)
            .then(value => res.send(value.path))
            .catch(err => res.send(400, err));
    });

    server.get('/files/:id/convert', (req, res) => {
        let id = req.id;
        return repo.get(`${id}_convert`)
            .then(value => res.send(value))
            .catch(err => res.send(400, err));
    });

    server.get('/files/:id/dist', (req, res) => {
        let id = req.id;
        return repo.get(`${id}_convert`)
            .then(value => res.send(value.destFile))
            .catch(err => res.send(400, err));
    });
};
