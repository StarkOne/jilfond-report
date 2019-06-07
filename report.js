const moment = require("moment");
moment.locale("ru");
const fs = require("fs");
const path = require("path");
const env = require('dotenv').config().parsed;
const helpers = require("./helpers");
let date, title;
if(process.argv[3]) {
  dateParam = process.argv[3].split(/date=/)[1] + '-01';
  date = moment(dateParam).format("MMMM - GGGG");
  title = moment(dateParam).format("MMMM-GGGG");
} else {
  date = moment().format("MMMM - GGGG");
  title = moment().format("MMMM-GGGG");
}
const directory = __dirname + "/reports";
const pathReports = path.join(__dirname, "reports", `${title}.txt`);

let planAll = null;
let spentAll = null;
let moneyAll = null;

function formatTime(data) {
  return (((data / 60) > 1) ? (Math.floor((data / 60)).toFixed(0) + 'ч') + (data % 60 != 0 ? Math.floor(data % 60)  + 'м' : '') : data + 'м')
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
    let money = ((item.time * (env.COST_PER_HOUR / 60)) * 1.3).toFixed(0);
    planAll += item.time;
    spentAll += item.spent;
    moneyAll += parseInt(money);
    text += `${item.title}; план - ${item.time ? formatTime(item.time) : 0}; затрачено - ${
      item.spent ? formatTime(item.spent) : 0
    }; стоимость - ${money}р;\n`;
  });
  text += `Всего: план ${formatTime(planAll)}; затрачено ${formatTime(spentAll)}; стоимость ${moneyAll}р;\n`
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