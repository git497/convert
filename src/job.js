/**
 * Created by Dion on 2017/1/17.
 */

module.exports = {
    push
};

const level = require('level');
const Jobs = require('level-jobs');
const uuid = require('./uuid');
const convert = require('./convert');
const repo = require('./repo');

let db_queue = level('./db/db_queue');
let queue = Jobs(db_queue, worker, {
    maxConcurrency: 1,
    maxRetries: 1
});

function worker(payload, cb) {
    convert.convertFile(payload.file, payload.options)
        .then(filePath => {
        })
        .catch(err => {
        });

    function updateRecord(key, err, filePath) {
    }
}

function push(file, options) {
    let key = uuid();

    return saveRecord()
        .then(_push);

    function _push() {
        return new Promise((resolve, reject) => {
            queue.push({file, options, key}, err => {
                if (err) {
                    console.error('Error pushing work into the queue', err.stack);
                    reject(err);
                } else {
                    resolve(key);
                }
            });
        });
    }

    function saveRecord() {
        return repo.put(key, {
            fileName: options.fileName,
            filePath: options.filePath
        });
    }
}

