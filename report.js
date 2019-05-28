const fs = require("fs");
const path = require("path");
const moment = require("moment");
const config = require("./config");
const helpers = require("./helpers");
const colors = require("colors");
moment.locale("ru");
const date = moment().format("MMMM - GGGG");
const title = moment().format("MMMM-GGGG");
const directory = __dirname + "/reports";
const pathReports = path.join(__dirname, "reports", `${title}.txt`);

function formatTime(data) {
  return (((data / 60) > 1) ? ((data / 60).toFixed(0) + 'ч') + (data % 60 != 0 ? (data % 60)  + 'м' : '') : data + 'м')
}

const createReport = ({ data }, { data: taskNotDone }, { data: user }) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  let text = `${date}\n\n`;
  const items = helpers.createObj(data);
  const itemsNotDone = helpers.createObj(taskNotDone);
  const statusDone = helpers.filterStatus(helpers.filterAuthor(items, user));
  const statusNotDone = helpers.filterAuthor(itemsNotDone, user);
  items.map(item => {
    text += `${item.title}; затрачено - ${
      item.spent ? formatTime(item.spent) : 0
    }; состояние - ${item.status};\n`;
  });
  text += "\nДостигнутые результаты:\n\n";
  statusDone.map(item => {
    text += `${item.title}; план - ${item.time ? formatTime(item.time) : 0}; затрачено - ${
      item.spent ? formatTime(item.spent) : 0
    }; стоимость - ${(item.time * (config.costPerHour / 60) * 1.3).toFixed(0)}р;\n`;
  });
  text += `\nПланы на ${moment()
    .add(1, "M")
    .format("MMMM")}:\n\n`;
  statusNotDone.map(item => {
    text += `${item.title}\n`;
  });

  fs.writeFile(pathReports, text, err => {
    if (err) throw err;
    console.log(`Отчёт за ${date} успешно создан`.green);
  });
};

module.exports.createReport = createReport;