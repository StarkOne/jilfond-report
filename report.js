const fs = require('fs');
const path = require('path');

const createReport = (data) => {
  data.map(item => console.log('tetetet',item));
 /*  fs.writeFile('test.json', JSON.stringify(data), err => {
    if (err) throw err;
    console.log('File is created successfully.');
  }); */
}

module.exports.createReport = createReport;