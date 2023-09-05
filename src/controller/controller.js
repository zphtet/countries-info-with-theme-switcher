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
  countries.length = 12;
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
  if (cardEle) {
    console.log(cardEle.dataset.name);
    proxiedStore.selectedCountry = cardEle.dataset.name;
    getCountryByName(proxiedStore.selectedCountry);
  }
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
