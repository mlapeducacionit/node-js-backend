const express = require('express')
const { create, getAll, getOne, update, remove } = require('../controllers/productos.controller')
const routerProductos = express.Router()

/* CRUD */
// ! IMPORTANTE modelo que representan el request y response en petición http

// ! C:CREATE -> POST
// POST -> /api/v1/productos | método POST | http://localhost:8080/api/v1/productos | body: { nombre, precio }
// El backend es el que se encarga de generar el ID.
routerProductos.post('/', create)

// ! R:READ -> GET 
// GET ALL -> /api/v1/productos | método GET | -> http://localhost:8080/api/v1/productos
routerProductos.get('/', getAll)

// GET ONE -> /api/v1/productos/:id | método GET | -> http://localhost:8080/api/v1/productos/1
routerProductos.get('/:id', getOne)

// ! U:UPDATE -> PUT 
// PUT -> /api/v1/productos/:id | método PUT/PATCH | http://localhost:8080/api/v1/productos/1 | body: { nombre, precio }
routerProductos.put('/:id', update)

// ! D:DELETE -> DELETE
// DELETE -> /api/v1/productos/:id | método DELETE | http://localhost:8080/api/v1/productos/1
routerProductos.delete('/:id', remove)


module.exports = routerProductos