import { AbstractUrlBuilder } from "../../../../domain/specification/builder/abstractUrlBuilder";
import { UrlBuilder } from "../../../../domain/specification/builder/urlBuilder";

/**
 * The Builder defines the domain-specific interface used to build the url of the Kinguin web site.
 */
export class InstantGamingUrlBuilder
  extends AbstractUrlBuilder
  implements UrlBuilder
{
  constructor(target: string) {
    super(target, "https://www.instant-gaming.com/es/busquedas/?");
  }

  /**
   *
   * @returns example https://www.instant-gaming.com/es/busquedas/?q=god+of+war
   */
  public build(): string {
    return this.url.concat("q").concat("=").concat(encodeURI(this.target));
  }
}
