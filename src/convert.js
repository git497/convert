/**
 * Created by Dion on 2017/1/16.
 */

const path = require('path');
const os = require('os');
const fs = require('fs');
const uuid = require('./uuid');
const logger = require('./log');
const spawn = require('child_process').spawn;

module.exports = {
    init,
    convertFile,
    convertStream
};

function init() {
    let unoconv = spawn('unoconv', [
        '-l'
    ]);
    unoconv.on('error', err => {
        logger.error(`unoconv listen process error ${err}`);
    });
    unoconv.on('exit', (code, signal) => {
        logger.info(`unoconv listen process exit with ${code}, ${signal}`);
    });
}

function convertFile(file, options) {
    logger.info(`convert ${file}`);

    options = options || {};
    options.to = options.to || 'pdf';
    options.ext = options.ext || options.to;
    let outputFile = createTempFile(options.ext);
    let params = [];
    if (options.format === 'spreadsheet') {
        params = ['-d', 'spreadsheet'];
    }
    params = params.concat(['-f', options.to, '-o', options.name, file]);
    logger.info(`unoconv output file ${outputFile}`);
    let unoconv = spawn('unoconv', params);

    return new Promise((resolve, reject) => {
        unoconv.stdout.on('data', data => {
            logger.info(`unoconv stdout: ${data}`);
        });
        unoconv.stderr.on('data', data => {
            logger.info(`unoconv stderr: ${data}`);
            reject(data);
        });
        unoconv.on('close', code => {
            logger.info(`unoconv child process exited with code ${code}`);
            resolve(outputFile);
        });
        unoconv.on('error', err => {
            logger.error(`unoconv error ${err}`);
            reject(err);
        });
    });
}

function convertStream(fileSteam, format) {
    let failed = false;
    let savePath = createTempFile();
    let output = fs.createWriteStream(savePath);  // Create a file write stream

    return new Promise((resolve, reject) => {
        output.on('error', err => {
            failed = true;
            logger.error('convert err ' + err);
            reject(err);
            fs.unlinkSync(savePath);
        });

        output.on('finish', () => {
            if (!failed) {
                convertFile(savePath, format)
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            }
        });
        fileSteam.pipe(output);
    });
}

function createTempFile(ext) {
    let fileName = uuid();
    if (ext) {
        fileName += `.${ext}`;
    }
    return path.join(os.tmpDir(), fileName);
}