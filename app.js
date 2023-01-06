const browserObject = require("./helpers/browser");
const scraperController = require("./controlers/pageController");
const getDataResult = require("./helpers/jsonParser");
const express = require("express");

const Authorization = require("./services/google_auth");

const app = express();
app.use(express.json());
const PORT = 3001;

app.get("/metadata", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } =
    await Authorization.getAuthSheets();
  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
  res.send(metadata.data);
});

app.post("/addRow", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } =
    await Authorization.getAuthSheets();

  const row = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "'Лист1'!A1:C1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [],
    },
  });
  res.send(row.data);
});

app.post("/start", async (req, res) => {
  let browserInstance = browserObject.startBrowser();
  scraperController(browserInstance);
  res.send("Parsing is running", "200 OK");
});
app.get("/result", async (req, res) => {
  res.send(getDataResult);
});

app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
