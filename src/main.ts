import { WebSite } from "./domain/models/website/webSite";
import { CompatibleWebSites } from "./domain/models/website/compatibleWebSites";
import { KinguinScraper } from "./infrastructure/services/kinguin/scraper/kinguinScraper";

const express = require("express");
const cheerio = require("cheerio");

var app = express();

app.get("/api/game/:game", async (req: any, res: any) => {
  let target: string = req.params.game.toLocaleLowerCase();
  //TODO: move this to service and execute Service Scraper only if query param is not null
  let webSite: string[] = req.query.webSite.split(",");
  let response: WebSite[] = [];

  await new KinguinScraper(cheerio, target).scrap().then((webSite) => {
    response.push(webSite);
  });

  res.json(response);
});

app.get("/api/websites", async (req: any, res: any) => {
  let webSites: string[] = [];

  //TODO: move this to service
  Object.keys(CompatibleWebSites)
    .filter((v) => isNaN(Number(v)))
    .forEach((key, index) => {
      webSites.push(key);
    });

  res.json(webSites);
});

app.listen(3000);
