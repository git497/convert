/**
 * Created by Dion on 2017/1/17.
 */
const FormData = require('form-data');
const fs = require('fs');

let form = new FormData();
form.append('format', 'js');
form.append('to', 'pdf');
form.append('ext', 'pdf');
form.append('file', fs.createReadStream('./app.js'));

form.submit('http://localhost:3000/files', (err, res) => {
  res.resume();
});
