import { AbstractUrlBuilder } from "../../../../domain/specification/builder/abstractUrlBuilder";
import { UrlBuilder } from "../../../../domain/specification/builder/urlBuilder";

/**
 * The Builder defines the domain-specific interface used to build the url of the Kinguin web site.
 */
export class KinguinUrlBuilder
  extends AbstractUrlBuilder
  implements UrlBuilder
{
  constructor(target: string) {
    super(target, "https://www.kinguin.net/listing?");
  }

  /**
   *
   * @returns example https://www.kinguin.net/listing?platforms=2&productType=1&countries=ES&active=1&hideUnavailable=0&phrase=TARGET_TO_SEARCH&page=0&size=50&sort=price.lowestOffer,ASC
   */
  public build(): string {
    return this.url
      .concat("platforms")
      .concat("=")
      .concat("2")
      .concat("&")
      .concat("productType")
      .concat("=")
      .concat("1")
      .concat("&")
      .concat("countries")
      .concat("=")
      .concat("ES")
      .concat("&")
      .concat("active")
      .concat("=")
      .concat("1")
      .concat("&")
      .concat("hideUnavailable")
      .concat("=")
      .concat("0")
      .concat("&")
      .concat("phrase")
      .concat("=")
      .concat(encodeURI(this.target))
      .concat("&")
      .concat("page")
      .concat("=")
      .concat("0")
      .concat("&")
      .concat("size")
      .concat("=")
      .concat("50")
      .concat("&")
      .concat("sort")
      .concat("=")
      .concat("price.lowestOffer,ASC");
  }
}
