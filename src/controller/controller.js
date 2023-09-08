import proxiedStore, {
  getAllCountries,
  getCountryByName,
} from "../model/Store";
import {
  LoadingUI,
  renderAllCountries,
  renderDetail,
  renderPagination,
  removePagination,
  reAddPagination,
} from "../view/view";
import { ITEM_PER_PAGE, sliceArray } from "../utils/util";
// GLOBAL FUNCTIONS

// 1)
LoadingUI("#main-sec");
// 2)
getAllCountries();
// 3)
const rednerPag = renderPagination("#pagination");

// Listen Global Events
let pagTotal;
window.addEventListener("countries_change", function () {
  console.log("loaded all countries");
  const { pagCountries } = proxiedStore;
  renderAllCountries(pagCountries, "#main-sec");

  let current = 1;
  let total = proxiedStore.countries.length;
  pagTotal = Math.ceil(total / ITEM_PER_PAGE);
  rednerPag(current, pagTotal);
});

window.addEventListener("single_country", function () {
  renderDetail(proxiedStore.country[0], "#main-sec");
  removePagination("#pagination");
});

window.addEventListener("click", function (e) {
  const cardEle = e.target.closest(".card");
  const bordEle = e.target.closest(".border-item");
  let value = null;

  if (bordEle) {
    value = bordEle.dataset.name.toLowerCase();
    proxiedStore.selectedCountry = value;
  }
  if (cardEle) {
    value = cardEle.dataset.name;
    proxiedStore.selectedCountry = value;
  }
  getCountryByName(value);
});

window.addEventListener("click", function (e) {
  const backBtn = e.target.closest("#back-btn");
  if (!backBtn) return;
  renderAllCountries(proxiedStore.pagCountries, "#main-sec");
  reAddPagination("#pagination");
});

// search country
const searchForm = document.querySelector("#search-form");
const searchInput = searchForm?.querySelector("#search-input");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = searchInput.value;
  getCountryByName(value, false);
  removePagination("#pagination");
});

window.addEventListener("search_country", function (e) {
  renderAllCountries(proxiedStore.countries, "#main-sec");
});

// select form

const selectForm = document.querySelector(".select-form");
selectForm.addEventListener("submit", (e) => e.preventDefault());

// pagination
window.addEventListener("click", function (e) {
  let btn = e.target.closest(".pag-btn");

  if (!btn) return;
  const currentNum = +btn.dataset.num;
  if (currentNum === 0 || currentNum === pagTotal + 1) return;
  let skip = (currentNum - 1) * ITEM_PER_PAGE;
  proxiedStore.pagCountries = sliceArray(
    proxiedStore.countries,
    skip,
    ITEM_PER_PAGE
  );
  rednerPag(currentNum, pagTotal);
});

// select region

const region = document.querySelector("#regions");
region.addEventListener("change", function (e) {
  const regionName = e.target.value?.toLowerCase();
  if (!regionName) return;
  getAllCountries(true, regionName);
});
