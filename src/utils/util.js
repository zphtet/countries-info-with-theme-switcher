export function preventProp(e) {
  e.stopPropagation();
}

export const formatNum = (num) => {
  const numberFormat = new Intl.NumberFormat("en-US");
  return numberFormat.format(num);
};

export const getCurrency = function (currencyObj) {
  const prop = Object.keys(currencyObj)[0];
  const { name, symbol } = currencyObj[prop];
  return `${name} (${symbol})`;
};

export const getLanguage = function (langObj) {
  const prop = Object.keys(langObj)[0];
  return langObj[prop];
};

export const getCountryName = (shortCode) => {
  const twoWord = shortCode.substr(0, 2);
  const NameinEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  return NameinEnglish.of(twoWord);
};
