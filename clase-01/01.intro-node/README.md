# Clase 01 - Node.js Backend

## NVM (Node Version Manager)

```sh
nvm list # muestra las versiones que tengo disponibles y cual esta activa
```

```sh
nvm install <numero-version> # Busco en Node la última versión LTS
```

```sh
nvm use <numero-version> # Activo la versión que quiero utilizar
```

## NPM (Node Package Manager)
Me sirve para administrar librerías (paquetes) dentro del ecosistema Javascript

```sh
npm --version
```

## Inicializando un proyecto de Node (package.json)

```sh
npm init -y ## A todas las opciones le dice que si. Y crea el package.json
``` 

## Como un Live Server pero para backend (Nodemon)

```sh
npm install nodemon # Dependencia de proyecto
npm install express --save # Dependencias de proyecto
npm install nodemon -D # Dependencia de desarrollo | --save-dev
```

## Agregar script en el package.json
 
```json
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js" // <---------------- Agregamos
},
```

## Corriendo un script con npm

```sh
npm start
npm test
npm run <script>
npm run dev
```

## Listo scripts disponibles dentro del package.json

```sh
npm run
```

## Extensión Chrome para visualizar ma mejor los json

<https://chromewebstore.google.com/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc>