import { Item } from "../item/item";

export interface WebSite {
  web: string;
  total: number;
  items: Item[];
}
