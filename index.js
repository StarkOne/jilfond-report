const { token, url } = require('./config');
const axios = require('axios');
const report = require('./report');
try {
  axios.defaults.headers['Authorization'] = token;
}
catch (e) { }
axios.get(url)
  .then(response => {
    const { data } = response;
    const items = [];
    data.map(item => {
      //console.log(item.customFields[4]["value"] ? '1': '2');
      items.push({
        title: item.summary,
        done: typeof (item.resolved) == 'number' ? true : false,
        status: item.customFields[2]["value"]['name'],
        working: item.customFields[3]["value"]['name'],
        time: item.customFields[4]["value"] ? item.customFields[4]['value'].minutes : null,
        spent: item.customFields[5]["value"] ? item.customFields[5]["value"]['minutes'] : null,
      })
    });
    return items;
  }).then((data) => {
    report.createReport(data);
  })
  .catch(error => {
    // handle error
    console.log(error);
  })