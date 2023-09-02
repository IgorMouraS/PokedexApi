const heartUnclick = document.querySelector(".heart-unclick");
const heartClick = document.querySelector(".heart-click");
const topContent = document.querySelector(".top-content");
const pokemonsList = document.querySelector(".pokemons");
const imgPokemon = document.querySelector(".img");
const propertiesAbout = document.querySelector(".properties-about");
const propertiesValues = document.querySelector(".properties");
const about = document.querySelector("#about");
const baseStats = document.querySelector("#base-stats");
const infoAbout = document.querySelector(".info-about");
const infoBaseStats = document.querySelector(".info-base-stats");

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <div class="name-number">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.id}</span>
            </div>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join("")}
                </ol>

            </div>

        </li>
        `
}

function convertImg(pokemon) {
    return `
        <img src="${pokemon.photo}"
            alt="${pokemon.name}">
    `
}

function convertPropertieValue(pokemon) {
    let propertieValue = [];
    for (let i = 0; i < pokemon.properties.length; i++) {
        propertieValue.push(`
            <div class="properties-value">
                <p class="propertie">${pokemon.properties[i]}</p>
                <p class="value">${pokemon.values[i]}</p>
            </div>
            `)
    }
    return propertieValue.join("");
}

function convertInfoAbout(pokemon) {
    return `
            <div class="properties-value">
                <p class="propertie">Height</p>
                <p class="value">${pokemon.height}</p>
            </div>
            <div class="properties-value">
                <p class="propertie">Weight</p>
                <p class="value">${pokemon.weight}</p>
            </div>
            <div class="properties-value">
                <p class="propertie">Abilities</p>
                <p class="value">${pokemon.abilities.map(ability => ability.name).join(", ")}</p>
            </div>
        `
}

function hideHtml (button, removeHide, addHide){
    button.addEventListener("click", () => {
        removeHide.classList.remove("hide");
        addHide.classList.add("hide");
    })
}

function loadPokemonInfo(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons) => {
        console.log(pokemons);
        topContent.classList.add(pokemons[0].types[0]);
        pokemonsList.innerHTML += convertPokemonToLi(pokemons[0]);
        imgPokemon.innerHTML += convertImg(pokemons[0]);
        propertiesAbout.innerHTML += convertInfoAbout(pokemons[0]);
        propertiesValues.innerHTML += convertPropertieValue(pokemons[0]);
    })
}

loadPokemonInfo(10, 1);

hideHtml(about, infoAbout, infoBaseStats);
hideHtml(baseStats, infoBaseStats, infoAbout);
hideHtml(heartUnclick, heartClick, heartUnclick);
hideHtml(heartClick, heartUnclick, heartClick);

//trazer valor do offset automatico