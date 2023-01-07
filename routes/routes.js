const express = require("express");
const Model = require("../model/model");
const router = express.Router();
const data = require("../helpers/jsonParser");
const importData = require("../helpers/importData");
const browserObject = require("../helpers/browser");
const scraperController = require("../controlers/pageController");

// Start Parser
router.post("/start", async (req, res) => {
  try {
    let browserInstance = browserObject.startBrowser();
    scraperController(browserInstance);
    res.status(200).send("Parsing is running");
  } catch (e) {
    res.status(500).send(e.message, "Parsing process crashed");
  }
});
//Chek result from data.json file
router.get("/result", async (req, res) => {
  res.send(data);
});
//Add row to google sheet
router.post("/sendtosheets", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } =
    await Authorization.getAuthSheets();
  try {
    const row = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: "'Test'!A:H",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            "Company Name",
            "Short Description",
            "Company Web Site",
            "Tags",
            "Team Size",
            "Company Linkedin",
            "Contact Name",
            "Available Jobs",
          ],
          ...data.map((el) => Object.values(el)),
        ],
      },
    });
    res.send(row.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
//import data to mongodb
router.post("/post", async (req, res) => {
  const parseData = new Model(importData);
  //importData();
  try {
    const dataToSave = await parseData.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
