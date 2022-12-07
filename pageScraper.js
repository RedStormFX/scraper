const scraperObject = {
  url: "https://comfy.ua/ua/notebook/",
  async scraper(browser) {
    const page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    await page.waitForSelector(".availability-filter__radio:first-child");
    await page.click(".availability-filter__radio:first-child");
    console.log("In Stock selected");
    await page.waitForSelector(".products-catalog");
    const urls = await page.$$eval(
      ".products-catalog .products-list-item__info",
      (links) => {
        links = links.map((el) => el.querySelector("a").href);
        return links;
      }
    );
    console.log(urls);
    // const pagePromise = (link) =>
    //   new Promise(async (resolve, reject) => {
    //     let dataObj = {};
    //     let newPage = await browser.newPage();
    //     await newPage.goto(link);
    // await newPage.waitForSelector(".page-container > h1");
    // dataObj["productName"] = await newPage.$eval(
    //   ".page-container > h1",
    //   (text) => text.textContent
    // );
    //         dataObj["productRating"] = await newPage.$eval(
    //           ".icon-comfy rating-box__active",
    //           (text) => text.textContent
    //         );
    //         dataObj["reviewsNumbers"] = await newPage.$eval(
    //           ".i-main__reviews-qty",
    //           (text) => text.textContent
    //         );
    //         dataObj["currentPrice"] = await newPage.$eval(
    //           ".price__current",
    //           (text) => text.textContent
    //         );
    //         dataObj["oldPrice"] = await newPage.$eval(
    //           ".price__old",
    //           (text) => text.textContent
    //         );
    //         dataObj["bonusAmount"] = await newPage.$eval(
    //           ".bonus-label-value",
    //           (text) => text.textContent
    //         );
    //         dataObj["credits"] = await newPage.$eval(
    //           ".info-credit i-credit",
    //           (text) => text.textContent
    //         );
    //         resolve(dataObj);
    //         await newPage.close();
    //   });

    // for (link in urls) {
    //   let currentPageData = await pagePromise(urls[link]);
    //   console.log(currentPageData);
    // }
    // await browser.close();
    // console.log(`All process takes ${performance.now()} ms`);
  },
};

module.exports = scraperObject;
