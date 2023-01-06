const { google } = require("googleapis");

async function getAuthSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();

  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });
  const spreadsheetId = "15XBhRCPujAH6cJ-Mz3HOcEL-jY0X85Cge-PM9kyxFN0";

  return {
    auth,
    client,
    googleSheets,
    spreadsheetId,
  };
}

module.exports = { getAuthSheets };
