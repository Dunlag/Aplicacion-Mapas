var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");

router.get('/', function(req, res, next) {
  res.redirect("/login");
});


// GET: Mostrar la página de login (login.html)
router.get("/login", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.post("/login", function (req, res, next) {
  // Obtener email y password del formulario
  const { email, password } = req.body;

  // Leer el archivo JSON con los usuarios
  fs.readFile(path.join(__dirname, "../data/users.json"), "utf8", function (err, data) {
    if (err) {
      console.error("Error al leer users.json:", err);
      return res.status(500).send("Error interno del servidor");
    }
    
    let users;
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      console.error("Error al parsear JSON:", parseErr);
      return res.status(500).send("Error interno del servidor");
    }

    // Buscar el usuario que coincida con las credenciales
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      // Si las credenciales son correctas, redirige a /mapas
      return res.redirect("/mapas");
    } else {
      // Si son incorrectas, se redirige a /login
      return res.redirect("/login");
    }
  });
});


module.exports = router;
