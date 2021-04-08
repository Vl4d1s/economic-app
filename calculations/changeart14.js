const fs = require('fs');
const data = require('./workers.json');

const obj = data;

obj.map(item => {
  item['art14Percent'] = String(item['art14Percent'] / 100);
});

fs.writeFile('test.json', JSON.stringify(obj), function (err) {
  if (err) {
    console.log(err);
  }
});

console.log(obj);
