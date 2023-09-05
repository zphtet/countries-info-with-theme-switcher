import {
  preventProp,
  formatNum,
  getCurrency,
  getLanguage,
  getCountryName,
} from "../utils/util";

// utilities funcion

export function renderAllCountries(data, selector) {
  const main = document.querySelector(selector);
  main.innerHTML = " ";
  const div = document.createElement("div");
  div.className = "country-cards";
  data?.forEach((country) => {
    const { name, capital, population, region, flags } = country;
    div.innerHTML += `
        <div class="card" data-name=${name.common}>
          <div class="img-container w-full">
            <a  class="block cursor-pointer" id="back-btn">
              <img
                class="w-full h-full object-cover aspect-video"
                src=${flags.svg}
                alt=${flags.alt}
              />
            </a>
          </div>
          <div class="info pt-4 pb-12 px-5" >
            <h3 class="mb-4">
              <a  class="text-2xl tb:text-xl font-semibold">${name.common}</a>
            </h3>
            <p class="my-1 font-bold">
              Population : <span class="font-normal">${formatNum(
                population
              )}</span>
            </p>
            <p class="my-1 font-bold">
              Region : <span class="font-normal">${region}</span>
            </p>
            <p class="my-1 font-bold">
              Capital : <span class="font-normal">${capital[0]}</span>
            </p>
          </div>
        </div>
          
          
          `;
  });
  main.appendChild(div);
}

//

const renderBorderCountries = (borders) => {
  const borderEle = document.querySelector(".borders");
  if (!borders || borders.length === 0) {
    borderEle.innerHTML = `<p class="text-2xl font-bold"> None </p>`;
    return;
  }
  borders.forEach((shortCode) => {
    borderEle.innerHTML += `
           <a href="#" class="border-item" data-name=${getCountryName(
             shortCode
           )}>
                    ${getCountryName(shortCode)}
                  </a>
        `;
  });
};

export function renderDetail(data, selector) {
  const parEle = document.querySelector(selector);
  const {
    flags,
    population,
    name,
    tld,
    region,
    subregion,
    capital,
    currencies,
    languages,
    borders,
  } = data;
  parEle.innerHTML = `
    
    <div>
        <button
          class="flex items-center gap-2 py-2 px-4 bg-white-all shadow rounded-md hover:opacity-60"
          id="back-btn"
        >
          <img
            class="w-5"
            src="./src/assets/img/arrow-left.png"
            alt="arrow left"
          />
          <span>Back</span>
        </button>
        <div
          class="detail flex gap-10 tb:gap-4 items-center mt-5 tb:flex-col tb:items-start"
        >
          <div class="detail-img-container w-[40%] tb:w-full tb:max-w-full">
            <img
              class="w-full h-full object-cover "
              src=${flags.png || flags.svg}
              alt=${flags.alt}
            />
          </div>
          <div class="flex-1 pb-3 dark:text-white-all">
            <h3 class="text-3xl font-bold mb-5 tb:text-2xl ml:text-xl tb:mb-3">
              ${name.official}
            </h3>
            <div class="text-base font-bold detail-infos">
              <p class="detail-item">
                Native Name :
                <span class="text-normal font-normal">${name.common}</span>
              </p>
              <p class="detail-item">
                Top level domain :
                <span class="text-normal font-normal">${
                  tld ? tld[0] : "None"
                }</span>
              </p>
              <p class="detail-item">
                Population :
                <span class="text-normal font-normal">${formatNum(
                  population
                )}</span>
              </p>
              <p class="detail-item">
                Currencies :
                <span class="text-normal font-normal"> ${getCurrency(
                  currencies
                )} </span>
              </p>
              <p class="detail-item">
                Region : <span class="text-normal font-normal">${region}</span>
              </p>
              <p class="detail-item">
                Languages : <span class="text-normal font-normal">${getLanguage(
                  languages
                )}</span>
              </p>
              <p class="detail-item">
                Sub Region :
                <span class="text-normal font-normal"
                  >${subregion}</span
                >
              </p>
              <p class="detail-item">
                Capital : <span class="text-normal font-normal">${
                  capital[0]
                }</span>
              </p>
            </div>
            <div
              class="rel-border text-base mt-5 flex items-center gap-5 ml:flex-col ml:items-start ml:gap-2"
            >
              <p class="font-bold basis-[120px] tb:basis-auto">
                Border Countries
              </p>
              <div class="borders flex-1">

              </div>
            </div>
          </div>
        </div>
      </div>
    
    `;

  renderBorderCountries(borders);
}

export function LoadingUI(selector) {
  const parEle = document.querySelector(selector);
  parEle.innerHTML = "<h1> Loading ...  </h1>";
}