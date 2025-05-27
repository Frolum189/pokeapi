import {getPokemonById} from "../services/pokeapi.js";
import {addRecentPokemon} from "../storage/recent.js";

export async function pokemonDetailsPage(app, id) {
    app.innerHTML = `<h2>Loading pokemon...</h2>`

    const existPokemon = await getPokemonById(id);
    addRecentPokemon(existPokemon.name);

    app.innerHTML = `
        <div class="pokemon-details">
            <h2>${existPokemon.name.toUpperCase()}</h2>
            <img src="${existPokemon.sprites.front_default}" alt="${existPokemon.name}" />
            <p>⚖️ Weight: ${existPokemon.weight}</p>
            <p>📏 Height: ${existPokemon.height}</p>
            <p>❤️ HP: ${existPokemon.stats[0].base_stat}<p>
            <p>⚔️ Attack: ${existPokemon.stats[1].base_stat}<p>
            <p>🛡️ Defense: ${existPokemon.stats[2].base_stat}<p>
            <p>⚔️⭐ Special Attack: ${existPokemon.stats[3].base_stat}<p>
            <p>🛡️⭐ Special Defense: ${existPokemon.stats[4].base_stat}<p>
            <p>⚡ Speed: ${existPokemon.stats[5].base_stat}<p>
            <a href="#/pokemons">Back to pokemons</a>
        </div>

    `;


}