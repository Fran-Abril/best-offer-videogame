import { Scraper } from "../../../../domain/specification/scraper/scraper";
import { InstantGamingFetcher } from "../fetcher/instantGamingFetcher";
import { WebSite } from "../../../../domain/models/website/webSite";
import { AbstractScraper } from "../../../../domain/specification/scraper/abstractScraper";
import { InstantGamingWebSiteBuilder } from "../builder/instantGamingWebSiteBuilder";
import { InstantGamingUrlBuilder } from "../builder/instantGamingUrlBuilder";

/**
 * The Scraper defines the domain-specific interface used by scrap html web stores.
 */
export class InstantGamingScraper extends AbstractScraper implements Scraper {
  constructor(cheerio: any, target: string) {
    super(
      cheerio,
      new InstantGamingFetcher(),
      new InstantGamingUrlBuilder(target),
      new InstantGamingWebSiteBuilder()
    );
  }

  async scrap(): Promise<WebSite> {
    const search = this.urlBuilder.build();

    await this.fetcher.fetch(search).then((html) => {
      const scrap = this.cheerio.load(html);

      // Find all div elements with a itemscope attribute using the attribute selector
      const scrappedItems = scrap(".item.force-badge");

      // Iterate over each div element with a itemscope attribute
      scrappedItems.each((i: any, scrappedItem: any) => {
        // <h3 itemprop="name" title=
        // items.push(scrap(scrappedItem).html());

        // <h3 itemprop="name" title=
        let nameProp = scrap(scrappedItem).find(".text").text().trim();
        let priceProp = scrap(scrappedItem).find(".price").text().trim();

        if (
          nameProp === null ||
          nameProp === "" ||
          !nameProp
            .toLowerCase()
            .includes(this.urlBuilder.getTarget().toLowerCase())
        ) {
          return;
        }

        this.push(nameProp, priceProp);
      });
    });

    return this.build();
  }
}
