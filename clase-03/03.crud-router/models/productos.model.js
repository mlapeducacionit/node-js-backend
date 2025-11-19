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

const obtenerIndice = (id) => {
    const indice = db.findIndex( prod => prod.id === id)
    return indice
}

const eliminarProductoByIndice = (indice) => {
    const arrayElementosBorrados = db.splice(indice, 1)
    return arrayElementosBorrados
}

const editarProducto = (indice, nombre, precio) => {
    db[indice] = { ...db[indice], nombre, precio }
    return db[indice]
}

module.exports = {
    obtenerTodosLosProductos,
    buscarProductoPorId,
    guardarProducto,
    obtenerIndice,
    eliminarProductoByIndice,
    editarProducto
} 