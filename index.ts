const express = require("express");
const cheerio = require("cheerio");

var app = express();

app.get("/api/game/:game", async (req: any, res: any) => {
  let target: string = req.params.game.toLocaleLowerCase();

  let kinguinUrl =
    "https://www.kinguin.net/listing?platforms=2&productType=1&countries=ES&active=1&hideUnavailable=0&phrase=TARGET_TO_SEARCH&page=0&size=50&sort=price.lowestOffer,ASC";
  kinguinUrl = kinguinUrl.replace("TARGET_TO_SEARCH", encodeURI(target));

  const html = await getHTML(kinguinUrl);

  let scrap = cheerio.load(html);

  let items = kinguinParser(scrap, target);

  res.json({ web: "kinguin", total: items.length, items: items });
});

app.listen(3000);

function kinguinParser(scrap: any, target: string) {
  let items: any = [];
  // Find all div elements with a data-example attribute of "1" using the attribute selector
  const scrappedItems = scrap("div[itemscope]");

  // Iterate over each div element with a data-example attribute of "1" and print its text content
  scrappedItems.each((i: any, scrappedItem: any) => {
    // <h3 itemprop="name" title=
    // items.push(scrap(scrappedItem).html());

    // <h3 itemprop="name" title=
    let nameProp = scrap(scrappedItem)
      .find('h3[itemprop="name"]')
      .text()
      .trim();

    if (
      nameProp === null ||
      nameProp === "" ||
      !nameProp.toLowerCase().includes(target.toLowerCase())
    ) {
      return;
    }

    let priceProp = "";
    scrap(scrappedItem)
      .find('div[itemprop="offers"]')
      .each((i: any, offersProp: any) => {
        scrap(offersProp)
          .find('span[itemprop="lowPrice"]')
          .each((i: any, lowPriceProp: any) => {
            priceProp = scrap(lowPriceProp).text();
          });
      });

    items.push({
      name: nameProp,
      price: priceProp,
    });
  });

  return items;
}

async function getHTML(url: string) {
  // Make request
  return await fetch(url, {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en,es-ES;q=0.9,es;q=0.8",
      "cache-control": "max-age=0",
      "sec-ch-ua":
        '"Not A(Brand";v="99", "Opera GX";v="107", "Chromium";v="121"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "service-worker-navigation-preload": "true",
      "upgrade-insecure-requests": "1",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  })
    .then(function (response) {
      // The API call was successful!
      return response.text();
    })
    .then(function (html) {
      // This is the HTML from our response as a text string
      return html;
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
}
