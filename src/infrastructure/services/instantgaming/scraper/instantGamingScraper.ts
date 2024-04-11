import { Scraper } from "../../../../domain/specification/scraper/scraper";
import { InstantGamingFetcher } from "../fetcher/instantGamingFetcher";
import { Item } from "../../../../domain/models/item/item";

/**
 * The Scraper defines the domain-specific interface used by scrap html web stores.
 */
export class InstantGamingScraper implements Scraper {
  items: Item[] = [];

  async scrap(
    cheerio: any,
    fetcher: InstantGamingFetcher,
    target: string
  ): Promise<Item[]> {
    await fetcher.fetch(target).then((html) => {
      let scrap = cheerio.load(html);

      console.error("InstantGamingScraper WIP");
    });

    return this.items;
  }
}
