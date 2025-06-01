const BASE_URL = 'https://pokeapi.co/api/v2/';

export async function getPokemonList(limit = 20, offset = 0) {
    const result = await fetch(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
    const data = await result.json();

    let detailedList = await Promise.all(
        data.results.map(async (pokemon) => {
            let detailsRes = await fetch(pokemon.url);
            let details = await detailsRes.json();

            return {
                name: details.name,
                id: details.id,
                stats: details.stats.map(stat => ({
                    name: stat.stat.name,
                    base: stat.base_stat
                })),
                sprite: details.sprites.front_default
            };
        })
    );

    return detailedList;
}



export async function getPokemonById(id) {
    const result = await fetch(`${BASE_URL}/pokemon/${id}`);
    return await result.json();
}

