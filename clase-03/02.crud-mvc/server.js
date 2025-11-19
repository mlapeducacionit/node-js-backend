const express = require('express')
const { v4: uuidv4 } = require('uuid');
const db = require('./db/productos');
const { obtenerTodosLosProductos, buscarProductoPorId } = require('./models/productos.model');
const app = express()
const PORT = 8080

// ! Middlewares
app.use(express.json()) // Entender el json que se envíe desde el frontend 

// ! Rutas, Endpoints, points

/* CRUD */
// ! IMPORTANTE modelo que representan el request y response en petición http

// ! C:CREATE -> POST
// POST -> /api/v1/productos | método POST | http://localhost:8080/api/v1/productos | body: { nombre, precio }
// El backend es el que se encarga de generar el ID.

app.post('/api/v1/productos', (req, res) => {
    // ! 1. Vamos recibir información (objeto request (req))
    // El objeto req -> Tiene una key llamada body (Se recibe la información que se envían desde el front en el cuerpo )
    console.log(req.body)
    // ! Lógica de javascript
    const {nombre, precio} = req.body
    console.log(nombre)
    console.log(precio)

    if (!nombre || !precio) return res.status(400).json({ mensaje: 'Datos inválidos'})
    
    const nuevoProducto = { nombre, precio, id: uuidv4()}
    console.log(nuevoProducto)
    db.push(nuevoProducto)

    // ! 2. Vamos a responder (objeto response (res))
    res.status(201).json(nuevoProducto)
})

// ! R:READ -> GET 
// GET ALL -> /api/v1/productos | método GET | -> http://localhost:8080/api/v1/productos

app.get('/api/v1/productos', (req, res) => { 
 // ! 1. Gestiono lo que viene el request

 // ! 2. El controlador le pide los datos al modelo 
 const db = obtenerTodosLosProductos()

 // ! 3. Gestiono lo que respondo
  res.json(db)
})

// GET ONE -> /api/v1/productos/:id | método GET | -> http://localhost:8080/api/v1/productos/1
app.get('/api/v1/productos/:id/', (req, res) => { 
    // ! 1. Gestiono lo que viene el request
    console.log(req.params) // { id }
    const id = req.params.id
    console.log(id)

    // ! 2. El controlador le pide los datos al modelo 
    const productoEncontrado = buscarProductoPorId(id)   

    // ! 3. Gestiono lo que respondo
    if (!productoEncontrado) res.status(404).json( {mensaje: 'No existe ese producto '} )
    res.json(productoEncontrado)
})



// ! U:UPDATE -> PUT 
// PUT -> /api/v1/productos/:id | método PUT/PATCH | http://localhost:8080/api/v1/productos/1 | body: { nombre, precio }

app.put('/api/v1/productos/:id', (req, res) => {
    // ! 1. Recibir la información
    const id = req.params.id
    console.log(id) // 1

    const { nombre, precio } = req.body
    console.log(nombre)
    console.log(precio)


    if (!nombre || !precio) return res.status(400).json({ mensaje: 'Datos inválidos'})

    
    // Lógica de Javascript
    const indice = db.findIndex(p => p.id === id)

    console.log(indice) // -1 ----< No tengo producto con ese ID
    console.log(db[indice]) // Estoy editando el producto con el id 1 -> posición 0


    // ! 2. Respondiendo 
    if (indice === -1) {
        return res.status(404).json( { mensaje: 'No tengo el producto que querés editar' } )
    }

    //db[indice] = { nombre, precio, id }
    db[indice] = { ...db[indice], nombre, precio }
    res.json(db[indice])
})


// ! D:DELETE -> DELETE
// DELETE -> /api/v1/productos/:id | método DELETE | http://localhost:8080/api/v1/productos/1

app.delete('/api/v1/productos/:id', (req, res) => {
    // ! 1. Gestiona la informaicón que llega
    // key params es la clave donde van a estar llegando los parametros pasados por URL
    const idEliminar = req.params.id
    console.log(idEliminar)
    const indice = db.findIndex( prod => prod.id === idEliminar)
    console.log(indice)
    if ( indice < 0 ) {
        // No se encontro el producto que queres borrar
         // ! 2. Respondo al frontend
        res.status(404).json({ mensaje: 'No se encontró el producto que querés borrar'})
    } else {
        // Encontré el producto que quiero borrar
        // Borro
        const arrayElementosBorrados = db.splice(indice, 1)
        console.log(arrayElementosBorrados)
         // ! 2. Respondo al frontend
        res.json(arrayElementosBorrados[0])
    }
})


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})