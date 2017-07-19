/**
 * Created by Dion on 2017/1/17.
 */
const fs = require('fs');
const Console = require('console').Console;

const output = fs.createWriteStream('./logs/out.log');
const errorOutput = fs.createWriteStream('./logs/err.log');
const logger = new Console(output, errorOutput);

module.exports = logger;
