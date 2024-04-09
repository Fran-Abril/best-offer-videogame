import { Item } from "../../models/item/item";
import { UrlBuilder } from "../builder/urlBuilder";
import { WebSite } from "../../models/website/webSite";
import { WebSiteBuilder } from "../builder/webSiteBuilder";
import { Fetcher } from "../fetcher/fetcher";

export abstract class AbstractScraper {
  private builder: WebSiteBuilder;
  protected cheerio: any;
  protected fetcher: Fetcher;
  protected urlBuilder: UrlBuilder;

  constructor(
    cheerio: any,
    fetcher: Fetcher,
    urlBuilder: UrlBuilder,
    builder: WebSiteBuilder
  ) {
    this.cheerio = cheerio;
    this.fetcher = fetcher;
    this.builder = builder;
    this.urlBuilder = urlBuilder;
  }

  public push(name: string, price: string) {
    this.builder.push(name, price);
  }

  public build(): WebSite {
    return this.builder.build();
  }
}
