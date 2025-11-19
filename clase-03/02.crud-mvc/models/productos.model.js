const db = require("../db/productos")

const obtenerTodosLosProductos = () => {
    return db
}

module.exports = {
    obtenerTodosLosProductos
}