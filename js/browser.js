const qs = (selector) => document.querySelector(selector);

const btn = qs(".generate-btn");
const evenContainer = qs(".even-container");
const oddContainer = qs(".odd-container");
let oddNumbers = [];
let evenNumbers = [];
let allNumbers = [];

const showNumbers = () => {
  oddContainer.innerHtml = "";
  evenContainer.innerHTML = "";
  oddContainer.innerHTML = oddNumbers
    .map((number) => `<li class="container-item">${number}</li>`)
    .join("");
  evenContainer.innerHTML = evenNumbers
    .map((number) => `<li class="container-item">${number}</li>`)
    .join("");
};

const sortNumbers = () => {
  allNumbers
    .sort((a, b) => a - b)
    .forEach((number) => {
      if (number % 2 !== 0) {
        oddNumbers.push(number);
      } else {
        evenNumbers.push(number);
      }
    });
  showNumbers();
};

const generateNumbers = () => {
  allNumbers = [];
  oddNumbers = [];
  evenNumbers = [];
  for (let i = 0; i < 20; i++) {
    allNumbers.push(Math.round(Math.random() * (100 - 1) + 1));
  }
  sortNumbers();
};

btn.addEventListener("click", generateNumbers);
