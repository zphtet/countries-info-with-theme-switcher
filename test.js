const obj = {
  MMK: {
    name: "Burmese Kyats",
    symbol: "MMK",
  },
};

console.log(Object.keys(obj)[0]);
const prop = Object.keys(obj)[0];

console.log(obj[prop].name);
