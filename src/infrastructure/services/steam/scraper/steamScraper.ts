import { Scraper } from "../../../../domain/specification/scraper/scraper";
import { SteamFetcher } from "../fetcher/steamFetcher";
import { Item } from "../../../../domain/models/item/item";

/**
 * The Scraper defines the domain-specific interface used by scrap html web stores.
 */
export class SteamScraper implements Scraper {
  items: Item[] = [];

  async scrap(
    cheerio: any,
    fetcher: SteamFetcher,
    target: string
  ): Promise<Item[]> {
    await fetcher.fetch(target).then((html) => {
      let scrap = cheerio.load(html);

      console.error("SteamScraper WIP");
    });

    return this.items;
  }
}
