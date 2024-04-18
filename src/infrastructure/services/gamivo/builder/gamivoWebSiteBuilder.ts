import { WebSiteBuilder } from "../../../../domain/specification/builder/webSiteBuilder";

export class GamivoWebSiteBuilder extends WebSiteBuilder {
  constructor(description: string) {
    super("Gamivo".concat(" ").concat(description));
  }
}
