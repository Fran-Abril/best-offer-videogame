import { AbstractUrlBuilder } from "../../../../domain/specification/builder/abstractUrlBuilder";
import { UrlBuilder } from "../../../../domain/specification/builder/urlBuilder";

/**
 * The Builder defines the domain-specific interface used to build the url of the Kinguin web site.
 */
export class G2AUrlBuilder
  extends AbstractUrlBuilder
  implements UrlBuilder
{
  constructor(target: string) {
    super(target, "https://www.g2a.com/search?");
  }

  /**
   *
   * @returns example https://www.g2a.com/search?query=god%20of%20war
   */
  public build(): string {
    return this.url.concat("query").concat("=").concat(encodeURI(this.target));
  }
}
