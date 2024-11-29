import Pokemon from './pokemon.js';


export async function cargarPokemones() {
    try {

        const response = await fetch('../assets/pokemons.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const pokemonesData = await response.json();

        const pokemones = pokemonesData.map(pokemon =>
            new Pokemon(
                pokemon.id,
                pokemon.nombre,
                pokemon.tipo,
                pokemon.nivel,
                pokemon.Num_Pokedex,
                pokemon.entrenador,
                pokemon.debilitado 
            )
        );

        const tablaPokemones = document.getElementById('tabla-pokemones');

        tablaPokemones.innerHTML = '';

        pokemones.forEach(pokemon => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${pokemon.id}</td>
                <td>${pokemon.nombre}</td>
                <td>${pokemon.tipo}</td>
                <td>${pokemon.nivel}</td>
                <td>${pokemon.Num_Pokedex}</td>
                <td>${pokemon.entrenador}</td>
                <td>${pokemon.debilitado ? 'Sí' : 'No'}</td> <!-- Mostrar estado -->
            `;
            tablaPokemones.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar los Pokémon:', error);
    }
}

export async function cargarPokemonPorId(id) {
    try {
        const response = await fetch('../assets/pokemons.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const pokemonesData = await response.json();

        const pokemon = pokemonesData.find(pokemon => pokemon.id === parseInt(id));

        if (pokemon) {
            document.getElementById('id').value = pokemon.id;
            document.getElementById('nombre').value = pokemon.nombre;
            document.getElementById('tipo').value = pokemon.tipo;
            document.getElementById('nivel').value = pokemon.nivel;
            document.getElementById('num-pokedex').value = pokemon.Num_Pokedex;
            document.getElementById('entrenador').value = pokemon.entrenador;
            document.getElementById('estado-debilitado').checked = pokemon.estadoDebilitado; 
        } else {
            console.error('Pokémon no encontrado');
        }
    } catch (error) {
        console.error('Error al cargar los datos del Pokémon:', error);
    }
}
async function cargarEntrenadores() {
    try {
        const response = await fetch('../assets/entrenadores.json');
        if (!response.ok) throw new Error(`Error al cargar Pokémon: ${response.statusText}`);
        
        const entrenadores = await response.json();
        const selectEntrenador = document.getElementById('entrenador');

        entrenadores.forEach(entrenador => {
            const option = document.createElement('option');
            option.value = entrenador.nombre;
            option.textContent = entrenador.nombre;
            selectEntrenador.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        
    }
}

document.addEventListener('DOMContentLoaded', cargarEntrenadores);


document.addEventListener('DOMContentLoaded', cargarPokemones);
