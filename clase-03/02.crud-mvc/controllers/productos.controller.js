const { obtenerTodosLosProductos, buscarProductoPorId, guardarProducto, obtenerIndice, eliminarProductoByIndice } = require("../models/productos.model")



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

const controlarDatos = (nombre, precio) => {
    return !nombre || !precio
}

const create = (req, res) => {

    // ! 1. Gestiono lo que viene el request
    console.log(req.body)
    const {nombre, precio} = req.body
    console.log(nombre)
    console.log(precio)

    if (controlarDatos(nombre, precio)) return res.status(400).json({ mensaje: 'Datos inválidos'})
    // ! 2. El controlador le pide los datos al modelo 
    const nuevoProducto = guardarProducto(nombre, precio)
    // ! 3. Gestiono lo que respondo
    res.status(201).json(nuevoProducto)
}

const remove =  (req, res) => {
    // ! 1. Gestiono lo que viene el request
    const idEliminar = req.params.id
    console.log(idEliminar)

    // ! 2. El controlador le pide los datos al modelo
    
    const indice = obtenerIndice(idEliminar)
    console.log(indice)

    // ! 3. Gestiono lo que respondo
    if ( indice < 0 ) {
        // ! 3.1. 
        res.status(404).json({ mensaje: 'No se encontró el producto que querés borrar'})
    } else {
        // ! 2.1
        const arrayElementosBorrados = eliminarProductoByIndice(indice)
        
        console.log(arrayElementosBorrados)

        // ! 3.1
        res.json(arrayElementosBorrados[0])
    }
    
   
}

module.exports = {
    getAll,
    getOne,
    create,
    remove
}