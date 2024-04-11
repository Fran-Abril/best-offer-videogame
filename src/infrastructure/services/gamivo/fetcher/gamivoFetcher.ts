import { Fetcher } from "../../../../domain/specification/fetcher/fetcher";

/**
 * The Parser defines the domain-specific interface used by parse webStore HTML.
 */
export class GamivoFetcher implements Fetcher {
  async fetch(target: string): Promise<string | void> {
    console.error("GamivoFetcher WIP");
  }
}
