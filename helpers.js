module.exports.filterStatus = data => {
  return data.filter(item => item.status == "Внедрено");
};

module.exports.filterAuthor = (data, { name }) => {
  return data.filter(item => item.working == name);
};

module.exports.createObj = data => {
  const items = [];
  data.map(item => {
    let status = "";
    switch (item.customFields[2]["value"]["name"]) {
      case "Verified":
        status = "Проверена";
        break;
      case "In Progress":
        status = "В работе";
        break;
      default:
        status = item.customFields[2]["value"]["name"];
        break;
    }
    items.push({
      title: item.summary,
      done: typeof item.resolved == "number" ? true : false,
      status: status,
      working: item.customFields[3]["value"]["name"],
      time: item.customFields[4]["value"]
        ? item.customFields[4]["value"].minutes
        : null,
      spent: item.customFields[5]["value"]
        ? item.customFields[5]["value"]["minutes"]
        : null
    });
  });
  return items;
};
