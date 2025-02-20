var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs-extra');

// Variable en memoria para almacenar los puntos de interés
let lugares = [];

// Ruta del archivo JSON con puntos iniciales
const dataFilePath = path.join(__dirname, '../data/lugares.json');

// Al arrancar el servidor, cargamos los puntos iniciales desde el archivo
fs.readJson(dataFilePath)
  .then(data => {
    if (data && data.features) {
      // Se asigna un id a cada punto inicial usando Date.now() y un contador extra si es necesario
      let contador = 0;
      lugares = data.features.map(feature => {
        feature.id = Date.now() + (contador++);
        return feature;
      });
      console.log("Puntos iniciales cargados:", lugares.length);
    }
  })
  .catch(err => console.error("Error al leer lugares.json:", err));

// Sirve la página del mapa
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Endpoint para obtener todos los puntos en formato GeoJSON
router.get('/api/lugares', (req, res) => {
  res.json({
    type: "FeatureCollection",
    features: lugares
  });
});

// Endpoint para añadir un nuevo punto
router.post('/api/lugares', (req, res) => {
  const { name, cat, lat, lng } = req.body;
  if (!name || !lat || !lng || !cat) {
    return res.status(400).json({ error: "Faltan datos (name,cat, lat, lng)" });
  }
  const nuevoPunto = {
    id: Date.now(), // identificador único
    type: "Feature",
    properties: { name,
      categoria: cat
     },
    geometry: {
      type: "Point",
      coordinates: [parseFloat(lng), parseFloat(lat)]
    }
  };
  lugares.push(nuevoPunto);
  res.status(201).json(nuevoPunto);
});

// Endpoint para editar un punto
router.put('/api/lugares/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, cat, lat, lng } = req.body;
  const index = lugares.findIndex(lugar => lugar.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Punto no encontrado" });
  }
  // Actualiza los campos, incluyendo la categoría
  lugares[index].properties.name = name || lugares[index].properties.name;
  if (cat) {
    lugares[index].properties.categoria = cat;
  }
  if (lat && lng) {
    lugares[index].geometry.coordinates = [parseFloat(lng), parseFloat(lat)];
  }
  res.json(lugares[index]);
});


// Endpoint para borrar un punto
router.delete('/api/lugares/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = lugares.findIndex(lugar => lugar.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Punto no encontrado" });
  }
  const eliminado = lugares.splice(index, 1);
  res.json({ mensaje: "Punto eliminado", punto: eliminado[0] });
});

module.exports = router;
