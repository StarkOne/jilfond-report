let moment = require('moment');
let date = moment().format('GGGG-MM');
module.exports = {
  token: "Bearer perm:0KHQtdC80YzRj9C90L7Qsl/QktC70LDQtNC40YHQu9Cw0LI=.dGVzdA==.dNFPiInQwMQREs1fAk2ai4PnqBUBIy",
  url: `https://jilfond.myjetbrains.com/youtrack/api/issues?fields=id,summary,resolved,description,reporter(login),customFields(projectCustomField($type,id,field($type,id,name)),value(minutes,name,presentation,text))&query=%23issues%20%23%D0%AF%20%D0%B4%D0%B0%D1%82%D0%B0%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B:%20${date}`
}