const pokeApi = {};

function convertPokeAPIDetailToPokemon(pokeDetail){
  const pokemon = new Pokemon();
  pokemon.name = pokeDetail.name;
  pokemon.number = pokeDetail.id;

  const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type1] = types;

  pokemon.types = types;
  pokemon.type = type1;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeAPIDetailToPokemon)
};

// Chamando a API
pokeApi.getPokemons = (offset = 0, limit = 12) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonbody) => jsonbody.results)
    .catch((error) => console.error(error))
    .then((pokemons) => {
      const detailRequests = pokemons.map((pokemon) =>
        pokeApi.getPokemonDetail(pokemon)
      );
      return Promise.all(detailRequests);
    })
    .then((pokemonsDetails) => pokemonsDetails);
};
