import express from 'express'
const routerProductos = express.Router()

routerProductos.get('/', (req, res) => {
    res.send('Todos los productos')
})

routerProductos.get('/:id', (req, res) => {
    res.send('Un solo producto')
})

export default routerProductos