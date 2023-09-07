import { ITEM_PER_PAGE } from "../utils/util";

const Store = {
  countries: [],
  pagCountries: [],
  selectedCountry: null,
  country: null,
  region: null,
};

const handler = {
  set(target, prop, value) {
    target[`${prop}`] = value;
    // console.log(prop);
    if (prop === "pagCountries") {
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
  const skip = 0;
  proxiedStore.pagCountries = [...proxiedStore.countries].slice(
    skip,
    ITEM_PER_PAGE
  );
}

export async function getCountryByName(name, detail = true) {
  if (!name) return;
  // ?fullText=true
  let transformName = name.split(".").join(" ").toLowerCase();

  let res = await fetch(
    `https://restcountries.com/v3.1/name/${transformName}?fullText=true`
  );
  const dataFullText = await res.json();
  // console.log("from fulltext");
  // console.log(dataFullText);
  // console.log(res);
  // let res2;
  // if (dataFullText.status === 404) {
  //   res2 = await fetch(`https://restcountries.com/v3.1/name/${transformName}`);
  // }
  // const data = await res2.json();
  if (!detail) {
    proxiedStore.countries = dataFullText;
    return;
  }
  proxiedStore.country = dataFullText;
}

const proxiedStore = new Proxy(Store, handler);
// proxiedStore.countries.length = 12;
export default proxiedStore;
