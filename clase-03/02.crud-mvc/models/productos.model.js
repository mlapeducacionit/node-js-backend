const db = require("../db/productos")

const obtenerTodosLosProductos = () => {
    return db
}

const buscarProductoPorId = (id) => {
    const productoEncontrado = db.find(prod => prod.id === id)
    return productoEncontrado
}

module.exports = {
    obtenerTodosLosProductos,
    buscarProductoPorId
}