import { Item } from "../../models/item/item";
import { WebSite } from "../../models/website/webSite";
import { Fetcher } from "./fetcher";

/**
 * The Scraper defines the domain-specific interface used to scrap HTML web sites.
 */
export interface Scraper {
  items: Item[];
  scrap(cheerio: any, parser: Fetcher, target: string): Promise<WebSite>;
}
