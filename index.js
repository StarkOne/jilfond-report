const env = require('dotenv').config().parsed;
const { url, outstandingTasks, me } = require("./init");
const prompt = require('./date');
const moment = require("moment");
const axios = require("axios");
const Spinner = require("cli-spinner").Spinner;
const sp = new Spinner();
const report = require("./report");
sp.setSpinnerString(18);
moment.locale("ru");

prompt.run()
  .then((answer) => {
    const dateMonth = moment().month(answer).format("GGGG-MM");
    const urlReady = url.replace(/{data}/gim, dateMonth);
    if (env.TOKEN && env.COST_PER_HOUR) {
      try {
        axios.defaults.headers["Authorization"] = "Bearer " + env.TOKEN;
        axios.defaults.baseURL = "https://jilfond.myjetbrains.com";
      } catch (e) { }
    
      (async () => {
        sp.start();
        const [monthTask, unfulfilled, user] = await Promise.all([
          axios.get(urlReady),
          axios.get(outstandingTasks),
          axios.get(me)
        ]);
        await report.createReport(monthTask, unfulfilled, user, dateMonth);
        sp.stop();
      })();
    } else {
      console.log('Укажите параменты TOKEN или COST_PER_HOUR в .env'.bgRed);
    }
  })
  .catch(console.error);