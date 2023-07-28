const pokemonList = document.getElementById("pokemonList");
const loadMore = document.getElementById('loadMore');
const limit = 12;
let offset = 0;

function loadMorePokemons(offset, limit) {
  // Consumindo uma API
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    // Substituindo o velho HTML
    const newHTML = pokemons
      .map(
        (pokemon) =>
          `
    <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
      <div class="details">
        <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
        </ol>
        <img
          src="${pokemon.photo}"
          alt="${pokemon.name}"
        />
      </div>
    </li>
    `
      )
      .join("");
    pokemonList.innerHTML += newHTML;
  });
}

loadMorePokemons(offset, limit);

loadMore.addEventListener('click', () => {
  offset += limit;
  loadMorePokemons(offset, limit);
});
