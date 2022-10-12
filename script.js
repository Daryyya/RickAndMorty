const wrap = document.querySelector('.content-wrap');

const URL = 'https://rickandmortyapi.com/api/character';

const input = document.querySelector('input');

const selectStatus = document.querySelector('.selectStatus');

const selectGender = document.querySelector('.selectGender');

const selectSpecies = document.querySelector('.selectSpecies');



function createCard (el) {
    const card = document.createElement('div');
    card.className = 'card';

    const cardImg = document.createElement('div');

    const img = document.createElement('img');
    img.style.width = '300px';
    img.style.height = '445px';
    img.src = el.image;

    cardImg.prepend(img);

    const cardName = document.createElement('p');
    cardName.textContent = `Name: ${el.name}`;

    const cardStatus = document.createElement('p');
    cardStatus.textContent = `Status: ${el.status}`;

    const cardGender = document.createElement('p');
    cardGender.textContent = `Gender: ${el.gender}`;

    const cardSpecies = document.createElement('p');
    cardSpecies.textContent = `Species: ${el.species}`;

    card.prepend(cardImg, cardName, cardStatus, cardGender, cardSpecies);

    return card;
}

function renderCard (arr) {
    arr.forEach(el => wrap.prepend(createCard(el)))
}

function serchCard (arr) {
    let value = input.value.toLowerCase().trim();
    let status = selectStatus.value.toLowerCase().trim();
    let gender = selectGender.value.toLowerCase().trim();
    let species = selectSpecies.value.toLowerCase().trim();

    let newarr = arr
        .filter(el => el.name.toLowerCase().includes(value))
        .filter(el => el.status.toLowerCase() === status || status === '')
        .filter(el => el.gender.toLowerCase() === gender || gender === '')
        .filter(el => el.species.toLowerCase() === species || species === '')

    wrap.innerHTML = null;

    renderCard(newarr);
}

function main (arr) {
    renderCard(arr)
    input.addEventListener('input', () => serchCard(arr));
    selectStatus.addEventListener('change', () => serchCard(arr));
    selectGender.addEventListener('change', () => serchCard(arr));
    selectSpecies.addEventListener('change', () => serchCard(arr));
}







fetch(URL).then(res => res.json()).then(data => main(data.results));