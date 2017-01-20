/**
 * Created by Dion on 2017/1/17.
 */

module.exports = {
    push
};

const level = require('level');
const Jobs = require('level-jobs');
const convert = require('./convert');
const repo = require('./repo');

let db_queue = level('./db/queue');
let queue = Jobs(db_queue, worker, {
    maxConcurrency: 1,
    maxRetries: 1
});

function worker(payload, cb) {
    convert.convertFile(payload.path, payload)
        .then(filePath => {
            cb(null);
            return updateRecord(payload.key, null, filePath);
        })
        .catch(err => {
            cb(err);
            return updateRecord(payload.key, err, null);
        });

    function updateRecord(key, err, filePath) {
        key = `${key}_convert`;
        return repo.getObj(key)
            .then(value => {
                value.finished = true;
                value.finishedAt = new Date();
                value.success = !!err;
                value.err = err.toString();
                value.destFile = filePath;
                return repo.putObj(key, value);
            });
    }
}

function push(data) {

    return saveRecord()
        .then(_push);

    function _push() {
        return new Promise((resolve, reject) => {
            queue.push(data, err => {
                if (err) {
                    console.error('Error pushing work into the queue', err.stack);
                    reject(err);
                } else {
                    resolve(data.key);
                }
            });
        });
    }

    function saveRecord() {
        return repo.putObj(`${data.key}_convert`, {
            name: data.name,
            path: data.path,
            createdAt: new Date(),
            finished: false
        });
    }
}