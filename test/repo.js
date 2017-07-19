/**
 * Created by Dion on 2017/1/17.
 */
const repo = require('../src/repo');

repo.putObj('12', {d: 1, b: 2})
  .then(() => {
    return repo.getObj('12')
      .then(value => console.log(value));
  });
