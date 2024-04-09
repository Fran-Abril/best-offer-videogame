/**
 * The Fetcher defines the domain-specific interface used to fetch an HTML.
 */
export interface Fetcher {
  fetch(target: string): Promise<string | void>;
}
