import { Scraper } from "../../../../domain/specification/scraper/scraper";
import { G2AFetcher } from "../fetcher/g2aFetcher";
import { WebSite } from "../../../../domain/models/website/webSite";
import { AbstractScraper } from "../../../../domain/specification/scraper/abstractScraper";
import { G2AWebSiteBuilder } from "../builder/g2aWebSiteBuilder";
import { G2AUrlBuilder } from "../builder/g2aUrlBuilder";

/**
 * The Scraper defines the domain-specific interface used by scrap html web stores.
 */
export class G2AScraper extends AbstractScraper implements Scraper {
  constructor(cheerio: any, target: string) {
    super(
      cheerio,
      new G2AFetcher(),
      new G2AUrlBuilder(target),
      new G2AWebSiteBuilder()
    );
  }

  async scrap(): Promise<WebSite> {
    const search = this.urlBuilder.build();

    await this.fetcher.fetch(search).then((html) => {
      const scrap = this.cheerio.load(html);

      // Find all div elements with a itemscope attribute using the attribute selector
      const scrappedItems = scrap(
        ".sc-euEtCV.indexes__StyledListMobile-wklrsw-94.hTuscY.kRnzLg"
      );

      // Iterate over each div element with a itemscope attribute
      scrappedItems.each((i: any, scrappedItem: any) => {
        // <h3 itemprop="name" title=
        // items.push(scrap(scrappedItem).html());

        // <h3 itemprop="name" title=
        // let nameProp = scrap(scrappedItem).each((i: any, scrappedItem: any) => {);

        scrap(scrappedItem)
          .find(".sc-fHCHyC.crlswz")
          .each((i: any, itemInList: any) => {
            let nameProp = scrap(itemInList).find("h3").text();

            if (
              nameProp === null ||
              nameProp === "" ||
              !nameProp
                .toLowerCase()
                .includes(this.urlBuilder.getTarget().toLowerCase())
            ) {
              return;
            }

            let priceProp = scrap(itemInList)
              .find(".sc-iqAclL.sc-crzoAE.dJFpVb.eqnGHx.sc-bqGGPW.gjCrxq")
              .text();

            this.push(nameProp, priceProp);
          });
      });
    });

    return this.build();
  }
}
