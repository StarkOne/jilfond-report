const env = require('dotenv').config().parsed;
const { url, outstandingTasks, me } = require("./init");
const axios = require("axios");
const Spinner = require("cli-spinner").Spinner;
const sp = new Spinner();
const report = require("./report");
sp.setSpinnerString(18);
console.log(env.TOKEN)
if (env.TOKEN && env.COST_PER_HOUR) {
  try {
    axios.defaults.headers["Authorization"] = env.TOKEN;
    axios.defaults.baseURL = "https://jilfond.myjetbrains.com";
  } catch (e) { }

  (async () => {
    sp.start();
    const [monthTask, unfulfilled, user] = await Promise.all([
      axios.get(url),
      axios.get(outstandingTasks),
      axios.get(me)
    ]);
    console.log(monthTask, unfulfilled, user);
    await report.createReport(monthTask, unfulfilled, user);
    sp.stop();
  })();
} else {
  console.log('Вы забыли написать свой token или costPerHour в config.js'.bgRed);
}
