import Entrenador from './entrenador.js';


export async function cargarEntrenadores() {
    try {
        const response = await fetch('../assets/entrenadores.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const entrenadoresData = await response.json();

        const entrenadores = entrenadoresData.map(entrenador =>
            new Entrenador(
                entrenador.id,
                entrenador.nombre,
                { lat: entrenador.region.lat, lon: entrenador.region.lon },
                entrenador.medallas,
                entrenador.PKMCapturados,
                entrenador.rango
            )
        );

        const tablaEntrenadores = document.getElementById('tabla-entrenadores');

        tablaEntrenadores.innerHTML = '';


        entrenadores.forEach(entrenador => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${entrenador.id}</td>
                <td>${entrenador.nombre}</td>
                <td>(${entrenador.region.lat}, ${entrenador.region.lon})</td>
                <td>${entrenador.medallas}</td>
                <td>${entrenador.PKMCapturados}</td>
                <td>${entrenador.rango}</td>
            `;
            tablaEntrenadores.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar los entrenadores:', error);
    }
}


export async function cargarEntrenadorPorId(id) {
    try {
        const response = await fetch('../assets/entrenadores.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const entrenadoresData = await response.json();

        const entrenador = entrenadoresData.find(entrenador => entrenador.id === parseInt(id));

        if (entrenador) {
            document.getElementById('id').value = entrenador.id;
            document.getElementById('nombre').value = entrenador.nombre;
            document.getElementById('latitud').value = entrenador.region.lat;
            document.getElementById('longitud').value = entrenador.region.lon;
            document.getElementById('medallas').value = entrenador.medallas;
            document.getElementById('pkm-capturados').value = entrenador.PKMCapturados;
            document.getElementById('rango').value = entrenador.rango;
        } else {
            console.error('Entrenador no encontrado');
        }
    } catch (error) {
        console.error('Error al cargar los datos del entrenador:', error);
    }
}

document.addEventListener('DOMContentLoaded', cargarEntrenadores);
