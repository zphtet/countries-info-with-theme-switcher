//  {
//         "name": {
//             "common": "Mauritania",
//             "official": "Islamic Republic of Mauritania",
//             "nativeName": {
//                 "ara": {
//                     "official": "الجمهورية الإسلامية الموريتانية",
//                     "common": "موريتانيا"
//                 }
//             }
//         },
//         "capital": [
//             "Nouakchott"
//         ],
//         "region": "Africa",
//         "population": 4649660
//     }

const Store = {
  countries: [],
  selectedCountry: null,
  country: null,
  region: null,
};

const handler = {
  set(target, prop, value) {
    target[`${prop}`] = value;
    // console.log(prop);
    if (prop === "countries") {
      window.dispatchEvent(new Event("countries_change"));
    }
    if (prop === "selectedCountry") {
      window.dispatchEvent(new Event("select_change"));
    }
    if (prop === "country") {
      window.dispatchEvent(new Event("single_country"));
    }

    return true;
  },
};

export async function getAllCountries() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags"
  );
  const data = await res.json();
  proxiedStore.countries = data;
}

export async function getCountryByName(name, detail = true) {
  if (!name) return;
  // ?fullText=true
  let transformName = name.split(".").join(" ").toLowerCase();
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${transformName}`
  );
  const data = await res.json();
  if (!detail) {
    proxiedStore.countries = data;
    return;
  }
  proxiedStore.country = data;
}

const proxiedStore = new Proxy(Store, handler);
// proxiedStore.countries.length = 12;
export default proxiedStore;
