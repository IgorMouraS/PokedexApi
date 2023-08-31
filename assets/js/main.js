const pokemonsList = document.querySelector(".pokemons");
const loadMoreButton = document.querySelector("#loadMoreButton");
const loadLessButton = document.querySelector("#loadLessButton");
const maxPokemons = 31;
let limit = 12;
let offset = 0;

function loadPokemonItens(offset, limit) {

    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                    </ol>
                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                </div>
            
            </li>
            `
    }

    pokemonsList.innerHTML = "";

    pokeApi.getPokemons(offset, limit).then((pokemons) => {

        pokemonsList.innerHTML += pokemons.map(convertPokemonToLi).join("");

    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
    if(offset === 0){
        loadLessButton.classList.remove("hide");
    }

    offset += limit;

    if(offset >= maxPokemons - offset){
        limit = maxPokemons - offset;

        loadPokemonItens(offset, limit);
    
        loadMoreButton.classList.add("hide");
    }else{
        loadPokemonItens(offset, limit);
    }
})

loadLessButton.addEventListener("click", () => {
    if(offset > 0){
        if(limit < 12){
            limit = 12;
            loadMoreButton.classList.remove("hide");
        }
        
        offset -= limit;
        
        if(offset === 0){
            loadLessButton.classList.add("hide");
        }

        loadPokemonItens(offset, limit);
    }else{
        loadLessButton.classList.add("hide");
    }
})