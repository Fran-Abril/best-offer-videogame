import { Fetcher } from "../../../../domain/specification/fetcher/fetcher";

// Hacer una petición para un usuario con ID especifico
/**
 * The Parser defines the domain-specific interface used by parse webStore HTML.
 */
export class GamivoFetcher implements Fetcher {
  async fetch(target: string): Promise<string | void> {
    return await fetch(target, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en,es-ES;q=0.9,es;q=0.8",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Opera GX";v="107", "Chromium";v="121"',
        "sec-ch-ua-arch": '"x86"',
        "sec-ch-ua-bitness": '"64"',
        "sec-ch-ua-full-version": '"107.0.5045.86"',
        "sec-ch-ua-full-version-list":
          '"Not A(Brand";v="99.0.0.0", "Opera GX";v="107.0.5045.86", "Chromium";v="121.0.6167.186"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": '""',
        "sec-ch-ua-platform": '"Windows"',
        "sec-ch-ua-platform-version": '"15.0.0"',
        "sec-ch-ua-wow64": "?0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "x-client-data": "CP6GywE=",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(function (response) {
        // The API call was successful!
        return response.text();
      })
      .then(async function (html) {
        // This is the HTML from our response as a text string
        return html;
      })
      .catch(function (err) {
        // There was an error
        console.warn("Something went wrong.", err);
      });
  }
}
