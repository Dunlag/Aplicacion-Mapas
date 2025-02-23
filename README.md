# Proyecto: Mapas Interactivos con Express y Leaflet

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-Desarrollo-orange.svg)

## Descripción

Este proyecto es una aplicación web que permite la visualización e interacción con mapas personalizados utilizando Leaflet y capas de CartoDB. La aplicación incluye autenticación básica con usuarios almacenados en un archivo JSON, un sistema de búsqueda por categoría y un modo claro/oscuro dinámico.

🌍 **Demo en vivo**: [Mapas Interactivos](https://mapas-evqw.onrender.com/login)

---

## Tecnologías Utilizadas

### **Backend**
- Node.js
- Express
- Nodemon
- fs/fs-extra (para manipulación de archivos)

### **Frontend**
- Leaflet
- Bootstrap 5
- Bootstrap Icons

### **Mapas**
- CartoDB Basemaps (*Dark Matter, Positron, Voyager*)

### **Autenticación**
- Validación de usuarios con JSON

---

## 🚀 Funcionalidades Implementadas

### 🗺️ **Capa de Mapa con CartoDB**
- Integración de capas de CartoDB en lugar de OpenStreetMap.
- Cambios dinámicos entre *CartoDB Dark Matter* (modo oscuro) y *CartoDB Positron* (modo claro).
- **Referencia**: [CartoDB Basemaps](https://github.com/CartoDB/basemap-styles?tab=readme-ov-file).

### 🌗 **Modo Oscuro/Claro**
- Cambio de tema con un botón de sol/luna.
- Se modifica el `data-bs-theme` del `body` y la capa del mapa dinámicamente.

### 🛣️ **Rutas con Express**
- Archivo `mapasRoutes.js` para las rutas del mapa.
- Definición de rutas para agregar, editar y borrar puntos de interés (GeoJSON).
- Redirección de `/` a la página de login.

### 🎨 **Uso de Bootstrap**
- Diseño responsivo con Bootstrap.
- Navbar, botones, formularios y más con Bootstrap Icons.

### 🔍 **Búsqueda por Categoría**
- Filtro de puntos de interés en el frontend sin necesidad de consultas adicionales al servidor.

### 🔐 **Login Básico**
- Validación de credenciales contra un archivo JSON (`users.json`).
- Redirección a `/mapas` si el login es exitoso.
- **Plantilla basada en**: [MDBootstrap Extended Login](https://mdbootstrap.com/docs/standard/extended/login/), con fondo personalizado de [UI Gradients](https://uigradients.com/#JShine).

---

## 📜 Cómo Funciona el Proyecto

1. **Inicio de sesión**: Se valida el usuario desde `users.json`.
2. **Carga de mapas**: Leaflet muestra la capa seleccionada de CartoDB.
3. **Modo claro/oscuro**: Se cambia dinámicamente el tema y la capa del mapa.
4. **Búsqueda por categoría**: Filtrado de puntos en el frontend.
5. **Interacción con los puntos**: Se pueden editar o eliminar puntos en el mapa.

---

## 🛠️ Instalación y Ejecución

### **Requisitos Previos**
- Node.js instalado

### **Pasos**

1. Clonar el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/mapas.git
    cd mapas
    ```

2. Instalar dependencias:
    ```sh
    npm install
    ```

3. Ejecutar el servidor:
    ```sh
    npm start
    ```

4. Abrir en el navegador:
    ```sh
    http://localhost:3000/login
    ```

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## ✨ Autor

👤 **Fernando**

📧 Contacto: [GitHub](https://github.com/Dunlag)

