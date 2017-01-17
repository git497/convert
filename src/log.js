/**
 * Created by Dion on 2017/1/17.
 */

const fs = require('fs');
const Console = require('console').Console;

let output = fs.createWriteStream('./logs/out.log');
let errorOutput = fs.createWriteStream('./logs/err.log');

let logger = new Console(output, errorOutput);

module.exports = logger;