import { Fetcher } from "../../../../domain/specification/adapter/fetcher";

/**
 * The Parser defines the domain-specific interface used by parse webStore HTML.
 */
export class EnebaFetcher implements Fetcher {
  async fetch(target: string): Promise<string | void> {
    console.error("EnebaFetcher WIP");
  }
}
