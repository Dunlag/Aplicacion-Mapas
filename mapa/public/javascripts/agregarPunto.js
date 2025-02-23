// Evento para el formulario de agregar nuevo punto
document.getElementById("nuevo-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("nuevo-name").value;
    const cat = document.getElementById("nuevo-cat").value;
    const lat = document.getElementById("nuevo-lat").value;
    const lng = document.getElementById("nuevo-lng").value;
    fetch("/mapas/api/lugares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, cat, lat, lng }),
    })
        .then((res) => {
            if (!res.ok) throw new Error("Error al añadir punto");
            return res.json();
        })
        .then(() => {
            cargarPuntos();
            document.getElementById("nuevo-form").reset();
        })
        .catch((err) => console.error(err));
});
