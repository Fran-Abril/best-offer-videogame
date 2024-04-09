import { Scraper } from "../../../../domain/specification/scraper/scraper";
import { SteamDBFetcher } from "../fetcher/steamDBFetcher";
import { Item } from "../../../../domain/models/item/item";

/**
 * The Scraper defines the domain-specific interface used by scrap html web stores.
 */
export class SteamDBScraper implements Scraper {
  items: Item[] = [];

  async scrap(
    cheerio: any,
    fetcher: SteamDBFetcher,
    target: string
  ): Promise<Item[]> {
    await fetcher.fetch(target).then((html) => {
      let scrap = cheerio.load(html);

      console.error("SteamDBScraper WIP");
    });

    return this.items;
  }
}
