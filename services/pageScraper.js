fs = require("fs");
const scraperObject = {
  url: "https://www.ycombinator.com/topcompanies",
  async scraper(browser) {
    const page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    let scrapedData = [];
    async function scrapeCurrentPage() {
      await page.waitForSelector(
        ".mx-auto.max-w-ycdc-page > section:nth-child(26) > div > table",
      );
      const urls = await page.$$eval(
        "tr.top-company-row:nth-child(-n+100)",
        (links) => {
          links = links.map((el) => el.querySelector("a").href);
          return links;
        },
      );
      console.log(urls);
      const pagePromise = (link) =>
        new Promise(async (resolve, reject) => {
          let dataObj = {};
          let newPage = await browser.newPage();
          await newPage.goto(link);
          try {
            await newPage.waitForSelector(".max-w-full > h1");
          } catch (err) {
            resolve(null);
            await newPage.close();
            return null;
          }
          dataObj["companyName"] = await newPage
            .$eval(".max-w-full > h1", (text) => text.textContent)
            .catch((err) => "N/A");
          dataObj["shortDescription"] = await newPage
            .$eval(".text-xl", (text) => text.textContent)
            .catch((err) => "N/A");
          dataObj["companyWebsite"] = await newPage
            .$eval(
              ".my-8.mb-4 > div > div",
              (text) => text.querySelector("a").href,
            )
            .catch((err) => "N/A");
          //idk how i can catch all tags
          dataObj["Tags"] = await newPage
            .$$eval(
              ".space-y-3 .flex.flex-row.align-center.flex-wrap .ycdc-badge",
              (budges) =>
                budges
                  .map(
                    (el) =>
                      Array.from(el.childNodes).find(
                        (node) => node.nodeType === 3,
                      ).textContent,
                  )
                  .join(" / "),
            )
            .catch((err) => "N/A");

          dataObj["teamSize"] = await newPage
            .$eval(
              ".ycdc-card",
              (text) =>
                text.querySelector("div:nth-child(2) > span:nth-child(2)")
                  .textContent,
            )
            .catch((err) => "N/A");
          dataObj["companyLinkedIn"] = await newPage
            .$eval(".space-x-2", (text) => text.querySelector("a").href)
            .catch((err) => "N/A");
          dataObj["contactName"] = await newPage
            .$eval(
              ".leading-snug",
              (text) => text.querySelector(".font-bold").textContent,
            )
            .catch((err) => "N/A");
          dataObj["availableJobs"] = await newPage
            .$eval("div.my-8.mb-4", (text) => {
              text = text.querySelector("div:nth-child(2) > span").textContent;
              if (text !== "0") {
                return (text = true);
              } else {
                return (text = false);
              }
            })
            .catch((err) => "N/A");
          resolve(dataObj);
          await newPage.close();
        });

      for (link in urls) {
        let currentPageData = await pagePromise(urls[link]);
        console.log(currentPageData);
        if (currentPageData !== null) {
          scrapedData.push(currentPageData);
        }
      }
      await page.close();
      return scrapedData;
    }
    let data = await scrapeCurrentPage();
    return data;
  },
};

module.exports = scraperObject;
