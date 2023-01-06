const browserObject = require("./helpers/browser");
const scraperController = require("./controlers/pageController");
const data = require("./helpers/jsonParser");
const express = require("express");

const Authorization = require("./services/google_auth");

const app = express();
app.use(express.json());
const PORT = 3001;
app.post("/addRow", async (req, res) => {
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

app.post("/start", async (req, res) => {
  try {
    let browserInstance = browserObject.startBrowser();
    scraperController(browserInstance);
    res.status(200).send("Parsing is running");
  } catch (e) {
    res.status(500).send(e.message, "Parsing process crashed");
  }
});
app.get("/result", async (req, res) => {
  res.send(data);
});

app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
