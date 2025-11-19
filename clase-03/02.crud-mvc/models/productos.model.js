const db = require("../db/productos")
const { v4: uuidv4 } = require('uuid');

const obtenerTodosLosProductos = () => {
    return db
}

const buscarProductoPorId = (id) => {
    const productoEncontrado = db.find(prod => prod.id === id)
    return productoEncontrado
}

const guardarProducto = (nombre, precio) => {
    const nuevoProducto = { nombre, precio, id: uuidv4()}
    db.push(nuevoProducto)
    return nuevoProducto
}

const obtenerIndice = (idEliminar) => {
    const indice = db.findIndex( prod => prod.id === idEliminar)
    return indice
}

const eliminarProductoByIndice = (indice) => {
    const arrayElementosBorrados = db.splice(indice, 1)
    return arrayElementosBorrados
}

module.exports = {
    obtenerTodosLosProductos,
    buscarProductoPorId,
    guardarProducto,
    obtenerIndice,
    eliminarProductoByIndice
} 