import express from 'express'
const productosRouter = express.Router()

// CRUD Productos
productosRouter.get('/productos', (req, res) => {
  res.send('get all productos')
})
productosRouter.get('/productos/:id', (req, res) => {
  res.send('get one producto')
})
productosRouter.post('/productos', (req, res) => {
  res.send('create producto')
})
productosRouter.put('/productos/:id', (req, res) => {
  res.send('edit producto')
})
productosRouter.delete('/productos/:id', (req, res) => {
  res.send('delete producto')
})

export default productosRouter