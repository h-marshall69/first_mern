# first_mern

## Tecnologías Usadas

Este proyecto está construido utilizando las siguientes tecnologías:

- **Frontend:**
  - [React](https://reactjs.org/) - Biblioteca para construir interfaces de usuario interactivas.
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS para crear diseños rápidos y responsivos.
  - [Axios](https://axios-http.com/) - Cliente HTTP basado en promesas para realizar peticiones a la API.

- **Backend:**
  - [Node.js](https://nodejs.org/) - Entorno de ejecución para JavaScript en el servidor.
  - [Express](https://expressjs.com/) - Framework para desarrollar APIs RESTful con Node.js.
  - [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL para almacenar información.
  - [Mongoose](https://mongoosejs.com/) - ODM (Object Data Modeling) para MongoDB en Node.js.


## Tecnologías Usadas

- **Node.js** (v20.16.0)
- **Npm** (10.8.1)

## Instalación

```bash
git clone https://github.com/h-marshall69/first_mern
 ```

### Instalación del backend

1. Navega a la carpeta del servidor:

    ```bash
    cd server
    ```

2. Instala las dependencias del backend:

    ```bash
    npm install
    ```

3. Configura las variables de entorno necesarias (como la conexión de MongoDB). Crea un archivo .env en la carpeta del servidor con las siguientes variables:

    ```bash 
    MONGO_URI=tu_conexion_a_mongo
    PORT=5000
    ```

4. Inicia el servidor:

    ```bash 
    npm run dev
    ```

### Instalación del frontend (Cliente)

1. Navega a la carpeta del cliente:

    ```bash
    cd client
    ```

2. Instala las dependencias del frontend:

    ```bash
    npm install
    ```

3. Inicia el servidor de desarrollo del frontend:

    ```bash 
    npm run dev
    ```