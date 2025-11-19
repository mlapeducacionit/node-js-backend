const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
const PORT = 8080

const db = [
    { id: '1', nombre: 'PC', precio: 200}, // 0
    { id: '2', nombre: 'Notebook', precio: 500}, // 1
    { id: '3', nombre: 'Mouse', precio: 50}, // 2
]

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
  res.json(db)
})

// GET ONE -> /api/v1/productos/:id | método GET | -> http://localhost:8080/api/v1/productos/1
app.get('/api/v1/productos/:id/', (req, res) => { 
    // Dentro del request -> key llamada -> params
    console.log(req.params) // { id }
    //const id = parseInt(req.params.id)
    const id = eq.params.id
    console.log(id)
    const productoBuscando = db.find(prod => prod.id === id)
    console.log(productoBuscando)

    /* if ( productoBuscando ) {
        res.json(productoBuscando)
    } else {
        res.status(404).json({ mensaje: 'No existe ese producto'})
    } */

    if (!productoBuscando) res.status(404).json( {mensaje: 'No existe ese producto '} )
    res.json(productoBuscando)
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