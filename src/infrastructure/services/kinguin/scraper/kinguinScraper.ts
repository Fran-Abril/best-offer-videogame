import { Scraper } from "../../../../domain/specification/adapter/scraper";
import { KinguinFetcher } from "../fetcher/kinguinFetcher";
import { Item } from "../../../../domain/models/item/item";
import { WebSite } from "../../../../domain/models/website/webSite";

/**
 * The Scraper defines the domain-specific interface used by scrap html web stores.
 */
export class KinguinScraper implements Scraper {
  items: Item[] = [];

  async scrap(
    cheerio: any,
    fetcher: KinguinFetcher,
    target: string
  ): Promise<WebSite> {
    await fetcher.fetch(target).then((html) => {
      let scrap = cheerio.load(html);

      // Find all div elements with a itemscope attribute using the attribute selector
      const scrappedItems = scrap("div[itemscope]");

      // Iterate over each div element with a itemscope attribute
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

        this.items.push({
          name: nameProp,
          price: priceProp,
        });
      });
    });

    return { web: "Kinguin", items: this.items, total: this.items.length };
  }
}
