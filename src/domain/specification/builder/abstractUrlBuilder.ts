/**
 * The Builder defines the domain-specific interface used to build the url of the specific web site.
 */
export abstract class AbstractUrlBuilder {
  public target: string;

  protected url: string;

  constructor(target: string, url: string) {
    this.target = target;
    this.url = url;
  }

  public getUrl(): string {
    return this.url;
  }

  public getTarget(): string {
    return this.target;
  }
}
