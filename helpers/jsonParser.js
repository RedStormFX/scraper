const getDataResult = () => {
  const result = fs.readFileSync("./data.json", "utf-8");
  return JSON.parse(result);
};

module.exports = getDataResult();
