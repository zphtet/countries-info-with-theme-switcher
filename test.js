import countries from "i18n-iso-countries";

const obj = {
  MMK: {
    name: "Burmese Kyats",
    symbol: "MMK",
  },
};

// console.log(Object.keys(obj)[0]);
const prop = Object.keys(obj)[0];

// console.log(obj[prop].name);

// console.log(countries.getName("DZA", "en"));

import country from "country-list-js";
var found = country.findByIso3("BGD");
console.log(found);

var fd = country.findByIso3("CHN");
console.log(fd);
