import { Fetcher } from "../../../../domain/specification/adapter/fetcher";

/**
 * The Parser defines the domain-specific interface used by parse webStore HTML.
 */
export class G2aFetcher implements Fetcher {
  async fetch(target: string): Promise<string | void> {
    console.error("G2aFetcher WIP");
  }
}
