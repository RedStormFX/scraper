const browserObject = require("./helpers/browser");
const scraperController = require("./controlers/pageController");
const getDataResult = require("./helpers/jsonParser");
const express = require("express");

const Authorization = require("./services/google_auth");

const app = express();
app.use(express.json());
const PORT = 3001;

app.get("/metadata", async (req, res) => {
  try {
    const { googleSheets, auth, spreadsheetId } =
      await Authorization.getAuthSheets();
    const metadata = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });
    res.status(200).send(metadata.data);
  } catch (e) {
    res.status(300).send("spreadsheetId or credentials.jsone is invalid");
  }
});

app.post("/addRow", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } =
    await Authorization.getAuthSheets();
  try {
    const row = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "'Test'!A1:C1",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: getDataResult,
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
  res.send(getDataResult);
});

app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
