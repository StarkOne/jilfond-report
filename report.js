const fs = require('fs');
const path = require('path');
let moment = require('moment');
moment.locale('ru');
let date = moment().format('MMMM - GGGG');
let statusDone = [];
const filterStatus = data => {
  statusDone = data.filter(item => item.status == "Внедрено")
}
const createReport = (data) => {
  let text = `${date}\n`;
  filterStatus(data);
  console.log(statusDone);
  data.map(item => {
    text += `${item.title};затрачено - ${item.spent}м; состояние - ${item.status};\n`
  });
  console.log(text);
 /*  fs.writeFile('test.json', JSON.stringify(data), err => {
    if (err) throw err;
    console.log('File is created successfully.');
  }); */
}

module.exports.createReport = createReport;