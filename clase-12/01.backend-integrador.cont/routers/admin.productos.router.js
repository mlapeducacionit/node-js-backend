import express from 'express'
import controladores from '../controllers/productos.controller.js'
const adminProductosRouter = express.Router()

// CRUD Productos
// TODO: Validaciones de productos
adminProductosRouter.get('/productos', controladores.getAll ) // http://localhost:8080/api/v1/productos
adminProductosRouter.get('/productos/:id', controladores.getOne ) // http://localhost:8080/api/v1/productos/1
adminProductosRouter.post('/productos', controladores.create )
adminProductosRouter.put('/productos/:id', controladores.edit )
adminProductosRouter.delete('/productos/:id', controladores.remove )

export default adminProductosRouter