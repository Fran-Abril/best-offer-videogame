import { Scraper } from "../../../../domain/specification/scraper/scraper";
import { EnebaFetcher } from "../fetcher/enebaFetcher";
import { WebSite } from "../../../../domain/models/website/webSite";
import { AbstractScraper } from "../../../../domain/specification/scraper/abstractScraper";
import { EnebaWebSiteBuilder } from "../builder/enebaWebSiteBuilder";
import { EnebaUrlBuilder } from "../builder/enebaUrlBuilder";

/**
 * The Scraper defines the domain-specific interface used by scrap html web stores.
 */
export class EnebaScraper extends AbstractScraper implements Scraper {
  constructor(cheerio: any, target: string) {
    super(
      cheerio,
      new EnebaFetcher(),
      new EnebaUrlBuilder(target),
      new EnebaWebSiteBuilder()
    );
  }

  async scrap(): Promise<WebSite> {
    const search = this.urlBuilder.build();

    await this.fetcher.fetch(search).then((html) => {
      const scrap = this.cheerio.load(html);

      // Find all div elements with a itemscope attribute using the attribute selector
      const scrappedItems = scrap(".JZCH_t");

      // Iterate over each div element with a itemscope attribute
      scrappedItems.each((i: any, scrappedItem: any) => {
        // <h3 itemprop="name" title=
        // items.push(scrap(scrappedItem).html());

        // <h3 itemprop="name" title=
        // let nameProp = scrap(scrappedItem).each((i: any, scrappedItem: any) => {);

        scrap(scrappedItem)
          .find(".uy1qit")
          .each((i: any, itemInList: any) => {
            let nameProp = scrap(itemInList).find(".tUUnLz").text();

            if (
              nameProp === null ||
              nameProp === "" ||
              !nameProp
                .toLowerCase()
                .includes(this.urlBuilder.getTarget().toLowerCase())
            ) {
              return;
            }

            let priceProp = scrap(itemInList).find(".L5ErLT").first().text();

            this.push(nameProp, priceProp);
          });
      });
    });

    return this.build();
  }
}
