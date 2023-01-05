const browserObject = require("./helpers/browser");
const scraperController = require("./controlers/pageController");

let browserInstance = browserObject.startBrowser();

scraperController(browserInstance);
