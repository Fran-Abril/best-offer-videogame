import { WebSite } from "../../models/website/webSite";

/**
 * The Scraper defines the domain-specific interface used to scrap HTML web sites.
 */
export interface Scraper {
  scrap(target: string): Promise<WebSite>;
}
