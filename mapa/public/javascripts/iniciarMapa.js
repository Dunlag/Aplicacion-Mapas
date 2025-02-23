// Inicialización del mapa
const map = L.map('map').setView([41.1415, -8.6110], 14);

// Capa por defecto: se usa la de CartoDB Voyager para modo claro
let currentTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors, © CartoDB'
}).addTo(map);

let puntosLayer;
let geojsonData = null; // Variable global para almacenar la data

// Función para cargar todos los puntos desde la API
function cargarPuntos() {
    fetch('/mapas/api/lugares')
        .then(res => res.json())
        .then(geojson => {
            geojsonData = geojson; // Guardamos la data
            dibujarPuntos(geojsonData);
        })
        .catch(err => console.error("Error al cargar puntos:", err));
}

// Función para dibujar los puntos en el mapa (según filtro)
function dibujarPuntos(data) {
    if (puntosLayer) {
        map.removeLayer(puntosLayer);
    }
    puntosLayer = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            layer.on('click', () => {
                document.getElementById('edit-container').style.display = 'block';
                document.getElementById('edit-id').value = feature.id;
                document.getElementById('edit-name').value = feature.properties.name;
                document.getElementById('edit-cat').value = feature.properties.categoria;
                document.getElementById('edit-lat').value = feature.geometry.coordinates[1];
                document.getElementById('edit-lng').value = feature.geometry.coordinates[0];
                // Ajustar tamaño del mapa
                document.getElementById('map').classList.remove('col-12');
                document.getElementById('map').classList.add('col-8');
            });
            layer.bindTooltip(feature.properties.name, { permanent: false, direction: 'top' });
        }
    }).addTo(map);
}

cargarPuntos();

// Evento para el formulario de búsqueda
document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevenir envío del formulario
    const termino = document.getElementById("search-input").value.trim().toLowerCase();
    if (!geojsonData) return;

    // Filtrar las features del GeoJSON según la categoría
    const dataFiltrada = {
        ...geojsonData,
        features: geojsonData.features.filter(feature => {
            const cat = feature.properties.categoria.toLowerCase();
            return cat.includes(termino);
        })
    };

    dibujarPuntos(dataFiltrada);
});