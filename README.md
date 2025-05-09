
# 🎵 Spotify Backend

**Spotify Backend** es la parte del servidor sencilla de la plataforma spotify. Este backend permite la gestión de canciones, playlists y almacenamiento en la nube para archivos multimedia. Está construido con **Node.js**, **Express**, **MongoDB** y **Cloudinary** para una experiencia robusta y escalable.

Este proyecto fue desarrollado como parte de mi portafolio personal para demostrar habilidades en desarrollo backend con tecnologías modernas. **Spotify Backend Clone** no tiene fines comerciales ni de distribución.

## 🚀 Tabla de Contenidos

* [Descripción del Proyecto](#💡-descripción-del-proyecto)
* [Tecnologías Utilizadas](#⚙️-tecnologías-utilizadas)
* [Características Principales](#⭐-características-principales)
* [Instalación](#🔧-instalación)
* [Uso](#🛠️-uso)
* [Estructura del Proyecto](#🗂️-estructura-del-proyecto)
* [Contribuciones](#🤝-contribuciones)
* [Contacto](#📬-contacto)

## 💡 Descripción del Proyecto

Este backend replica funcionalidades básicas de un servidor musical como Spotify. Almacena las canciones en la nube (Cloudinary), gestiona artista, maneja playlists y expone endpoints que serán consumidos por el frontend de la aplicación.

El proyecto está desarrollado en **Node.js** con **Express.js**, utilizando **MongoDB** como base de datos y **Cloudinary** para el manejo de archivos multimedia (canciones y portadas).

## ⚙️ Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución de JavaScript en el servidor.
* **Express.js**: Framework para la creación de APIs RESTful.
* **MongoDB**: Base de datos NoSQL para almacenar información sobre usuarios, canciones y playlists.
* **Mongoose**: ODM para interactuar con MongoDB.
* **Cloudinary**: Servicio para el almacenamiento y gestión de archivos en la nube.
* **Dotenv**: Gestión de variables de entorno.
* **CORS**: Permite la comunicación entre frontend y backend.
* **Axios**: Cliente HTTP usado para pruebas de consumo desde el frontend.

## ⭐ Características Principales

1. **Autenticación y registro de usuarios**
2. **Subida de canciones y portadas a Cloudinary**
3. **Creación y gestión de playlists**
4. **API REST con rutas protegidas y públicas**
5. **Búsqueda de canciones y filtrado**
6. **Estructura escalable y organizada por módulos**
7. **Respuestas estructuradas y manejo de errores global**

## 🔧 Instalación

Sigue estos pasos para correr el backend localmente:

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tuusuario/spotify-backend-clone.git
cd spotify-backend-clone
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y agrega lo siguiente:

```env
PORT=3000
MONGO_URI=tu_mongodb_uri
```

### 4. Ejecutar el Servidor

```bash
npm run dev
```

La API estará disponible en: `http://localhost:3000`

## 🛠️ Uso

Desde el frontend o mediante herramientas como Postman, puedes consumir los siguientes endpoints:

### Rutas de ejemplo:

* `GET /Album/get`: Obtener todos los albumes disponibles.
* `POST /Song/add`: Crear nueva cancion.
* `GET /Artist/`: Ver todos los artistas.
  
> Las canciones subidas se almacenan en **Cloudinary** y se retorna una URL para reproducirlas en el frontend.

## 🗂️ Estructura del Proyecto

```
spotify-backend-clone/
│
├── controllers/          # Lógica de negocio de cada módulo
├── middleware/           # Middlewares como autenticación y subida de archivos
├── models/               # Esquemas de Mongoose (Song, Playlist)
├── .env                  # Variables de entorno
├── index.js              # Punto de entrada del servidor
├── DB.js                 # Config de MongoDB
├── package.json          # Scripts y dependencias
└── README.md             # Este archivo
```

## 📬 Contacto

Si tienes dudas, sugerencias o quieres conectar:

* **Email**: [gustavo\_angel27@hotmail.com](mailto:gustavo_angel27@hotmail.com)

---

### Notas Finales

Este proyecto es de carácter personal y educativo. Las canciones usadas para pruebas no tienen derechos comerciales y fueron utilizadas con fines de aprendizaje.

---
