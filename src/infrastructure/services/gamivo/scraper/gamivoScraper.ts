import { Scraper } from "../../../../domain/specification/scraper/scraper";
import { GamivoFetcher } from "../../gamivo/fetcher/gamivoFetcher";
import { Item } from "../../../../domain/models/item/item";

/**
 * The Scraper defines the domain-specific interface used by scrap html web stores.
 */
export class GamivoScraper implements Scraper {
  items: Item[] = [];

  async scrap(
    cheerio: any,
    fetcher: GamivoFetcher,
    target: string
  ): Promise<Item[]> {
    await fetcher.fetch(target).then((html) => {
      let scrap = cheerio.load(html);

      console.error("GamivoScraper WIP");
    });

    return this.items;
  }
}
