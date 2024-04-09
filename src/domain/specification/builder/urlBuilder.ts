/**
 * The UrlBuilder defines the domain-specific interface used to build the url of the specific web site.
 */
export interface UrlBuilder {
  getTarget(): string;
  build(): string;
}
