import { network } from '@oliveai/ldk';

// Define the base URL every call will be using in this client
const BASE_URL = 'https://rxnav.nlm.nih.gov/REST';

// All of the properties we expect from the API for each drug
export interface DrugProperties {
  rxcui: string;
  name: string;
  synonym: string;
  tty: string;
  language: string;
  suppress: string;
  umlscui: string;
}

// The structure of the response from the API
export interface ResponseBody {
  drugGroup: {
    name: unknown;
    conceptGroup: {
      tty: string;
      conceptProperties?: DrugProperties[];
    }[];
  };
}

// Create an object that can be used in other files to make the network calls for this API
export default {
  // Search for a drug by name
  getDrugsByName: async (name: string) => {
    try {
      // Create a URL object to make it easier to define query parameters
      const url = new URL(`${BASE_URL}/drugs.json`);
      url.searchParams.append('name', name);

      // Create the request object
      const req: network.HTTPRequest = {
        method: 'GET',
        url: url.toString(), // https://rxnav.nlm.nih.gov/REST/drugs.json?name=<name>
      };

      // Make the request using the Network aptitude
      const res = await network.httpRequest(req);

      // If the request was unsuccessful, return null
      if (res.statusCode !== 200) {
        return null;
      }

      // Turn the request body from an encoded buffer into an object we can use
      const body: ResponseBody = JSON.parse(await network.decode(res.body));

      // Go through the parsed body and pull out all of the drug properties into a flat array to be used as the results filtering out any that did not have properties
      const results: DrugProperties[] = body.drugGroup.conceptGroup
        .map((cg) => cg.conceptProperties)
        .flat()
        .filter(Boolean);

      return results;
    } catch {
      // If anything fails in the request, return null
      return null;
    }
  },
};
