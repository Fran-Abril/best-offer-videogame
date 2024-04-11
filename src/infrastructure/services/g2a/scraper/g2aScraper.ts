import { Scraper } from "../../../../domain/specification/scraper/scraper";
import { G2aFetcher } from "../fetcher/g2aFetcher";
import { Item } from "../../../../domain/models/item/item";

/**
 * The Scraper defines the domain-specific interface used by scrap html web stores.
 */
export class G2aScraper implements Scraper {
  items: Item[] = [];

  async scrap(
    cheerio: any,
    fetcher: G2aFetcher,
    target: string
  ): Promise<Item[]> {
    await fetcher.fetch(target).then((html) => {
      let scrap = cheerio.load(html);

      console.error("G2aScraper WIP");
    });

    return this.items;
  }
}
