const moment = require("moment");
moment.locale("ru");
const fs = require("fs");
const path = require("path");
const colors = require('colors');
const env = require('dotenv').config().parsed;
const helpers = require("./helpers");
const directory = __dirname + "/reports";
let pathReports = null;
let planAll = null;
let spentAll = null;
let moneyAll = null;
let date, title;
function formatTime(data) {
  return data ? (((data / 60) > 1) ? (Math.floor((data / 60)).toFixed(0) + 'ч') + (data % 60 != 0 ? Math.floor(data % 60)  + 'м' : '') : data + 'м') : '0'
}

function createCurrentDate(str) {
  if(str) {
    date = moment(str).format("MMMM - GGGG");
    title = moment(str).format("MMMM-GGGG");
  } else {
    date = moment().format("MMMM - GGGG");
    title = moment().format("MMMM-GGGG");
  }
}

const createReport = ({ data }, { data: taskNotDone }, { data: user }, month) => {
  createCurrentDate(month);
  pathReports = path.join(__dirname, "reports", `${title}.txt`);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  let text = `${date}\n\n`;
  const items = helpers.filterAuthor(helpers.createObj(data), user);
  const itemsNotDone = helpers.createObj(taskNotDone);
  const statusDone = helpers.filterStatus(items);
  const statusNotDone = helpers.filterAuthor(itemsNotDone, user);
  items.map(item => {
    text += `${item.title}; затрачено - ${
      item.spent ? formatTime(item.spent) : 0
    }; состояние - ${item.status};\n`;
  });
  text += "\nДостигнутые результаты:\n\n";
  statusDone.map(item => {
    let money = ((item.time * (env.COST_PER_HOUR / 60)) * 1.3).toFixed(0);
    planAll += item.time;
    spentAll += item.spent;
    moneyAll += parseInt(money);
    text += `${item.title}; план - ${item.time ? formatTime(item.time) : 0}; затрачено - ${
      item.spent ? formatTime(item.spent) : 0
    }; стоимость - ${money}р;\n`;
  });
  text += `Всего: план ${formatTime(planAll)}; затрачено ${formatTime(spentAll)}; стоимость ${moneyAll ? moneyAll : '0'}р;\n`
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