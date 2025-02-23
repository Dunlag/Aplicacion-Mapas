// Eventos para editar y borrar puntos (ya implementados)
document.getElementById('edit-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const name = document.getElementById('edit-name').value;
    const cat = document.getElementById('edit-cat').value;
    const lat = document.getElementById('edit-lat').value;
    const lng = document.getElementById('edit-lng').value;
    fetch(`/mapas/api/lugares/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, cat, lat, lng })
    })
        .then(res => {
            if (!res.ok) throw new Error("Error al editar el punto");
            return res.json();
        })
        .then(() => {
            cargarPuntos();
            document.getElementById('edit-container').style.display = 'none';
            document.getElementById('map').classList.remove('col-8');
            document.getElementById('map').classList.add('col-12');
        })
        .catch(err => console.error(err));
});

const confBorrar = document.getElementById('delete-btn');
confBorrar.addEventListener('click', function () {
    const confirmacion = confirm('Vas a borrar el elemento, ¿estás seguro?');
    if (confirmacion) {
        const id = document.getElementById('edit-id').value;
        fetch(`/mapas/api/lugares/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al borrar el punto");
                return res.json();
            })
            .then(() => {
                cargarPuntos();
                document.getElementById('edit-container').style.display = 'none';
                document.getElementById('map').classList.remove('col-8');
                document.getElementById('map').classList.add('col-12');
            })
            .catch(err => console.error(err));
    }
});

const botonCerrar = document.getElementById('close-btn');
botonCerrar.addEventListener('click', function () {
    document.getElementById('edit-container').style.display = 'none';
    document.getElementById('map').classList.remove('col-8');
    document.getElementById('map').classList.add('col-12');
});