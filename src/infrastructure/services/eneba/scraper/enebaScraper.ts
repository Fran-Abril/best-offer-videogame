import { Scraper } from "../../../../domain/specification/scraper/scraper";
import { EnebaFetcher } from "../fetcher/enebaFetcher";
import { Item } from "../../../../domain/models/item/item";

/**
 * The Scraper defines the domain-specific interface used by scrap html web stores.
 */
export class EnebaScraper implements Scraper {
  items: Item[] = [];

  async scrap(
    cheerio: any,
    fetcher: EnebaFetcher,
    target: string
  ): Promise<Item[]> {
    await fetcher.fetch(target).then((html) => {
      let scrap = cheerio.load(html);

      console.error("EnebaScraper WIP");
    });

    return this.items;
  }
}
