import express from 'express'
import isAutenthicated from '../middleware/usuarios.middlewre.js'
const routerProductos = express.Router()

routerProductos.get('/', isAutenthicated, (req, res) => { // http://localhost:8080/api/v1/productos
    res.send('Todos los productos')
})

routerProductos.get('/:id', isAutenthicated, (req, res) => {
    res.send('Un solo producto')
})

export default routerProductos