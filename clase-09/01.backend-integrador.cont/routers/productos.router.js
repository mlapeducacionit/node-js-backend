import express from 'express'
import controladores from '../controllers/productos.controller.js'
const productosRouter = express.Router()

// CRUD Productos
// TODO: Validaciones de productos
productosRouter.get('/productos', controladores.getAll ) // http://localhost:8080/api/v1/productos
productosRouter.get('/productos/:id', controladores.getOne ) // http://localhost:8080/api/v1/productos/1
productosRouter.post('/productos', controladores.create )
productosRouter.put('/productos/:id', controladores.edit )
productosRouter.delete('/productos/:id', controladores.remove )

export default productosRouter