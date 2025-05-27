import { getPokemonList } from "../services/pokeapi.js";

export async function pokemonsPage(app) {
    app.innerHTML = `<h2>Loading pokemons...</h2>`

    const data = await getPokemonList(10);
    const cards = data.results.map((poke, index) => `
        <div class="card">
            <a href="#/pokemons/${index + 1}">${poke.name}</a>
        </div>
    `).join('');

    app.innerHTML = `
        <h2>Pokemons List</h2>
        <div class="grid">${cards}</div>
    `;
}