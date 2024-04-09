import { Item } from "../../models/item/item";
import { WebSite } from "../../models/website/webSite";

export abstract class WebSiteBuilder {
  protected web: string;
  private items: Item[] = [];

  constructor(web: string) {
    this.web = web;
  }

  public push(name: string, price: string) {
    this.items.push({
      name,
      price,
    });
  }

  public build(): WebSite {
    return { web: this.web, items: this.items, total: this.items.length };
  }
}
