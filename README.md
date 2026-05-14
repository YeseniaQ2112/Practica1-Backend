## ⚙️ Configuración y ejecución local

### Requisitos previos

- Node.js >= 18
- npm >= 9
- PostgreSQL corriendo localmente

### Instalar dependencias

npm install


### 4. Configurar variables de entorno

cp .env.example .env

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_NAME=tienda_online

### Crear la base de datos en PostgreSQL

CREATE DATABASE tienda_online;

### Ejecutar el proyecto

npm run start:dev


Servidor disponible: `http://localhost:3000`


## Documentación de la API

http://localhost:3000/docs
