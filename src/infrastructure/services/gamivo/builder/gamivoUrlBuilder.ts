import { AbstractUrlBuilder } from "../../../../domain/specification/builder/abstractUrlBuilder";
import { UrlBuilder } from "../../../../domain/specification/builder/urlBuilder";

/**
 * The Builder defines the domain-specific interface used to build the url of the Kinguin web site.
 */
export class GamivoUrlBuilder extends AbstractUrlBuilder implements UrlBuilder {
  constructor(target: string, url: string) {
    super(target, url);
  }

  /**
   *
   * @returns example https://www.gamivo.com/es/search/god%20of%20war?platforms=%5B"Steam"%5D
   */
  public build(): string {
    return this.url
      .concat("search?q=")
      .concat(this.target.split(" ").join("+"))
      .concat("+site")
      .concat("%3Awww.gamivo.com");
    // .concat("=")
    // .concat("%5B")
    // .concat('"DLCs","Games"')
    // .concat("%5D")
    // .concat("&")
    // .concat("regions")
    // .concat("=")
    // .concat("%5B")
    // .concat('"EU","Global"')
    // .concat("%5D")
    // .concat("&")
    // .concat("platforms")
    // .concat("=")
    // .concat("%5B")
    // .concat('"steam"')
    // .concat("%5D")
  }
}
