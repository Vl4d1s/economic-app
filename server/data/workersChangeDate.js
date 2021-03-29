const fs = require('fs');
const data = require('./workers.json');

const obj = data;

obj.map(item => {
  changeDate(item['birthDate'], 'birthDate');
  changeDate(item['startJobDate'], 'startJobDate');
  if (item['art14StartingDate'] !== '') {
    changeDate(item['art14StartingDate'], 'art14StartingDate');
  }
  if (item['leavingDate'] !== '') {
    changeDate(item['leavingDate'], 'leavingDate');
  }

  function changeDate(date, string) {
    const [day, month, year] = date.split('-');
    const newYear = year >= 0 && year <= 21 ? '20' + year : '19' + year;
    item[string] = `${newYear}-${day}-${month}`;
  }
});

fs.writeFile('test.json', JSON.stringify(obj), function (err) {
  if (err) {
    console.log(err);
  }
});

console.log(obj);
