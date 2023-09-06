import proxiedStore, {
  getAllCountries,
  getCountryByName,
} from "../model/Store";
import { LoadingUI, renderAllCountries, renderDetail } from "../view/view";

// GLOBAL FUNCTIONS

// 1)
LoadingUI("#main-sec");
// 2)
getAllCountries();

// Listen Global Events
window.addEventListener("countries_change", function () {
  console.log("loaded all countries");
  const { countries } = proxiedStore;
  if (countries.length > 1) countries.length = 12;
  renderAllCountries(countries, "#main-sec");
});

window.addEventListener("single_country", function () {
  console.log("set single country data is ready");
  console.log(proxiedStore.country);
  renderDetail(proxiedStore.country[0], "#main-sec");
});

// window.addEventListener("select_change", function () {
//   console.log("set single country Name");
// });

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
  //   back - btn;
  const backBtn = e.target.closest("#back-btn");
  if (!backBtn) return;
  console.log("Back to overview");
  const { countries } = proxiedStore;
  countries.length = 12;
  renderAllCountries(countries, "#main-sec");
});

// search country
const searchForm = document.querySelector("#search-form");
const searchInput = searchForm?.querySelector("#search-input");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = searchInput.value;
  getCountryByName(value, false);
});

// click on borders countries

// const border = document.querySelector("#borders");

window.addEventListener("click", function (e) {
  console.log("hello click");
  const bordEle = e.target.closest(".border-item");
  console.log(bordEle);
  if (bordEle) {
    const value = bordEle.dataset.name.toLowerCase();
    getCountryByName(value);
  }
});
