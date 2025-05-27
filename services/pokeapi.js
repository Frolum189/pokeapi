const BASE_URL = 'https://pokeapi.co/api/v2/';

export async function getPokemonList(limit = 20, offset = 0) {
    const result = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    return await result.json();
}

export async function getPokemonById(id) {
    const result = await fetch(`${BASE_URL}/pokemon/${id}`);
    return await result.json();
}

