const { token, url, outstandingTasks, me, costPerHour } = require("./config");
const axios = require("axios");
const Spinner = require("cli-spinner").Spinner;
const sp = new Spinner();
sp.setSpinnerString(18);
const report = require("./report");
if (token && costPerHour) {
  try {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
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
  console.log('Вы забыли написать свой token или costPerHour в config.js'.bgRed);
}
