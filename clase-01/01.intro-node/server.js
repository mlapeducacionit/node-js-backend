const express = require('express')
const app = express()
const port = 3000

const productos = [
    {id: 1, nombre: 'PC', precio: '123'},
    {id: 2, nombre: 'Notebook', precio: '523'},
    {id: 3, nombre: 'Monitor', precio: '323'},
]

// ! Rutas, recursos, endpoints, points
// Verbo GET
// Todos los posts
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Verbo GET -> http://localhost:3000/saludar
// 
app.get('/saludar', (req, res) => {
  res.json({
    nombre: 'Maximiliano',
    mensaje: 'Hola mundo!'
  })
})
// ! GET -> Todos los productos

app.get('/api/v1/productos', (req, res) => {
    res.json(productos)
})


// ! Verbo POST
app.post('/', (req, res) => {
    res.send('Create (POST)')
})

app.post('/data', (req, res) => {
    res.send('Create (POST -> data)')
})
// ! Verbo PUT
app.put('/', (req, res) => {
    res.send('Actualizando (PUT -> Producto)')
})


// ! Verbo DELETE
app.delete('/', (req, res) => {
    res.send('Eliminando (DELETE -> Producto)')
})

app.listen(port, () => {
  console.log(`Servidor ejecutandose en http://localhost:${port}`)
})
