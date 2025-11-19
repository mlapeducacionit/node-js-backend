const express = require('express')
const db = require('./db/productos');
const routerProductos = require('./routers/productos.router');
const app = express()
const PORT = 8080

// ! Middlewares
app.use(express.json()) // Entender el json que se envíe desde el frontend 

// ! Rutas, Endpoints, points
app.use('/api/v1/productos', routerProductos) // http://localhost:8080/api/v1/productos

app.all('{*splat}', (req, res) => {
  console.log(req.method)
  console.log(req.url)
  res.status(404).json({ mensaje: `Ruta no encontrada, se intento acceder a ${req.url} con el verbo ${req.method}`})
})


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})