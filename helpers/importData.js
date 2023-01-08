const Model = require("../model/model");
const data = require("./jsonParser");

const importData = async () => {
  try {
    await Model.create(data);
    console.log("data successfully imported");
    process.exit();
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = importData();
