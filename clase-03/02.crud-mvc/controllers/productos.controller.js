const { obtenerTodosLosProductos, buscarProductoPorId } = require("../models/productos.model")


const getAll = (req, res) => { 
 // ! 1. Gestiono lo que viene el request

 // ! 2. El controlador le pide los datos al modelo 
 const db = obtenerTodosLosProductos()

 // ! 3. Gestiono lo que respondo
  res.json(db)
}

const getOne = (req, res) => { 
    // ! 1. Gestiono lo que viene el request
    console.log(req.params) // { id }
    const id = req.params.id
    console.log(id)

    // ! 2. El controlador le pide los datos al modelo 
    const productoEncontrado = buscarProductoPorId(id)   

    // ! 3. Gestiono lo que respondo
    if (!productoEncontrado) res.status(404).json( {mensaje: 'No existe ese producto '} )
    res.json(productoEncontrado)
}

module.exports = {
    getAll,
    getOne
}