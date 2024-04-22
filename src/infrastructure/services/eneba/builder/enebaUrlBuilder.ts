import { AbstractUrlBuilder } from "../../../../domain/specification/builder/abstractUrlBuilder";
import { UrlBuilder } from "../../../../domain/specification/builder/urlBuilder";

/**
 * The Builder defines the domain-specific interface used to build the url of the Kinguin web site.
 */
export class EnebaUrlBuilder extends AbstractUrlBuilder implements UrlBuilder {
  constructor(target: string) {
    super(target, "https://www.eneba.com/marketplace?");
  }

  /**
   *
   * @returns example https://www.eneba.com/marketplace?text=god%20of%20war&sortBy=RELEVANCE_DESC
   */
  public build(): string {
    return this.url
      .concat("text")
      .concat("=")
      .concat(encodeURI(this.target))
      .concat("&")
      .concat("sortBy")
      .concat("=")
      .concat("RELEVANCE_DESC");
  }
}
