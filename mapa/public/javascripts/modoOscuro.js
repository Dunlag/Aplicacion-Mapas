// Función de cambio de tema para el mapa
const toggleButton = document.getElementById("toggle-theme");
const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");
const body = document.body;
toggleButton.addEventListener("click", function () {
    if (body.getAttribute("data-bs-theme") === "light") {
        body.setAttribute("data-bs-theme", "dark");
        sunIcon.classList.remove("show");
        moonIcon.classList.add("show");
        map.removeLayer(currentTileLayer);
        currentTileLayer = L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
            {
                attribution: "© OpenStreetMap contributors",
            }
        ).addTo(map);
    } else {
        body.setAttribute("data-bs-theme", "light");
        moonIcon.classList.remove("show");
        sunIcon.classList.add("show");
        map.removeLayer(currentTileLayer);
        currentTileLayer = L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
            {
                attribution: "© OpenStreetMap contributors, © CartoDB",
            }
        ).addTo(map);
    }
});
