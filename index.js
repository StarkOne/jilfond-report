const env = require('dotenv').config().parsed;
const { url, outstandingTasks, me } = require("./init");
const axios = require("axios");
const Spinner = require("cli-spinner").Spinner;
const sp = new Spinner();
const report = require("./report");
sp.setSpinnerString(18);

if (env.TOKEN && env.COST_PER_HOUR) {
  try {
    axios.defaults.headers["Authorization"] = "Bearer " + env.TOKEN;
    axios.defaults.baseURL = "https://jilfond.myjetbrains.com";
  } catch (e) { }

  (async () => {
    sp.start();
    const [monthTask, unfulfilled, user] = await Promise.all([
      axios.get(url),
      axios.get(outstandingTasks),
      axios.get(me)
    ]);
    await report.createReport(monthTask, unfulfilled, user);
    sp.stop();
  })();
} else {
  console.log('Укажите параменты TOKEN или COST_PER_HOUR в .env'.bgRed);
}
