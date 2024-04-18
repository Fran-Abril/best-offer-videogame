import { Scraper } from "../../../../domain/specification/scraper/scraper";
import { KinguinFetcher } from "../fetcher/kinguinFetcher";
import { WebSite } from "../../../../domain/models/website/webSite";
import { AbstractScraper } from "../../../../domain/specification/scraper/abstractScraper";
import { KinguinWebSiteBuilder } from "../builder/kinguinWebSiteBuilder";
import { KinguinUrlBuilder } from "../builder/kinguinUrlBuilder";

/**
 * The Scraper defines the domain-specific interface used by scrap html web stores.
 */
export class KinguinScraper extends AbstractScraper implements Scraper {
  constructor(cheerio: any, target: string) {
    super(
      cheerio,
      new KinguinFetcher(),
      new KinguinUrlBuilder(target),
      new KinguinWebSiteBuilder()
    );
  }

  async scrap(): Promise<WebSite> {
    const search = this.urlBuilder.build();

    await this.fetcher.fetch(search).then((html) => {
      const scrap = this.cheerio.load(html);

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
          !nameProp
            .toLowerCase()
            .includes(this.urlBuilder.getTarget().toLowerCase())
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

        this.push(nameProp, priceProp);
      });
    });

    return this.build();
  }
}
