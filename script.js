const URL = "https://rickandmortyapi.com/api/character/";

const wrap = document.querySelector(".content-wrap");

const input = document.querySelector("input");
// input.style.boxShadow = `0px 0px 30px 0px ${getRandomColor()}`;

const selectStatus = document.querySelector(".selectStatus");
const selectGender = document.querySelector(".selectGender");
const selectSpecies = document.querySelector(".selectSpecies");

// const header = document.querySelector('header');
// header.style.boxShadow = `0px 0px 30px 0px ${getRandomColor()}`;

// const accordion = document.querySelector('.accordion');
// accordion.style.boxShadow = `0px 0px 30px 0px ${getRandomColor()}`;

function createCard(el) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.boxShadow = `0px 0px 30px 0px ${getRandomColor()}`;

  const cardImg = document.createElement("div");

  const img = document.createElement("img");
  img.style.width = "300px";
  img.style.height = "445px";
  img.src = el.image;

  cardImg.prepend(img);

  const cardName = document.createElement("p");
  cardName.textContent = `Name: ${el.name}`;

  const cardStatus = document.createElement("p");
  cardStatus.textContent = `Status: ${el.status}`;

  const cardGender = document.createElement("p");
  cardGender.textContent = `Gender: ${el.gender}`;

  const cardSpecies = document.createElement("p");
  cardSpecies.textContent = `Species: ${el.species}`;

  card.prepend(cardImg, cardName, cardStatus, cardGender, cardSpecies);

  return card;
}

function renderCard(arr) {
  arr.forEach((el) => wrap.prepend(createCard(el)));
}

function serchCard(arr) {
  console.log(arr);
  let nameVal = input.value.toLowerCase().trim();
  let statusVal = selectStatus.value.toLowerCase().trim();
  let genderVal = selectGender.value.toLowerCase().trim();
  let speciesVal = selectSpecies.value.toLowerCase().trim();

  let newarr = arr
    .filter(({ name }) => name.toLowerCase().includes(nameVal))
    .filter(({ status }) => !statusVal || status.toLowerCase() === statusVal)
    .filter(({ gender }) => !genderVal || gender.toLowerCase() === genderVal)
    .filter(
      ({ species }) => !speciesVal || species.toLowerCase() === speciesVal
    );

  wrap.innerHTML = null;
  renderCard(newarr);
}

function main(arr) {
  renderCard(arr);
  input.addEventListener("input", () => serchCard(arr));
  selectStatus.addEventListener("change", () => serchCard(arr));
  selectGender.addEventListener("change", () => serchCard(arr));
  selectSpecies.addEventListener("change", () => serchCard(arr));
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let arr = [];
for (let i = 1; i <= 826; i++) {
  arr.push(i);
}

fetch(URL + arr)
  .then((res) => res.json())
  .then((data) => main(data));
