import proxiedStore, {
  getAllCountries,
  getCountryByName,
} from "../model/Store";
import {
  LoadingUI,
  renderAllCountries,
  renderDetail,
  renderPagination,
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
  console.log("set single country data is ready");
  console.log(proxiedStore.country);
  renderDetail(proxiedStore.country[0], "#main-sec");
});

window.addEventListener("click", function (e) {
  const cardEle = e.target.closest(".card");
  const bordEle = e.target.closest(".border-item");
  // console.log(bordEle);
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
  console.log("Back to overview");
  renderAllCountries(proxiedStore.pagCountries, "#main-sec");
});

// search country
const searchForm = document.querySelector("#search-form");
const searchInput = searchForm?.querySelector("#search-input");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = searchInput.value;
  getCountryByName(value, false);
});

// pagination
window.addEventListener("click", function (e) {
  let btn = e.target.closest(".pag-btn");
  console.log(btn);
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
