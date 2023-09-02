const pokemonsList = document.querySelector(".pokemons");
const imgBtn = document.querySelector(".img-btn");
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
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
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
                <p class="value">${pokemon.abilities}</p>
            </div>
        `
}

function loadPokemonInfo(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons) => {
        pokemonsList.innerHTML = convertPokemonToLi(pokemons);
        imgBtn.innerHTML = convertImg(pokemons);
        propertiesAbout.innerHTML = convertInfoAbout(pokemons);
        propertiesValues.innerHTML = convertPropertieValue(pokemons);
    })
}

loadPokemonInfo(0, 1);

about.addEventListener("click", () => {
    infoAbout.classList.remove("hide");
    infoBaseStats.classList.add("hide");
})

baseStats.addEventListener("click", () => {
    infoBaseStats.classList.remove("hide");
    infoAbout.classList.add("hide");
})