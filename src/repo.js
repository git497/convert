/**
 * Created by Dion on 2017/1/17.
 */

module.exports = {
    get,
    put
};

const level = require('level');
let db = level('./db/db_data');

function get(key) {
}

function put(key, value) {

}