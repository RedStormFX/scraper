const fs = require("fs");
const getDataResult = () => {
  const getData = fs.readFileSync("./data.json", "utf-8");
  return JSON.parse(getData);
};

module.exports = getDataResult();
