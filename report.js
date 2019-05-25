const fs = require('fs');
const path = require('path');

const createReport = (data) => {
  let text = "";
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