import { Item } from "../item/item";

export interface WebSite {
  web: string;
  search: string;
  total: number;
  items: Item[];
}
