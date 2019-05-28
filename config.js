let moment = require("moment");
let date = moment().format("GGGG-MM");

module.exports = {
  costPerHour: "", //Тут ваша зп за час
  token:
    "", // Bearer + токен с YouTrack
  url: `/youtrack/api/issues?fields=id,summary,resolved,description,reporter(login),customFields(projectCustomField($type,id,field($type,id,name)),value(minutes,name,presentation,text))&query=%23issues%20%23%D0%AF%20%D0%B4%D0%B0%D1%82%D0%B0%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B:%20${date}`,
  outstandingTasks:
    "/youtrack/api/issues?fields=id,summary,resolved,description,reporter(login),customFields(projectCustomField($type,id,field($type,id,name)),value(minutes,name,presentation,text))&query=%23%D0%AF%20%20%23%7B%D0%92%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B5%7D%20%23%D0%A2%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%23%D0%97%D0%B0%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B0",
  me: "/youtrack/api/admin/users/me?fields=id,login,name,email"
};
