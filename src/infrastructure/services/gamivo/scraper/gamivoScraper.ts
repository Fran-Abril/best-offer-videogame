import { Scraper } from "../../../../domain/specification/scraper/scraper";
import { WebSite } from "../../../../domain/models/website/webSite";
import { AbstractScraper } from "../../../../domain/specification/scraper/abstractScraper";
import { GamivoFetcher } from "../fetcher/gamivoFetcher";
import { GamivoUrlBuilder } from "../builder/gamivoUrlBuilder";
import { GamivoWebSiteBuilder } from "../builder/gamivoWebSiteBuilder";

/**
 * The Scraper defines the domain-specific interface used by scrap html web stores.
 */
export class GamivoScraper extends AbstractScraper implements Scraper {
  constructor(cheerio: any, target: string) {
    super(
      cheerio,
      new GamivoFetcher(),
      new GamivoUrlBuilder(target, "https://www.google.com/"),
      new GamivoWebSiteBuilder("Extracted from google search")
    );
  }

  /**
   * Cloudflare is blocking the scrappers, it is using gooogle search engine
   * @returns
   */
  async scrap(): Promise<WebSite> {
    const filter1 = "€";
    const filter2 = "to";
    const search = this.urlBuilder.build();

    await this.fetcher.fetch(search).then((html) => {
      const scrap = this.cheerio.load(html);

      const scrappedItems = scrap(".r0bn4c.rQMQod");

      scrappedItems.each((i: any, scrappedItem: any) => {
        let priceProp: string = scrap(scrappedItem).text().trim();

        if (!priceProp.includes(filter1) || !priceProp.includes(filter2)) {
          return;
        }

        this.push(this.urlBuilder.getTarget(), priceProp);
      });
    });

    return this.build();
  }
}
