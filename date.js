const { Select } = require('enquirer');
const moment = require("moment");
moment.locale("ru");
const prompt = new Select({
  name: 'Отчёт',
  message: 'Выберите месяц за который вам нужно получить отчёт?',
  choices: [
    ...moment.months()
  ]
});

module.exports = prompt;