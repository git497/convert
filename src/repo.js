/**
 * Created by Dion on 2017/1/17.
 */
module.exports = {
  get,
  put,
  putObj,
  getObj
};

const level = require('level');

let db = level('./db/data');

function getObj(key) {
  return get(key)
    .then(value => JSON.parse(value));
}

function putObj(key, obj) {
  return put(key, JSON.stringify(obj));
}

function get(key) {
  return new Promise((resolve, reject) => {
    db.get(key, (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
}

function put(key, value) {
  return new Promise((resolve, reject) => {
    db.put(key, value, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}
