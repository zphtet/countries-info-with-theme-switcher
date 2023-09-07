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

export async function getAllCountries(region = false, regionName) {
  if (region && regionName !== "all") {
    const res = await fetch(
      `https://restcountries.com/v3.1/region/${regionName}?fields=name,capital,region,population,flags`
    );
    const data = await res.json();
    proxiedStore.countries = data;
    const skip = 0;
    proxiedStore.pagCountries = [...proxiedStore.countries].slice(
      skip,
      ITEM_PER_PAGE
    );
    return;
  }
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
  let transformName = name.split(".").join(" ").toLowerCase();

  let res = await fetch(
    `https://restcountries.com/v3.1/name/${transformName}?fullText=true`
  );
  const dataFullText = await res.json();

  if (!detail) {
    proxiedStore.countries = dataFullText;

    window.dispatchEvent(new Event("search_country"));
    return;
  }
  proxiedStore.country = dataFullText;
}

const proxiedStore = new Proxy(Store, handler);
export default proxiedStore;
