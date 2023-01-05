const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const { executablePath } = require("puppeteer");

//for solve captcha problem
const BrowserOptions = {
  headless: false,
  defaultViewport: null,
  ignoreHTTPSErrors: true,
  args: [
    "--disable-setuid-sandbox",
    "--no-sandbox",
    "--ignore-certificate-errors",
  ],
  executablePath: executablePath(),
};

async function startBrowser() {
  let browser;
  try {
    console.log("Opening the browser......");

    browser = await puppeteer.launch(BrowserOptions);
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
