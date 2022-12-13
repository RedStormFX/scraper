const scraperObject = {
  url: "https://www.ycombinator.com/topcompanies",
  async scraper(browser) {
    const page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    await page.waitForSelector(
      ".mx-auto.max-w-ycdc-page > section:nth-child(26) > div > table",
    );
    const urls = await page.$$eval(
      "div.top-companies table.companies-table tr.top-company-row, section.top-companies table.companies-table tr.top-company-row",
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

        await newPage.waitForSelector(".max-w-full > h1");
        dataObj["companyName"] = await newPage.$eval(
          ".max-w-full > h1",
          (text) => text.textContent,
          //idk how solve problem when selector not found if error 500
        );
        dataObj["shortDescription"] = await newPage.$eval(
          ".text-xl",
          (text) => text.textContent,
        );
        dataObj["companyWebsite"] = await newPage.$eval(
          ".leading-none",
          (text) => text.querySelector("a").href,
        );
        //idk how i can catch all tags
        dataObj["Tags"] = await newPage.$eval(
          ".flex-wrap.gap-y-2.gap-x-2",
          (text) => text.querySelector("span:nth-child(n)").textContent,
        );

        dataObj["teamSize"] = await newPage.$eval(
          ".ycdc-card",
          (text) =>
            text.querySelector("div:nth-child(2) > span:nth-child(2)")
              .textContent,
        );
        dataObj["companyLinkedIn"] = await newPage.$eval(
          ".space-x-2",
          (text) => text.querySelector("a").href,
        );
        dataObj["contactName"] = await newPage.$eval(
          ".leading-snug",
          (text) => text.querySelector(".font-bold").textContent,
        );
        dataObj["availableJobs"] = await newPage.$eval(
          "div.my-8.mb-4",
          (text) => {
            text = text.querySelector("div:nth-child(2) > span").textContent;
            if (text !== "0") {
              return (text = true);
            } else {
              return (text = false);
            }
          },
        );

        resolve(dataObj);
        await newPage.close();
      });

    for (link in urls) {
      let currentPageData = await pagePromise(urls[link]);
      console.log(currentPageData);
    }
    await browser.close();
    console.log(`All process takes ${performance.now()} ms`);
  },
};

module.exports = scraperObject;
