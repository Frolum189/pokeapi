import { getPokemonList } from "../services/pokeapi.js";

export async function pokemonsPage(app) {
    app.innerHTML = `<h2>Loading pokemons...</h2>`

    const data = await getPokemonList(10);
    const cards = data[0].results.map((poke, index) => `
        <div class="card">
            <img src="${data[1][index]}" alt="${poke.name}"/>
            <a href="#/pokemons/${index + 1}">${poke.name}</a>
        </div>
    `).join('');

    app.innerHTML = `
        <h2>Pokemons List</h2>
        <div class="grid">${cards}</div>
    `;
}

async function findpokemon() {
    let inptvalue = document.getElementById("finder").value.toLowerCase();
    let data = await getPokemonList(10);
    let pokemon = data.results.find(poke => poke.name.toLowerCase() === inptvalue);

    if (pokemon) {
        let index = data.results.indexOf(pokemon) + 1;
        window.location.hash = `#/pokemons/${index}`;
    } else {
        alert('Pokemon not found');
    }
}

async function filterbypower() {
    let data = await getPokemonList(10);
    let strongest = data.reduce((max, current) => {
        let currentAttack = current.stats.find(stat => stat.name === 'attack')?.base || 0;
        let maxAttack = max.stats.find(stat => stat.name === 'attack')?.base || 0;
        return currentAttack > maxAttack ? current : max;
    });
    window.location.hash = `#/pokemons/${strongest.id}`;
}

async function filterbyspeed() {
    let data = await getPokemonList(10);
    let fastest = data.reduce((max, current) => {
        let currentSpeed = current.stats.find(stat => stat.name === 'speed')?.base || 0;
        let maxSpeed = max.stats.find(stat => stat.name === 'speed')?.base || 0;
        return currentSpeed > maxSpeed ? current : max;
    });
    window.location.hash = `#/pokemons/${fastest.id}`;
}


window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        let dropdown = document.getElementById('filterDropdown');
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
}

document.getElementById('findbutton').addEventListener('click', findpokemon);
document.getElementById('filterbypower').addEventListener('click',filterbypower);
document.getElementById('filterbyspeed').addEventListener('click', filterbyspeed);